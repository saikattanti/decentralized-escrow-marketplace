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
  Users,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "hidden md:flex flex-col h-screen sticky top-0 border-r border-border/50 bg-card/30 backdrop-blur-xl transition-all duration-300",
      collapsed ? "w-[72px]" : "w-64"
    )}>
      {/* Logo Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border/50 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight overflow-hidden">
          <div className="bg-primary/20 p-1.5 rounded-lg border border-primary/20 flex-shrink-0">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          {!collapsed && (
            <span className="whitespace-nowrap">
              Trustless<span className="text-primary">.</span>
            </span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground flex-shrink-0"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
      
      {/* Navigation - scrollable */}
      <div className="flex-1 overflow-y-auto min-h-0 p-3">
        <div className="space-y-1">
          {!collapsed && (
            <div className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3 mt-2">
              Platform
            </div>
          )}
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200",
                  collapsed ? "px-3 py-2.5 justify-center" : "px-3 py-2.5",
                  isActive 
                    ? "bg-primary/10 text-primary shadow-sm shadow-primary/5 border border-primary/10" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}>
                  <item.icon className={cn("w-[18px] h-[18px] flex-shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
                  {!collapsed && item.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Enterprise Plan Card - always at bottom */}
      {!collapsed && (
        <div className="p-3 border-t border-border/50 flex-shrink-0">
          <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 p-4 rounded-xl border border-primary/20">
            <p className="text-sm font-semibold mb-1">Enterprise Plan</p>
            <p className="text-xs text-muted-foreground mb-3">Unlimited Escrows & API Access</p>
            <div className="w-full bg-background/50 rounded-full h-1.5 mb-2">
              <div className="bg-gradient-to-r from-primary to-purple-500 h-1.5 rounded-full w-[45%] transition-all" />
            </div>
            <p className="text-[10px] text-muted-foreground text-right">45 / 100 API Credits</p>
          </div>
        </div>
      )}
    </aside>
  );
}
