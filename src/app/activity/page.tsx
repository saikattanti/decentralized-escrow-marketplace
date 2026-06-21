"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Activity, Clock, Handshake, ShieldAlert, Zap, RefreshCcw, CheckCircle2 } from "lucide-react";

interface EventItem {
  id: string;
  type: "CREATED" | "RELEASED" | "REFUNDED" | "DISPUTED";
  escrowId: number;
  wallet: string;
  timestamp: string;
  amount: string;
}

export default function ActivityPage() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    // In a real app, this would poll Horizon or an Indexer for contract events
    // For the UI mockup, we will generate some fake recent events
    setEvents([
      { id: "1", type: "CREATED", escrowId: 1042, wallet: "GDWM...IJTR", timestamp: "Just now", amount: "100 XLM" },
      { id: "2", type: "RELEASED", escrowId: 1041, wallet: "GD57...52AY", timestamp: "15 mins ago", amount: "500 USDC" },
      { id: "3", type: "REFUNDED", escrowId: 1040, wallet: "GBVD...I4H", timestamp: "1 hour ago", amount: "20 XLM" },
      { id: "4", type: "DISPUTED", escrowId: 1039, wallet: "GC7D...X6X", timestamp: "3 hours ago", amount: "1,500 USDC" },
    ]);
  }, []);

  const getEventMeta = (type: string) => {
    switch (type) {
      case "CREATED": return { color: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: <Handshake className="w-4 h-4" />, gradient: "from-blue-500/20 to-transparent" };
      case "RELEASED": return { color: "bg-green-500/10 text-green-400 border-green-500/20", icon: <CheckCircle2 className="w-4 h-4" />, gradient: "from-green-500/20 to-transparent" };
      case "REFUNDED": return { color: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: <RefreshCcw className="w-4 h-4" />, gradient: "from-amber-500/20 to-transparent" };
      case "DISPUTED": return { color: "bg-red-500/10 text-red-400 border-red-500/20", icon: <ShieldAlert className="w-4 h-4" />, gradient: "from-red-500/20 to-transparent" };
      default: return { color: "bg-primary/10 text-primary border-primary/20", icon: <Activity className="w-4 h-4" />, gradient: "from-primary/20 to-transparent" };
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10" />
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-inner">
              <Activity className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                Live Activity Feed
              </h1>
              <p className="text-muted-foreground mt-1 text-lg">Real-time smart contract events streaming from the network.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-semibold shadow-inner">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
            Network Sync Active
          </div>
        </div>

        <div className="space-y-4 relative">
          {/* Subtle timeline line connecting the cards */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent hidden sm:block z-0" />

          {events.map((event, index) => {
            const meta = getEventMeta(event.type);
            return (
              <Card 
                key={event.id} 
                className="group relative bg-card/40 border-white/5 hover:bg-card/60 hover:border-white/10 transition-all duration-300 backdrop-blur-xl shadow-lg rounded-2xl overflow-hidden z-10 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
              >
                {/* Glowing subtle border effect on hover */}
                <div className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${meta.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
                
                <CardHeader className="py-5 sm:pl-20 flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border shadow-inner ${meta.color}`}>
                      {meta.icon}
                      {event.type}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold">Escrow #{event.escrowId}</CardTitle>
                      <CardDescription className="text-muted-foreground font-medium mt-0.5">
                        <span className="font-mono text-xs bg-white/5 px-2 py-1 rounded-md text-white/70">{event.wallet}</span>
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="block text-lg font-extrabold text-white/90">{event.amount}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground font-mono bg-background/50 px-3 py-1.5 rounded-full border border-white/5">
                      <Clock className="w-3.5 h-3.5 mr-1.5" /> {event.timestamp}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
