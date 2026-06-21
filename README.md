# Trustless: Enterprise Escrow SaaS on Stellar

A highly scalable, full-stack Enterprise SaaS platform built on **Stellar Soroban**. Trustless provides secure, programmable escrows for cross-border B2B trades, OTC digital asset swaps, and freelance payments with instant settlement and decentralized arbitration.

---

## 🔗 Contract Explorer Link

Live Smart Contract on **Stellar Expert (Testnet)**:  
[CDPUYYBUQKGJECU5SAPIEDFL6LOWNQHH25EEY72NH6GKYKZ3YRG5IXGK](https://stellar.expert/explorer/testnet/contract/CDPUYYBUQKGJECU5SAPIEDFL6LOWNQHH25EEY72NH6GKYKZ3YRG5IXGK)

---

## ✨ Features

- **Enterprise SaaS Dashboard**: Real-time analytics, escrow health status, and platform volume tracked via beautiful Recharts visualizations.
- **Wallet Integration**: Seamless Web3 login powered by `@creit.tech/stellar-wallets-kit` (Supports Freighter & more).
- **Programmable Escrows**: Create customized escrows specifying Buyer, Seller, Arbiter, and Token (Native XLM or USDC).
- **Live Activity Feed**: Animated, glassmorphism event tracker mirroring on-chain Soroban events.
- **Decentralized Arbitration**: Trustless dispute resolution mechanisms ensuring absolute security.

---

## 📸 Platform Screenshots

### 1. High-Converting SaaS Landing Page
![Landing Page](public/landing-page.png)

### 2. Analytics Dashboard
![Dashboard](public/dashboard.png)

### 3. Real-Time Activity Feed
![Activities Feed](public/activities.png)

### 4. Smart Contract on Stellar Expert
![Smart Contract Explorer](public/smart-contract.png)

---

## 📁 Project Structure

- `contracts/`: Soroban smart contract workspace (Rust).
  - `contracts/escrow/src/lib.rs`: Core escrow state and transition logic.
- `src/lib/`: Frontend-to-contract integration helpers & XDR parsers.
- `src/app/`: Next.js 15 App Router frontend (Landing, Dashboard, Marketplace).
- `public/`: Static assets and dashboard screenshots.

---

## 🚀 Run Locally

1. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Setup Environment Variables**:
   Create a \`.env.local\` file based on the `.env.example`:
   \`\`\`env
   NEXT_PUBLIC_ESCROW_CONTRACT_ID=CDPUYYBUQKGJECU5SAPIEDFL6LOWNQHH25EEY72NH6GKYKZ3YRG5IXGK
   NEXT_PUBLIC_STELLAR_NETWORK=TESTNET
   NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org
   \`\`\`

3. **Start development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser**:  
   [http://localhost:3000](http://localhost:3000)

---

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React, Tailwind CSS, shadcn/ui, Recharts, Framer Motion
- **State Management**: Zustand, React Query
- **Blockchain**: Stellar SDK, Soroban RPC, Freighter API
- **Smart Contracts**: Rust (Soroban Environment)
