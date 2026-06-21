#!/bin/bash

# Ensure stellar CLI is installed
# cargo install --locked stellar-cli --features opt

set -e

echo "Building the Escrow Smart Contract..."
cd contracts/escrow
stellar contract build

echo "Optimizing the WASM file..."
stellar contract optimize --wasm target/wasm32-unknown-unknown/release/escrow.wasm

echo "Deploying to Stellar Testnet..."
# Ensure you have a testnet identity configured:
# stellar keys generate alice --network testnet
# stellar network add testnet --global

CONTRACT_ID=$(stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/escrow.optimized.wasm \
  --source alice \
  --network testnet)

echo "Deployment Successful!"
echo "Contract ID: $CONTRACT_ID"

echo "NEXT_PUBLIC_ESCROW_CONTRACT_ID=$CONTRACT_ID" > ../../.env.local
echo "Saved to .env.local"
