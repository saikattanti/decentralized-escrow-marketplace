"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Lock, Zap, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-primary/30">
      {/* Standalone Landing Navbar */}
      <header className="absolute top-0 w-full z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 p-2 rounded-xl border border-primary/20">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">Trustless<span className="text-primary">.</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#developers" className="hover:text-white transition-colors">Developers</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hidden md:flex px-4 py-2 text-sm font-semibold text-white/90 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link 
              href="/dashboard" 
              className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:bg-white/90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Launch App
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-[100%] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-[100%] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-primary mb-8 animate-in fade-in slide-in-from-bottom-4">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            Stellar Soroban Mainnet Ready
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 animation-delay-100">
            The Enterprise Standard <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
              for Trustless Escrow
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 animation-delay-200">
            Secure cross-border B2B trades, OTC digital asset swaps, and freelance payments natively on Stellar with instant settlement and decentralized arbitration.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 animation-delay-300">
            <Link 
              href="/dashboard" 
              className="group flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(var(--primary),0.5)]"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="https://github.com/saikattanti/decentralized-escrow-marketplace" 
              target="_blank"
              className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all"
            >
              Read Documentation
            </Link>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                <Lock className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Absolute Security</h3>
              <p className="text-white/60 leading-relaxed">
                Smart contracts audited for enterprise workloads. Funds are locked mathematically on-chain until mutual agreement.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Instant Settlement</h3>
              <p className="text-white/60 leading-relaxed">
                Leverage Stellar's 5-second finality. Escrows are funded, released, or refunded practically instantly.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                <Globe className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">USDC & Fiat Integration</h3>
              <p className="text-white/60 leading-relaxed">
                Execute contracts natively in USDC or via Stellar Anchors, bypassing crypto volatility entirely.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
