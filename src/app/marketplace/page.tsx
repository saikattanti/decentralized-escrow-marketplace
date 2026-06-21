"use client";

import { useState } from "react";
import { useWalletStore } from "@/store/walletStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateEscrow, useEscrow } from "@/hooks/useEscrow";
import { Search, Plus, ShieldAlert, CheckCircle2, Handshake, SearchCode, LockKeyhole, ArrowRight } from "lucide-react";

export default function MarketplacePage() {
  const { isConnected } = useWalletStore();
  const [searchId, setSearchId] = useState("");
  const [activeSearchId, setActiveSearchId] = useState<number | null>(null);

  const { data: escrow, isLoading, error } = useEscrow(activeSearchId);
  const createEscrow = useCreateEscrow();

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createEscrow.mutate({
      seller: formData.get("seller") as string,
      arbiter: formData.get("arbiter") as string,
      token: formData.get("token") as string,
      amount: Number(formData.get("amount")),
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId && !isNaN(Number(searchId))) {
      setActiveSearchId(Number(searchId));
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Background glowing gradients for premium SaaS feel */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
            Escrow Marketplace
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Create, manage, and execute programmable trustless escrows on the Stellar network with instant settlement and absolute security.
          </p>
        </div>

        {!isConnected ? (
          <Card className="border-dashed border-primary/30 bg-primary/5 backdrop-blur-sm max-w-2xl mx-auto md:mx-0">
            <CardHeader className="text-center py-16">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldAlert className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl mb-2">Wallet Not Connected</CardTitle>
              <CardDescription className="text-base">
                Please connect your Stellar wallet in the top right to interact with the marketplace and smart contracts.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <Tabs defaultValue="create" className="w-full flex flex-col md:flex-row gap-8">
            {/* Vertical Sidebar Tabs */}
            <div className="w-full md:w-72 shrink-0">
              <TabsList className="flex flex-col h-auto bg-transparent border-none p-0 gap-3 w-full">
                <TabsTrigger 
                  value="create" 
                  className="w-full justify-start py-4 px-5 rounded-2xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-lg data-[state=active]:shadow-primary/5 data-[state=active]:border-primary/20 border border-transparent transition-all duration-300 hover:bg-white/5"
                >
                  <Handshake className="w-5 h-5 mr-3" />
                  <span className="font-semibold text-base">Create Escrow</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="manage" 
                  className="w-full justify-start py-4 px-5 rounded-2xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-lg data-[state=active]:shadow-primary/5 data-[state=active]:border-primary/20 border border-transparent transition-all duration-300 hover:bg-white/5"
                >
                  <SearchCode className="w-5 h-5 mr-3" />
                  <span className="font-semibold text-base">Manage Escrow</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              <TabsContent value="create" className="m-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="bg-card/40 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden rounded-3xl">
                  <div className="h-1 w-full bg-gradient-to-r from-primary via-purple-500 to-primary/50" />
                  <CardHeader className="pb-8 pt-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <LockKeyhole className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">Initialize New Escrow</CardTitle>
                    </div>
                    <CardDescription className="text-base ml-11">
                      Lock funds securely in the Soroban smart contract until both parties are satisfied with the transaction.
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleCreate}>
                    <CardContent className="space-y-6 px-8">
                      <div className="space-y-3">
                        <Label htmlFor="seller" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Seller Address</Label>
                        <Input id="seller" name="seller" placeholder="G..." required className="font-mono bg-background/50 border-white/10 h-12 text-base focus-visible:ring-primary/50" />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="arbiter" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Arbiter Address <span className="text-white/30 lowercase normal-case tracking-normal">(Optional)</span></Label>
                        <Input id="arbiter" name="arbiter" placeholder="G..." className="font-mono bg-background/50 border-white/10 h-12 text-base focus-visible:ring-primary/50" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="amount" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Amount</Label>
                          <div className="relative">
                            <Input id="amount" name="amount" type="number" step="0.0000001" placeholder="0.00" required className="bg-background/50 border-white/10 h-12 text-base pl-4 pr-16 focus-visible:ring-primary/50" />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm pointer-events-none">
                              XLM
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="token" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Token Contract</Label>
                          <Input id="token" name="token" placeholder="Leave empty for native XLM" className="font-mono bg-background/50 border-white/10 h-12 text-base focus-visible:ring-primary/50" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="px-8 pb-8 pt-4">
                      <Button type="submit" size="lg" className="w-full sm:w-auto ml-auto rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all font-semibold text-base px-8 h-12" disabled={createEscrow.isPending}>
                        {createEscrow.isPending ? "Deploying Contract..." : (
                          <>
                            Create Escrow <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="manage" className="m-0 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                <Card className="bg-card/40 backdrop-blur-xl border-white/10 shadow-xl rounded-3xl overflow-hidden">
                  <CardHeader className="pt-8">
                    <CardTitle className="text-2xl">Lookup Escrow</CardTitle>
                    <CardDescription className="text-base">Enter a deployed Escrow ID to view its real-time on-chain status.</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-8">
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                      <Input 
                        placeholder="Escrow ID (e.g., 42)" 
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        className="font-mono bg-background/50 border-white/10 h-12 text-base flex-1 focus-visible:ring-primary/50"
                      />
                      <Button type="submit" size="lg" variant="secondary" className="h-12 px-8 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/5">
                        <Search className="w-5 h-5 mr-2" /> Find
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {isLoading && (
                  <div className="p-12 text-center animate-pulse text-muted-foreground border border-white/5 rounded-3xl bg-card/30 backdrop-blur-md">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    Querying Stellar network...
                  </div>
                )}

                {error && (
                  <div className="p-8 text-center text-red-400 border border-red-500/20 rounded-3xl bg-red-500/10 backdrop-blur-md shadow-lg">
                    <ShieldAlert className="w-10 h-10 mx-auto mb-3 opacity-80" />
                    <p className="font-medium text-lg">Escrow not found on-chain</p>
                    <p className="text-sm opacity-70 mt-1">Check the ID or your network connection.</p>
                  </div>
                )}

                {escrow && (
                  <Card className="border-primary/30 shadow-2xl shadow-primary/10 bg-gradient-to-br from-card/80 to-primary/5 backdrop-blur-xl rounded-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                    <div className="h-1 w-full bg-gradient-to-r from-green-400 to-emerald-600" />
                    <CardHeader className="flex flex-row justify-between items-start pt-8 px-8">
                      <div>
                        <CardTitle className="text-2xl mb-1">Escrow #{escrow.id}</CardTitle>
                        <CardDescription>Verified on Stellar Testnet</CardDescription>
                      </div>
                      <div className="px-4 py-1.5 bg-green-500/10 text-green-400 rounded-full text-sm font-bold flex items-center gap-2 border border-green-500/20 shadow-inner">
                        <CheckCircle2 className="w-4 h-4" /> {escrow.status}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6 px-8">
                      <div className="flex justify-between items-center p-6 bg-background/50 rounded-2xl border border-white/5 shadow-inner">
                        <span className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Locked Amount</span>
                        <span className="font-extrabold text-3xl text-foreground bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">{escrow.amount} <span className="text-lg font-medium text-muted-foreground ml-1">XLM</span></span>
                      </div>
                      
                      <div className="space-y-3 p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-center gap-4">
                          <span className="text-muted-foreground text-sm font-medium">Buyer</span> 
                          <span className="font-mono text-sm bg-black/40 px-3 py-1 rounded-md truncate max-w-[200px] sm:max-w-[300px] border border-white/5">{escrow.buyer}</span>
                        </div>
                        <div className="flex justify-between items-center gap-4">
                          <span className="text-muted-foreground text-sm font-medium">Seller</span> 
                          <span className="font-mono text-sm bg-black/40 px-3 py-1 rounded-md truncate max-w-[200px] sm:max-w-[300px] border border-white/5">{escrow.seller}</span>
                        </div>
                        <div className="flex justify-between items-center gap-4">
                          <span className="text-muted-foreground text-sm font-medium">Arbiter</span> 
                          <span className="font-mono text-sm bg-black/40 px-3 py-1 rounded-md truncate max-w-[200px] sm:max-w-[300px] border border-white/5">{escrow.arbiter}</span>
                        </div>
                      </div>
                    </CardContent>
                    
                    {escrow.status === "Pending" && (
                      <CardFooter className="flex flex-col sm:flex-row gap-4 px-8 pb-8 pt-2">
                        <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-xl h-12 text-base font-semibold shadow-lg shadow-green-500/20 transition-all hover:scale-[1.02]">
                          Release Funds
                        </Button>
                        <Button variant="outline" className="flex-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/20 rounded-xl h-12 text-base font-semibold transition-all">
                          Dispute / Refund
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                )}
              </TabsContent>
            </div>
          </Tabs>
        )}
      </div>
    </div>
  );
}
