#![cfg(test)]

use super::*;
use soroban_sdk::testutils::{Address as _, MockAuth, MockAuthInvoke};
use soroban_sdk::{token, Address, Env, IntoVal};

fn setup() -> (Env, EscrowContractClient<'static>, Address, Address, Address, token::Client<'static>, token::StellarAssetClient<'static>) {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, EscrowContract);
    let client = EscrowContractClient::new(&env, &contract_id);

    let buyer = Address::generate(&env);
    let seller = Address::generate(&env);
    let arbiter = Address::generate(&env);

    let token_admin = Address::generate(&env);
    let token_contract = env.register_stellar_asset_contract(token_admin.clone());
    let token_client = token::Client::new(&env, &token_contract);
    let token_admin_client = token::StellarAssetClient::new(&env, &token_contract);

    // Mint some tokens to the buyer
    token_admin_client.mint(&buyer, &1000);

    (env, client, buyer, seller, arbiter, token_client, token_admin_client)
}

#[test]
fn test_create_escrow() {
    let (_env, client, buyer, seller, arbiter, token_client, _) = setup();
    let amount = 100;

    let id = client.create_escrow(&buyer, &seller, &arbiter, &token_client.address, &amount);
    assert_eq!(id, 1);

    let escrow = client.get_escrow(&id);
    assert_eq!(escrow.id, 1);
    assert_eq!(escrow.buyer, buyer);
    assert_eq!(escrow.seller, seller);
    assert_eq!(escrow.arbiter, arbiter);
    assert_eq!(escrow.token, token_client.address);
    assert_eq!(escrow.amount, amount);
    assert_eq!(escrow.status, EscrowStatus::Pending);

    // Contract should now hold the funds
    assert_eq!(token_client.balance(&client.address), 100);
}

#[test]
fn test_release_funds() {
    let (_env, client, buyer, seller, arbiter, token_client, _) = setup();
    let amount = 100;

    let id = client.create_escrow(&buyer, &seller, &arbiter, &token_client.address, &amount);
    assert_eq!(token_client.balance(&seller), 0);

    // Release funds (auth mocked, so it simulates buyer calling)
    client.release_funds(&id);

    let escrow = client.get_escrow(&id);
    assert_eq!(escrow.status, EscrowStatus::Released);

    // Seller should now have the funds
    assert_eq!(token_client.balance(&seller), amount);
}

#[test]
fn test_resolve_dispute_refund_buyer() {
    let (_env, client, buyer, seller, arbiter, token_client, _) = setup();
    let amount = 100;

    let id = client.create_escrow(&buyer, &seller, &arbiter, &token_client.address, &amount);
    assert_eq!(token_client.balance(&buyer), 900); // Because they spent 100 from initial 1000

    // Resolve dispute, refund to buyer (release_to_seller = false)
    client.resolve_dispute(&id, &false);

    let escrow = client.get_escrow(&id);
    assert_eq!(escrow.status, EscrowStatus::Resolved);

    // Buyer gets funds back
    assert_eq!(token_client.balance(&buyer), 1000);
}

#[test]
fn test_refund() {
    let (_env, client, buyer, seller, arbiter, token_client, _) = setup();
    let amount = 100;

    let id = client.create_escrow(&buyer, &seller, &arbiter, &token_client.address, &amount);
    
    // Refund (auth mocked, simulates seller refunding)
    client.refund(&id);

    let escrow = client.get_escrow(&id);
    assert_eq!(escrow.status, EscrowStatus::Refunded);

    // Buyer should have the funds back
    assert_eq!(token_client.balance(&buyer), 1000);
}
