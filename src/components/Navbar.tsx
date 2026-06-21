"use client";

import Link from "next/link";
import WalletConnect from "./WalletConnect";
import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight">Trustless.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
          <Link href="/marketplace" className="hover:text-foreground transition-colors">Marketplace</Link>
          <Link href="/activity" className="hover:text-foreground transition-colors">Activity</Link>
        </nav>
        <div className="flex items-center gap-4">
          <WalletConnect />
        </div>
      </div>
    </header>
  );
}
