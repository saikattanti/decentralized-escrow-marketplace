"use client";

import Link from "next/link";
import WalletConnect from "./WalletConnect";
import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-40">
      <div className="flex-1 flex items-center">
        {/* Global Search Bar Placeholder */}
        <div className="relative w-96 hidden md:block">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search escrows, users, or transactions..."
            className="w-full h-10 pl-10 pr-4 rounded-full bg-muted/50 border-transparent focus:bg-background focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none text-sm transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* Notifications Icon */}
        <button className="relative p-2 rounded-full hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse" />
        </button>
        <WalletConnect />
      </div>
    </header>
  );
}
