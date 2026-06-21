"use client";

import { useWalletStore } from "@/store/walletStore";
import { Button } from "./ui/button";
import { Wallet, LogOut } from "lucide-react";
import { StellarWalletsKit, Networks } from "@creit.tech/stellar-wallets-kit";
import { defaultModules } from "@creit.tech/stellar-wallets-kit/modules/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function WalletConnect() {
  const { address, isConnected, setWallet, disconnect } = useWalletStore();
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    try {
      StellarWalletsKit.init({
        modules: defaultModules(),
        network: process.env.NEXT_PUBLIC_STELLAR_NETWORK === "PUBLIC" ? Networks.PUBLIC : Networks.TESTNET
      });
    } catch (e) {
      console.log("Wallet kit already initialized or error:", e);
    }
  }, []);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      const { address } = await StellarWalletsKit.authModal();
      setWallet(address, process.env.NEXT_PUBLIC_STELLAR_NETWORK || "TESTNET");
      toast.success("Wallet connected!");
    } catch (error) {
      console.error("Wallet connection error:", error);
      toast.error("Failed to connect wallet or user cancelled.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    StellarWalletsKit.disconnect().catch(console.error);
    disconnect();
    toast.info("Wallet disconnected.");
  };

  if (isConnected && address) {
    return (
      <Button variant="outline" className="gap-2 bg-secondary/50 hover:bg-secondary border-border" onClick={handleDisconnect}>
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="font-mono text-xs">{address.slice(0, 4)}...{address.slice(-4)}</span>
        <LogOut className="w-4 h-4 ml-2 text-muted-foreground" />
      </Button>
    );
  }

  return (
    <Button onClick={handleConnect} disabled={isConnecting} className="shadow-lg shadow-primary/20">
      <Wallet className="w-4 h-4 mr-2" />
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}
