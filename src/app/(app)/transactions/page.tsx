"use client";

import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, ExternalLink, ArrowUpRight, ArrowDownLeft, ShieldCheck } from "lucide-react";
import { useEscrowStore } from "@/store/escrowStore";
import { useWalletStore } from "@/store/walletStore";
import { useReleaseFunds, useRefundEscrow } from "@/hooks/useEscrow";

export default function TransactionsPage() {
  const { escrows, activities, loadFromCache } = useEscrowStore();
  const { isConnected, address } = useWalletStore();
  const releaseFunds = useReleaseFunds();
  const refundEscrow = useRefundEscrow();

  useEffect(() => {
    loadFromCache();
  }, [loadFromCache]);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Transactions</h1>
          <p className="text-muted-foreground text-lg">
            {isConnected 
              ? `Viewing ${escrows.length} escrow contracts for ${address?.slice(0, 4)}...${address?.slice(-4)}`
              : "Connect your wallet to view your transaction history."}
          </p>
        </div>
      </div>

      {escrows.length === 0 ? (
        <Card className="bg-card/40 backdrop-blur-sm border-border/50">
          <CardHeader className="text-center py-16">
            <CreditCard className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
            <CardTitle className="text-xl mb-2">No Transactions Yet</CardTitle>
            <CardDescription className="text-base">
              Create your first escrow in the Marketplace to see transactions here.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-4">
          {escrows.map((escrow) => {
            const isOutgoing = escrow.buyer === address;
            const activity = activities.find(a => a.escrowId === escrow.id);

            return (
              <Card key={escrow.id} className="bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-colors">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Left: Icon + Info */}
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl ${isOutgoing ? "bg-orange-500/10" : "bg-emerald-500/10"}`}>
                        {isOutgoing 
                          ? <ArrowUpRight className="w-5 h-5 text-orange-400" />
                          : <ArrowDownLeft className="w-5 h-5 text-emerald-400" />
                        }
                      </div>
                      <div>
                        <p className="font-semibold">
                          Escrow #{escrow.id} 
                          <span className="text-muted-foreground font-normal ml-2">
                            {isOutgoing ? "→" : "←"} {isOutgoing ? escrow.seller.slice(0, 6) : escrow.buyer.slice(0, 6)}...
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {activity?.txHash 
                            ? <span className="font-mono text-xs">{activity.txHash.slice(0, 12)}...</span>
                            : "Local transaction"
                          }
                        </p>
                      </div>
                    </div>

                    {/* Middle: Amount */}
                    <div className="text-left md:text-center">
                      <p className="text-lg font-bold">{escrow.amount.toLocaleString()} XLM</p>
                    </div>

                    {/* Right: Status + Actions */}
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        escrow.status === "Pending" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
                        escrow.status === "Released" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                        escrow.status === "Refunded" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" :
                        escrow.status === "Disputed" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                        "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      }`}>
                        {escrow.status}
                      </span>

                      {escrow.status === "Pending" && isOutgoing && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                            onClick={() => releaseFunds.mutate(escrow.id)}
                            disabled={releaseFunds.isPending}
                          >
                            Release
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs border-red-500/20 text-red-400 hover:bg-red-500/10"
                            onClick={() => refundEscrow.mutate(escrow.id)}
                            disabled={refundEscrow.isPending}
                          >
                            Refund
                          </Button>
                        </div>
                      )}

                      {activity?.txHash && !activity.txHash.startsWith("demo") && (
                        <a 
                          href={`https://stellar.expert/explorer/testnet/tx/${activity.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md hover:bg-muted/50 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
