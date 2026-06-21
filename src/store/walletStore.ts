import { create } from 'zustand';

interface WalletState {
  address: string | null;
  network: string | null;
  balance: string | null;
  isConnected: boolean;
  setWallet: (address: string, network: string) => void;
  setBalance: (balance: string) => void;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  address: null,
  network: null,
  balance: null,
  isConnected: false,

  setWallet: (address, network) => 
    set({ address, network, isConnected: true }),

  setBalance: (balance) => 
    set({ balance }),

  disconnect: () => 
    set({ address: null, network: null, balance: null, isConnected: false }),
}));
