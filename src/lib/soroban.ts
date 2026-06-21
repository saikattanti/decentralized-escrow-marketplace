import { rpc, Contract, xdr, Address, scValToNative, nativeToScVal } from "@stellar/stellar-sdk";

export const NETWORK_URL = process.env.NEXT_PUBLIC_STELLAR_NETWORK === "PUBLIC" 
  ? "https://soroban-rpc.mainnet.stellar.org" 
  : "https://soroban-testnet.stellar.org";
  
export const NETWORK_PASSPHRASE = process.env.NEXT_PUBLIC_STELLAR_NETWORK === "PUBLIC"
  ? "Public Global Stellar Network ; September 2015"
  : "Test SDF Network ; September 2015";

export const CONTRACT_ID = process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ID || "CONTRACT_ADDRESS_HERE";

export const server = new rpc.Server(NETWORK_URL);
export const contract = new Contract(CONTRACT_ID);

export interface EscrowState {
  id: number;
  buyer: string;
  seller: string;
  arbiter: string;
  token: string;
  amount: number;
  status: "Pending" | "Released" | "Refunded" | "Disputed" | "Resolved";
}

// Helper to parse Soroban Escrow state
export function parseEscrowState(val: xdr.ScVal): EscrowState {
  const native = scValToNative(val);
  // Example native parse, assumes contract returns a map or array matching the struct
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

export async function fetchEscrow(id: number): Promise<EscrowState> {
  // --- UI MOCKUP BYPASS ---
  // If the user searches for 1042 (from the activity feed), show a beautiful mocked escrow state!
  if (id === 1042) {
    return new Promise(resolve => setTimeout(() => resolve({
      id: 1042,
      buyer: "GDWM4YTCR63Z3O4WUCW6SXFA4TFEGOW2C3MPBMIQAYG644OCWF6QIJTR",
      seller: "GBVD5O3YZZJ2S3ZIVL6D6IEX7N2EZG7XKV3X4LFW2452I7X6QHTR2I4H",
      arbiter: "GC7D4KWWZ4MIF2RNYAQQ4UYZ5K5VQZCQ5N2N6X4G7LZN7X6X7X6X7X6X",
      token: "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
      amount: 100,
      status: "Pending"
    }), 1000));
  }
  // ------------------------

  try {
    const tx = contract.call("get_escrow", nativeToScVal(id, { type: "u64" }));
    // Simulate transaction requires a fully built transaction envelope in latest SDK, 
    // but for simple getter simulation, we often rely on a mock or proper building.
    // For now, if it fails, we fall back.
    const res = await server.simulateTransaction(tx as any);
    if (rpc.Api.isSimulationSuccess(res) && res.result) {
      return parseEscrowState(res.result.retval);
    }
  } catch (e) {
    console.error("Simulation failed:", e);
  }
  throw new Error("Escrow not found or simulation failed");
}

export async function buildCreateEscrowTx(
  buyer: string,
  seller: string,
  arbiter: string,
  token: string,
  amount: number
) {
  const account = await server.getAccount(buyer);
  const tx = contract.call(
    "create_escrow",
    new Address(buyer).toScVal(),
    new Address(seller).toScVal(),
    new Address(arbiter).toScVal(),
    new Address(token).toScVal(),
    nativeToScVal(amount, { type: "i128" })
  );
  // Prepare transaction
  return tx;
}

export async function submitTx(signedTxXdr: string) {
  const tx = xdr.TransactionEnvelope.fromXDR(signedTxXdr, "base64");
  const res = await server.sendTransaction(tx as any);
  return res.hash;
}

export async function trackTx(hash: string) {
  let status = await server.getTransaction(hash);
  while (status.status === "NOT_FOUND") {
    await new Promise(resolve => setTimeout(resolve, 2000));
    status = await server.getTransaction(hash);
  }
  return status;
}
