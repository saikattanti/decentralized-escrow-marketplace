import { create } from "zustand";
import { EscrowState } from "@/lib/soroban";

interface EscrowActivity {
  id: number;
  type: "CREATED" | "RELEASED" | "REFUNDED" | "DISPUTED";
  escrowId: number;
  address: string;
  amount: number;
  token: string;
  timestamp: Date;
  txHash?: string;
}

interface EscrowStore {
  // Escrows owned by or relevant to the connected wallet
  escrows: EscrowState[];
  activities: EscrowActivity[];
  nextEscrowId: number;

  // Stats (derived from escrows)
  totalVolume: number;
  activeCount: number;
  successRate: number;
  disputedCount: number;

  // Actions
  addEscrow: (escrow: EscrowState, txHash?: string) => void;
  updateEscrowStatus: (id: number, status: EscrowState["status"], txHash?: string) => void;
  loadFromCache: () => void;
  computeStats: () => void;
}

const STORAGE_KEY = "trustless_escrows";
const ACTIVITY_KEY = "trustless_activities";

function saveToStorage(escrows: EscrowState[], activities: EscrowActivity[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(escrows));
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activities));
  }
}

function loadEscrowsFromStorage(): EscrowState[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadActivitiesFromStorage(): EscrowActivity[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ACTIVITY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const useEscrowStore = create<EscrowStore>((set, get) => ({
  escrows: [],
  activities: [],
  nextEscrowId: 1001,
  totalVolume: 0,
  activeCount: 0,
  successRate: 0,
  disputedCount: 0,

  addEscrow: (escrow, txHash) => {
    const activity: EscrowActivity = {
      id: Date.now(),
      type: "CREATED",
      escrowId: escrow.id,
      address: escrow.buyer,
      amount: escrow.amount,
      token: escrow.token,
      timestamp: new Date(),
      txHash,
    };

    set((state) => {
      const newEscrows = [escrow, ...state.escrows];
      const newActivities = [activity, ...state.activities];
      saveToStorage(newEscrows, newActivities);
      return {
        escrows: newEscrows,
        activities: newActivities,
        nextEscrowId: state.nextEscrowId + 1,
      };
    });

    get().computeStats();
  },

  updateEscrowStatus: (id, status, txHash) => {
    set((state) => {
      const escrow = state.escrows.find((e) => e.id === id);
      if (!escrow) return state;

      const updatedEscrows = state.escrows.map((e) =>
        e.id === id ? { ...e, status } : e
      );

      const activityType = status === "Released"
        ? "RELEASED"
        : status === "Refunded"
        ? "REFUNDED"
        : "DISPUTED";

      const activity: EscrowActivity = {
        id: Date.now(),
        type: activityType as EscrowActivity["type"],
        escrowId: id,
        address: escrow.buyer,
        amount: escrow.amount,
        token: escrow.token,
        timestamp: new Date(),
        txHash,
      };

      const newActivities = [activity, ...state.activities];
      saveToStorage(updatedEscrows, newActivities);

      return { escrows: updatedEscrows, activities: newActivities };
    });

    get().computeStats();
  },

  loadFromCache: () => {
    const escrows = loadEscrowsFromStorage();
    const activities = loadActivitiesFromStorage();
    set({ escrows, activities });
    get().computeStats();
  },

  computeStats: () => {
    const { escrows } = get();
    const totalVolume = escrows.reduce((acc, e) => acc + e.amount, 0);
    const activeCount = escrows.filter((e) => e.status === "Pending").length;
    const resolved = escrows.filter((e) => e.status === "Released" || e.status === "Resolved").length;
    const total = escrows.length || 1;
    const successRate = Math.round((resolved / total) * 100 * 10) / 10;
    const disputedCount = escrows.filter((e) => e.status === "Disputed").length;

    set({ totalVolume, activeCount, successRate, disputedCount });
  },
}));
