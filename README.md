# Trustless: Enterprise Escrow SaaS on Stellar

A highly scalable, full-stack Enterprise SaaS platform built on **Stellar Soroban**. Trustless provides secure, programmable escrows for cross-border B2B trades, OTC digital asset swaps, and freelance payments with instant settlement and decentralized arbitration.

**🎥 Watch the Demo Video**: 

[![Watch the video](https://img.youtube.com/vi/So2uem7Jmw8/maxresdefault.jpg)](https://youtu.be/So2uem7Jmw8)

---

## 🔗 Contract Explorer Link

Live Smart Contract on **Stellar Expert (Testnet)**:  
[CDPUYYBUQKGJECU5SAPIEDFL6LOWNQHH25EEY72NH6GKYKZ3YRG5IXGK](https://stellar.expert/explorer/testnet/contract/CDPUYYBUQKGJECU5SAPIEDFL6LOWNQHH25EEY72NH6GKYKZ3YRG5IXGK)

---

## ✨ Features (Level 3 Ready)

- **Enterprise SaaS Dashboard**: Real-time analytics, escrow health status, and platform volume tracked via beautiful Recharts visualizations.
- **100% Mobile Responsive UI**: Fully responsive sidebar, glassmorphism topbars with mobile slide-out navigation for on-the-go access.
- **Smart Contract Test Suite**: Comprehensive Rust integration tests validating creation, funding, release, and decentralized arbitration.
- **Continuous Integration (CI/CD)**: Automated GitHub Actions pipeline ensuring successful Rust contract tests and Next.js production builds on every push.
- **Wallet Integration**: Seamless Web3 login powered by `@creit.tech/stellar-wallets-kit` (Supports Freighter).
- **Programmable Escrows**: Create customized escrows specifying Buyer, Seller, Arbiter, and Token.

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
  - `contracts/escrow/src/test.rs`: Suite of passing tests.
- `.github/workflows/`: CI/CD Pipeline configuration.
- `src/lib/`: Frontend-to-contract integration helpers & XDR parsers.
- `src/app/`: Next.js 15 App Router frontend.
- `public/`: Static assets and dashboard screenshots.

---

## 🚀 Run Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Setup Environment Variables**:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_ESCROW_CONTRACT_ID=CDPUYYBUQKGJECU5SAPIEDFL6LOWNQHH25EEY72NH6GKYKZ3YRG5IXGK
   NEXT_PUBLIC_STELLAR_NETWORK=TESTNET
   NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Test Smart Contracts**:
   ```bash
   cd contracts/escrow
   cargo test
   ```

---

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React, Tailwind CSS, shadcn/ui, Recharts, Framer Motion
- **State Management**: Zustand, React Query
- **Blockchain**: Stellar SDK, Soroban RPC, Freighter API
- **Smart Contracts**: Rust (Soroban Environment)
- **DevOps**: GitHub Actions (CI/CD)
