"use client";

import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Platform Settings</h1>
        <p className="text-muted-foreground text-lg">
          Configure your notifications, API keys, and enterprise preferences.
        </p>
      </div>

      <div className="border border-border/50 rounded-xl bg-card/20 backdrop-blur-sm p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Settings className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Settings Overview</h3>
        <p className="text-muted-foreground max-w-md">
          Connect your Stellar Freighter wallet to access restricted settings, manage API tokens, and configure webhook URLs.
        </p>
      </div>
    </div>
  );
}
