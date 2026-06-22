"use client";

import { ShieldCheck } from "lucide-react";

export default function TransactionsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Transactions</h1>
        <p className="text-muted-foreground text-lg">
          View all incoming and outgoing escrow transactions.
        </p>
      </div>

      <div className="border border-border/50 rounded-xl bg-card/20 backdrop-blur-sm p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Transactions Yet</h3>
        <p className="text-muted-foreground max-w-md">
          Once you create or participate in an escrow on the Stellar network, your transaction history will appear here.
        </p>
      </div>
    </div>
  );
}
