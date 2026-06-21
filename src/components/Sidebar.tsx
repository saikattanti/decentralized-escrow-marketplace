"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Handshake, 
  Activity, 
  Settings, 
  ShieldCheck,
  CreditCard,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Marketplace", href: "/marketplace", icon: Handshake },
  { name: "Activity Feed", href: "/activity", icon: Activity },
  { name: "Transactions", href: "/transactions", icon: CreditCard },
  { name: "Team", href: "/team", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 hidden md:flex flex-col border-r border-border/50 bg-card/20 backdrop-blur-md">
      <div className="h-16 flex items-center px-6 border-b border-border/50">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="bg-primary/20 p-1.5 rounded-lg border border-primary/20">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          Trustless<span className="text-primary">.</span>
        </Link>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="space-y-1">
          <div className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-4">
            Platform
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-primary/10 text-primary shadow-sm shadow-primary/5" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}>
                  <item.icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-muted-foreground")} />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      
      <div className="p-4 border-t border-border/50">
        <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 p-4 rounded-xl border border-primary/20">
          <p className="text-sm font-semibold mb-1">Enterprise Plan</p>
          <p className="text-xs text-muted-foreground mb-3">Unlimited Escrows & API Access</p>
          <div className="w-full bg-background rounded-full h-1.5 mb-2">
            <div className="bg-primary h-1.5 rounded-full w-[45%]" />
          </div>
          <p className="text-[10px] text-muted-foreground text-right">45 / 100 API Credits</p>
        </div>
      </div>
    </aside>
  );
}
