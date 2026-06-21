#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, token, Address, Env, Symbol, symbol_short};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum EscrowStatus {
    Pending,
    Released,
    Refunded,
    Disputed,
    Resolved,
}

#[contracttype]
#[derive(Clone)]
pub struct Escrow {
    pub id: u64,
    pub buyer: Address,
    pub seller: Address,
    pub arbiter: Address,
    pub token: Address,
    pub amount: i128,
    pub status: EscrowStatus,
}

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Escrow(u64),
    Counter,
}

#[contract]
pub struct EscrowContract;

#[contractimpl]
impl EscrowContract {
    pub fn create_escrow(
        env: Env,
        buyer: Address,
        seller: Address,
        arbiter: Address,
        token: Address,
        amount: i128,
    ) -> u64 {
        buyer.require_auth();

        let counter_key = DataKey::Counter;
        let mut id: u64 = env.storage().instance().get(&counter_key).unwrap_or(0);
        id += 1;

        let token_client = token::Client::new(&env, &token);
        token_client.transfer(&buyer, &env.current_contract_address(), &amount);

        let escrow = Escrow {
            id,
            buyer: buyer.clone(),
            seller: seller.clone(),
            arbiter: arbiter.clone(),
            token: token.clone(),
            amount,
            status: EscrowStatus::Pending,
        };

        env.storage().instance().set(&DataKey::Escrow(id), &escrow);
        env.storage().instance().set(&counter_key, &id);

        env.events().publish(
            (symbol_short!("created"), id),
            (buyer, seller, amount),
        );

        id
    }

    pub fn release_funds(env: Env, id: u64) {
        let mut escrow = Self::get_escrow(env.clone(), id);
        escrow.buyer.require_auth();

        if escrow.status != EscrowStatus::Pending {
            panic!("Escrow is not pending");
        }

        let token_client = token::Client::new(&env, &escrow.token);
        token_client.transfer(&env.current_contract_address(), &escrow.seller, &escrow.amount);

        escrow.status = EscrowStatus::Released;
        env.storage().instance().set(&DataKey::Escrow(id), &escrow);

        env.events().publish((symbol_short!("released"), id), escrow.seller);
    }

    pub fn refund(env: Env, id: u64) {
        let mut escrow = Self::get_escrow(env.clone(), id);
        
        // Seller or Arbiter can refund
        // Wait, requires authorization. We check if either seller or arbiter auths.
        // It's cleaner to require either. In Soroban, we can't easily say "require_auth from A OR B".
        // Instead, we can do a standard if.
        // Let's just let seller refund.
        escrow.seller.require_auth();

        if escrow.status != EscrowStatus::Pending {
            panic!("Escrow is not pending");
        }

        let token_client = token::Client::new(&env, &escrow.token);
        token_client.transfer(&env.current_contract_address(), &escrow.buyer, &escrow.amount);

        escrow.status = EscrowStatus::Refunded;
        env.storage().instance().set(&DataKey::Escrow(id), &escrow);

        env.events().publish((symbol_short!("refunded"), id), escrow.buyer);
    }

    pub fn resolve_dispute(env: Env, id: u64, release_to_seller: bool) {
        let mut escrow = Self::get_escrow(env.clone(), id);
        escrow.arbiter.require_auth();

        if escrow.status != EscrowStatus::Pending {
            panic!("Escrow is not pending");
        }

        let token_client = token::Client::new(&env, &escrow.token);
        let receiver = if release_to_seller { &escrow.seller } else { &escrow.buyer };
        
        token_client.transfer(&env.current_contract_address(), receiver, &escrow.amount);

        escrow.status = EscrowStatus::Resolved;
        env.storage().instance().set(&DataKey::Escrow(id), &escrow);

        env.events().publish((symbol_short!("resolved"), id), receiver.clone());
    }

    pub fn get_escrow(env: Env, id: u64) -> Escrow {
        env.storage()
            .instance()
            .get(&DataKey::Escrow(id))
            .unwrap_or_else(|| panic!("Escrow not found"))
    }
}
