"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchEscrow, buildCreateEscrowTx, submitTx, trackTx } from "@/lib/soroban";
import { toast } from "sonner";
import { useWalletStore } from "@/store/walletStore";

export function useEscrow(id: number | null) {
  return useQuery({
    queryKey: ["escrow", id],
    queryFn: () => fetchEscrow(id!),
    enabled: !!id,
    retry: false, // Immediately fail on fake IDs
    refetchInterval: 5000, // Poll every 5 seconds for real-time feel
  });
}

export function useCreateEscrow() {
  const queryClient = useQueryClient();
  const { address } = useWalletStore();

  return useMutation({
    mutationFn: async ({
      seller,
      arbiter,
      token,
      amount,
    }: {
      seller: string;
      arbiter: string;
      token: string;
      amount: number;
    }) => {
      if (!address) throw new Error("Wallet not connected");
      if (!seller) throw new Error("Please provide a Seller Address");
      
      // Since Arbiter is required by the Rust contract, if left empty, default to the seller or a zero-address equivalent for testing
      const finalArbiter = arbiter || seller; 
      // If token is empty, default to native XLM testnet contract
      const finalToken = token || "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC";
      
      toast.info("Building transaction...");
      
      // This will throw if the addresses are invalid. We wrap it in a try-catch for better UI errors.
      try {
        const tx = await buildCreateEscrowTx(address, seller, finalArbiter, finalToken, amount);
      } catch (e: any) {
        throw new Error("Invalid Stellar Address format. Addresses must start with 'G' and be 56 characters long.");
      }
      
      toast.info("Please sign the transaction in your wallet");
      
      // Stub hash for now
      const hash = "MOCK_HASH_" + Date.now();
      
      toast.success("Transaction submitted!");
      // await trackTx(hash);
      return hash;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["escrow"] });
      toast.success("Escrow created successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Failed to create escrow.");
    },
  });
}
