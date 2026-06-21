import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Lock } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-background">
      {/* Hero Section */}
      <section className="w-full py-20 lg:py-32 flex flex-col items-center text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-[120px] -z-10 w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
          <Zap className="mr-2 h-4 w-4" />
          Powered by Soroban on Stellar Testnet
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
          The Trustless Escrow Infrastructure
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Secure your transactions with programmable, decentralized escrows. 
          No intermediaries, instant settlement, and full transparency.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/marketplace">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:scale-105 transition-transform">
              Launch App <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/activity">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border hover:bg-secondary transition-colors">
              View Activity
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-secondary/20 border-t border-border/50">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm">
            <Shield className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-bold mb-3">100% Secure</h3>
            <p className="text-muted-foreground">Funds are locked in a Soroban smart contract, impossible to tamper with until conditions are met.</p>
          </div>
          <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm">
            <Zap className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-bold mb-3">Instant Settlement</h3>
            <p className="text-muted-foreground">Built on Stellar, meaning fees are fractions of a cent and transactions settle in seconds.</p>
          </div>
          <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm">
            <Lock className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-bold mb-3">Decentralized Arbiter</h3>
            <p className="text-muted-foreground">Assign trusted third-parties to resolve disputes transparently on-chain.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
