"use client";

import { Users } from "lucide-react";

export default function TeamPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Team Access</h1>
          <p className="text-muted-foreground text-lg">
            Manage your organization members and arbitration roles.
          </p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
          Invite Member
        </button>
      </div>

      <div className="border border-border/50 rounded-xl bg-card/20 backdrop-blur-sm p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Invite your team</h3>
        <p className="text-muted-foreground max-w-md">
          Upgrade your Enterprise plan to add multiple organization members, custom arbiters, and API keys.
        </p>
      </div>
    </div>
  );
}
