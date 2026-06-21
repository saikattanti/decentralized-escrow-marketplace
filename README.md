# Decentralized Escrow SaaS

A highly secure, decentralized escrow marketplace built natively on the Stellar network using Soroban Smart Contracts and Next.js 15.

## Overview
Trustless provides programmable, decentralized escrows with instant settlement. It acts as an infrastructure layer allowing buyers and sellers to interact securely without intermediaries. Escrow disputes can be resolved transparently by a designated decentralized Arbiter.

## Features
- **Wallet Integration**: Powered by `@creit.tech/stellar-wallets-kit`, supporting Freighter and multiple wallets.
- **Smart Contract Foundation**: Soroban smart contracts manage the state (Pending, Released, Refunded, Disputed, Resolved).
- **Real-Time Data**: Tracks active escrows and on-chain events seamlessly using `@tanstack/react-query`.
- **Modern SaaS Aesthetics**: Sleek dark-mode interface built with `shadcn/ui` and `Tailwind CSS`.
- **Transaction Tracking**: Status tracking (Pending/Success/Failed) directly tied to Stellar transactions.

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Zustand (State Management)
- React Query (Data Fetching)
- StellarWalletsKit
- Soroban SDK & Stellar JavaScript SDK

---

## Setup Instructions

### 1. Clone & Install Dependencies
```bash
git clone <repository>
cd decentralized-escrow-marketplace
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Next.js Environment Variables
NEXT_PUBLIC_ESCROW_CONTRACT_ID=CONTRACT_ADDRESS_HERE
NEXT_PUBLIC_STELLAR_NETWORK=TESTNET
```
> Note: Replace `CONTRACT_ADDRESS_HERE` with the ID of your externally deployed Soroban Escrow contract.

### 3. Wallet Setup
To use the application, install the [Freighter Wallet](https://www.freighter.app/) extension in your browser. Ensure you switch the network to **Testnet** in the Freighter settings.

### 4. Running Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Contract Deployment (External)
Since the Soroban contract is deployed from an external IDE, simply compile your Rust smart contract using `stellar contract build`, deploy it to the Testnet, and copy the resulting `C...` contract ID into your `.env.local` file.

Example Transaction Hash: `TRANSACTION_HASH_HERE`

---

## Deployment
This project is optimized for deployment on Vercel.
1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. Add the Environment Variables (`NEXT_PUBLIC_ESCROW_CONTRACT_ID`, `NEXT_PUBLIC_STELLAR_NETWORK`).
4. Click **Deploy**.
