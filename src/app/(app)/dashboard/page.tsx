"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { useWalletStore } from "@/store/walletStore";
import { ArrowUpRight, ArrowDownRight, Wallet, ShieldCheck, Activity, Users } from "lucide-react";

const revenueData = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 2100 },
  { name: 'Mar', total: 1800 },
  { name: 'Apr', total: 3200 },
  { name: 'May', total: 2800 },
  { name: 'Jun', total: 4300 },
  { name: 'Jul', total: 5100 },
];

const escrowData = [
  { name: 'Completed', value: 85, fill: '#10b981' },
  { name: 'Pending', value: 12, fill: '#3b82f6' },
  { name: 'Disputed', value: 3, fill: '#ef4444' },
];

export default function DashboardPage() {
  const { isConnected } = useWalletStore();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground">Your complete escrow analytics and platform metrics.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
            Download Report
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/40 backdrop-blur border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Volume Locked</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-green-500 flex items-center mt-1 font-medium">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +20.1% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/40 backdrop-blur border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Escrows</CardTitle>
            <ShieldCheck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-green-500 flex items-center mt-1 font-medium">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +3 this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
            <Activity className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.2%</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              Based on 145 resolved escrows
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Disputed Transactions</CardTitle>
            <Users className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-red-500 flex items-center mt-1 font-medium">
              <ArrowDownRight className="h-3 w-3 mr-1" /> Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 bg-card/40 backdrop-blur border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Platform Volume</CardTitle>
            <CardDescription>Monthly volume locked in USDC over time.</CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="total" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-card/40 backdrop-blur border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Escrow Health Status</CardTitle>
            <CardDescription>Breakdown of all-time escrow statuses.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={escrowData} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} stroke="#888888" fontSize={12} />
                  <RechartsTooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Completed</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /> Pending</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /> Disputed</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
