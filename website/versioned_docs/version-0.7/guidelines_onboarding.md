---
title: Onboarding
hide_title: true
id: version-0.7-guidelines_onboarding
original_id: guidelines_onboarding
---

# Digital Service Onboarding

## Signup Process

New DS added by partnership team.

DS should receive the following from Ecosystem team:

*   **app_id** - used internally by the SDK to colour transactions (later KRE) and as the JWT issuer for native flows
*   **Kin JWT signing keys** - used by DS to verify Kin JWTs (available [here](https://api.kinmarketplace.com/v1/config))

Ecosystem team should receive the following from DS:

*   **DS JWT signing keys** - used by Kin to verify DS JWTs ([key generation instructions](guidelines_create_jwt_keys.md))


## Rollout

For large scale on boarding, review the [rollout guidelines](guidelines_rollout.md).

## Register

### With JWT (requires ES256 keys from DS)

To use JWT register, the DS server has to implement a JWT signing service (example on [https://github.com/kinecosystem/jwt-service](https://github.com/kinecosystem/jwt-service)).

The JWT service will sign register JWT and pass it to the client, which will pass it into the SDK.

The JWT service has to be protected by the DS with an authentication scheme so it can't be accessed by unauthorized requests ([guidelines](guidelines_sybil.md)).

## Marketplace Offers

Part of the partner's contract, Kin ecosystem provides earn opportunities in the form of polls, quizzes and a tutorial. Polls and quizzes are around 21 Kin and the tutorial is 130 Kin.

The DS can choose to have a subset of the offers or choose to create a custom tutorial.


## Native Offers


### Configuration

For native offers, JWT signing keys need to be exchanged.

The DS should provide a list of [ES256 keys](guidelines_create_jwt_keys.md) and their ids that will be used to sign **earn/spend/pay_to_user** JWTs.

Kin will provide the list of [ES256 keys](https://api.kinmarketplace.com/v1/config) and their ids that will be used to sign **payment_confirmation** JWTs.


### Native Offers

For native offers the DS doesn't need to predefine anything.

When Kin server receives an earn/spend JWT, it will read all information needed from the JWT payload (including title, description, offer_id) to create an order history item for the user.

Caps/ Limits are controlled by the DS using a **nonce** in the earn/spend JWT. A **user** can only use a **nonce** once per **offer_id**.

When an order for a native offer is complete, Kin generates the **payment_confirmation** JWT which includes the necessary information needed to retrace the payment on the blockchain to enable auditing by the digital service or legal teams.


#### Native Spend

Currently Kin holds a separate native spend wallet for each DS.

All native spent Kin ends up in that wallet.

> **NOTE:**
> In the future we want the keys to be held by the DS. The DS will generate multiple key pairs and is responsible to securely hold the private keys. The target key will be defined in the spend JWT by the DS, giving it full control over where funds are transferred to.


#### Native Earn

Currently Kin holds a single wallet shared across all DS for both marketplace and native earn.

Earns are protected with a rate limit per application (minute, hour rates), per user_id (daily rate) and wallet (daily rate).

As we serve the earn offers, and trigger a payment and provide payment-confirmations we also hold the wallets with the funds.

> **NOTE:**
> In the future we want the keys to be held by the DS. Kin holds the keys, but separates funds per DS. On some cadence, the DS will send Kin from their own wallet to the operational hot wallet or a semi-operational warm wallet held by Kin. When the warm wallet is running low on funds we could update the DS to top it up.


#### P2P

Similar to native spend, without predefining, the DS needs to encode the required data into a JWT, with the attached. The **pay_to_user** JWT includes the sender and receiver user ids, and a title, description for each sender and recipient, in addition to **offer_id** and amount.


### Injecting Native Offers into the Marketplace

The client SDK provides utility functions to display native offers in the marketplace.

Native offers will appear before any offers provided by Kin.

## Start Building with Kin's Partner SDK

### Client SDKs and Sample apps
* https://github.com/kinecosystem/kin-ecosystem-ios-sample-app
* https://github.com/kinecosystem/kin-ecosystem-ios-sdk
* https://github.com/kinecosystem/kin-ecosystem-android-sdk (sample app bundled in repo)
<a href="https://partners.kinecosystem.com/docs/api/api.html"><img src="https://partners.kinecosystem.com/img/documentation-button2x.png" width=300 height=84 alt="Documentation"/></a>

### App Identifier (app_id)
Each app in the ecosystem has an app_id. For example Kik has `kik`, Test app has `test`, Sample app has `smpl`. The app_id is used in 2 spots.
1. as the `issuer` of the JWT messages that come from your server
1. as an identifier attached to each transaction on the blockchain. Will be used in the future for the rewards engine.
We will provide the app_id to the partner.

### JWT public keys and exchange:
Our public keys are served as part of the configuration endpoint of the api:
production:
https://api.kinmarketplace.com/v1/config
beta:
https://api.kinecosystembeta.com/v1/config

We prefer using a single JWT algorithm type as it’s more secure to limit the options of the algorithm.
The keys should all be using the `es256` algorithm. An example of how to create them:
https://partners.kinecosystem.com/docs/guidelines/create_jwt_keys.html

What we need from the Partner is a list of keys (preferably 5 or more) so you can rotate them. For each key we need a `kid` (key id) that will be declared in the header of the JWT message so we know which key was used to sign it.

you can see the above `/v1/config` endpoints as an example for our own keys, or here:
```
KID: "es256_0000" KEY: "----- PUBLIC KEY ----- SOME DATA0 -----"
KID: "es256_0001" KEY: "----- PUBLIC KEY ----- SOME DATA1 -----"
KID: "es256_0002" KEY: "----- PUBLIC KEY ----- SOME DATA2 -----"
```

A **register** message payload for example (viewable on jwt.io) has the following header:
```
{
  "alg": "ES256",
  "typ": "JWT",
  "kid": "some_id"
}
```

which states that the key id used is `some_id`.

