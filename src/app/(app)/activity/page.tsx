"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { Activity, Clock, Handshake, ShieldAlert, RefreshCcw, CheckCircle2 } from "lucide-react";
import { useEscrowStore } from "@/store/escrowStore";

export default function ActivityPage() {
  const { activities, loadFromCache } = useEscrowStore();

  useEffect(() => {
    loadFromCache();
  }, [loadFromCache]);

  const getEventMeta = (type: string) => {
    switch (type) {
      case "CREATED": return { color: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: <Handshake className="w-4 h-4" />, gradient: "from-blue-500/20 to-transparent" };
      case "RELEASED": return { color: "bg-green-500/10 text-green-400 border-green-500/20", icon: <CheckCircle2 className="w-4 h-4" />, gradient: "from-green-500/20 to-transparent" };
      case "REFUNDED": return { color: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: <RefreshCcw className="w-4 h-4" />, gradient: "from-amber-500/20 to-transparent" };
      case "DISPUTED": return { color: "bg-red-500/10 text-red-400 border-red-500/20", icon: <ShieldAlert className="w-4 h-4" />, gradient: "from-red-500/20 to-transparent" };
      default: return { color: "bg-primary/10 text-primary border-primary/20", icon: <Activity className="w-4 h-4" />, gradient: "from-primary/20 to-transparent" };
    }
  };

  const formatTimestamp = (ts: Date | string) => {
    const date = new Date(ts);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${Math.floor(diffHours / 24)} days ago`;
  };

  return (
    <div className="relative min-h-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10" />

      <div className="p-6 md:p-8 max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
              <Activity className="w-7 h-7 text-primary animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Live Activity Feed</h1>
              <p className="text-muted-foreground mt-1">
                {activities.length > 0 
                  ? "Real-time smart contract events from your escrows."
                  : "No activity yet. Create an escrow to get started."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-semibold self-start">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
            Network Sync Active
          </div>
        </div>

        {activities.length === 0 ? (
          <Card className="bg-card/40 backdrop-blur-sm border-border/50">
            <CardHeader className="text-center py-16">
              <Activity className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
              <CardTitle className="text-xl mb-2">No Activity Yet</CardTitle>
              <CardDescription className="text-base">
                Head to the Marketplace and create your first escrow. All contract events will appear here in real-time.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="space-y-3 relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent hidden sm:block z-0" />

            {activities.map((event, index) => {
              const meta = getEventMeta(event.type);
              return (
                <Card 
                  key={event.id} 
                  className="group relative bg-card/40 border-white/5 hover:bg-card/60 hover:border-white/10 transition-all duration-300 backdrop-blur-xl shadow-lg rounded-2xl overflow-hidden z-10 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
                >
                  <div className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${meta.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
                  
                  <CardHeader className="py-4 sm:pl-16 flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border shadow-inner ${meta.color}`}>
                        {meta.icon}
                        {event.type}
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold">Escrow #{event.escrowId}</CardTitle>
                        <CardDescription className="font-mono text-xs mt-0.5">
                          {event.address.slice(0, 6)}...{event.address.slice(-4)}
                        </CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-base font-bold">{event.amount} XLM</span>
                      <div className="flex items-center text-xs text-muted-foreground font-mono bg-background/50 px-3 py-1.5 rounded-full border border-white/5">
                        <Clock className="w-3.5 h-3.5 mr-1.5" /> {formatTimestamp(event.timestamp)}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
