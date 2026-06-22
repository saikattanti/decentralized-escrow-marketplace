import { 
  rpc, 
  Contract, 
  xdr, 
  Address, 
  scValToNative, 
  nativeToScVal, 
  TransactionBuilder, 
  Networks, 
  BASE_FEE 
} from "@stellar/stellar-sdk";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";

// ─── Network Config ─────────────────────────────────────────────
export const NETWORK_URL = process.env.NEXT_PUBLIC_RPC_URL || "https://soroban-testnet.stellar.org";
export const NETWORK_PASSPHRASE = process.env.NEXT_PUBLIC_STELLAR_NETWORK === "PUBLIC"
  ? Networks.PUBLIC
  : Networks.TESTNET;
export const CONTRACT_ID = process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ID || "";

export const server = new rpc.Server(NETWORK_URL);
export const contract = new Contract(CONTRACT_ID);

// ─── Types ──────────────────────────────────────────────────────
export interface EscrowState {
  id: number;
  buyer: string;
  seller: string;
  arbiter: string;
  token: string;
  amount: number;
  status: "Pending" | "Released" | "Refunded" | "Disputed" | "Resolved";
}

// ─── Parse Soroban ScVal → EscrowState ──────────────────────────
export function parseEscrowState(val: xdr.ScVal): EscrowState {
  const native = scValToNative(val);
  return {
    id: Number(native.id),
    buyer: native.buyer,
    seller: native.seller,
    arbiter: native.arbiter,
    token: native.token,
    amount: Number(native.amount),
    status: native.status ? Object.keys(native.status)[0] as EscrowState["status"] : "Pending"
  };
}

// ─── Build, Sign & Submit a Contract Call ────────────────────────
async function buildAndSubmitTx(
  callerAddress: string,
  method: string,
  ...args: xdr.ScVal[]
): Promise<string> {
  // 1. Get the caller's account from the network
  const account = await server.getAccount(callerAddress);

  // 2. Build the transaction
  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call(method, ...args))
    .setTimeout(300)
    .build();

  // 3. Simulate to get the authorizations & resource footprint
  const simResult = await server.simulateTransaction(tx);

  if (!rpc.Api.isSimulationSuccess(simResult)) {
    throw new Error("Transaction simulation failed. Check contract state.");
  }

  // 4. Assemble the transaction with the simulation result
  const preparedTx = rpc.assembleTransaction(tx, simResult).build();

  // 5. Sign using the user's Stellar wallet (Freighter, etc.)
  const { signedTxXdr } = await StellarWalletsKit.signTransaction(preparedTx.toXDR());

  // 6. Submit to the network
  const txEnvelope = TransactionBuilder.fromXDR(signedTxXdr, NETWORK_PASSPHRASE);
  const sendResponse = await server.sendTransaction(txEnvelope);

  if (sendResponse.status === "ERROR") {
    throw new Error(`Transaction submission failed: ${sendResponse.status}`);
  }

  // 7. Poll for confirmation
  const hash = sendResponse.hash;
  let getResponse = await server.getTransaction(hash);
  
  while (getResponse.status === "NOT_FOUND") {
    await new Promise(resolve => setTimeout(resolve, 2000));
    getResponse = await server.getTransaction(hash);
  }

  if (getResponse.status === "FAILED") {
    throw new Error("Transaction failed on-chain.");
  }

  return hash;
}

// ─── Contract Method Wrappers ───────────────────────────────────

export async function createEscrow(
  buyer: string,
  seller: string,
  arbiter: string,
  token: string,
  amount: number
): Promise<string> {
  return buildAndSubmitTx(
    buyer,
    "create_escrow",
    new Address(buyer).toScVal(),
    new Address(seller).toScVal(),
    new Address(arbiter).toScVal(),
    new Address(token).toScVal(),
    nativeToScVal(amount, { type: "i128" })
  );
}

export async function releaseFunds(callerAddress: string, escrowId: number): Promise<string> {
  return buildAndSubmitTx(
    callerAddress,
    "release_funds",
    nativeToScVal(escrowId, { type: "u64" })
  );
}

export async function refundEscrow(callerAddress: string, escrowId: number): Promise<string> {
  return buildAndSubmitTx(
    callerAddress,
    "refund",
    nativeToScVal(escrowId, { type: "u64" })
  );
}

export async function resolveDispute(
  callerAddress: string, 
  escrowId: number, 
  releaseToSeller: boolean
): Promise<string> {
  return buildAndSubmitTx(
    callerAddress,
    "resolve_dispute",
    nativeToScVal(escrowId, { type: "u64" }),
    xdr.ScVal.scvBool(releaseToSeller)
  );
}

export async function fetchEscrow(id: number): Promise<EscrowState> {
  const account = await server.getAccount(CONTRACT_ID).catch(() => null);
  
  const tx = new TransactionBuilder(
    account || await server.getAccount("GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF"),
    { fee: BASE_FEE, networkPassphrase: NETWORK_PASSPHRASE }
  )
    .addOperation(contract.call("get_escrow", nativeToScVal(id, { type: "u64" })))
    .setTimeout(30)
    .build();

  const simResult = await server.simulateTransaction(tx);

  if (rpc.Api.isSimulationSuccess(simResult) && simResult.result) {
    return parseEscrowState(simResult.result.retval);
  }

  throw new Error("Escrow not found on the network.");
}
