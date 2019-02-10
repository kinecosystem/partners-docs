---
id: rollout
title: Rollout Plan
hide_title: true
---
# Scaling & Rollout Guidelines

## Intro

In most service backed SDKs traffic and usage limiting is applied according to developer's subscription level, which might be free or one of several paid options. 

In our SDK, we will implement rate limiting based on the capabilities of the blockchain architecture.

Our federation based blockchain is theoretically capable of 600 transactions per block. 

Each block closes in around 5 seconds which translates to 120 transactions per second.

Currently, each transaction contains a single operation (account creation, trust KIN asset, payments). A transaction can build from a batch of up to 100 operations - bringing the theoretical total operations per second to 1200. We plan to take advantage of batching in the future.

In addition, the federation currently consists of a single node, run by KIN. We are working on creating a decentralized environment by running nodes on partner infrastructure. Running on multiple nodes might impact block closing times and cause the transactions per second rate to decrease. We cannot currently anticipate the exact impact as it heavily depends on the details of the deployment. 

Current rollout guidelines take a safety buffer of 40% and base the limits on **70** transactions per second to be shared across all partners. This includes all activity on the blockchain (account creation, trust KIN asset, payments).


## Initial Onboarding of Users to the SDK

During onboarding using the current blockchain implementation, the server will create a single transaction with 2 operations to create a user's wallet when calling the `SDK.start()` method for the first time.

We plan to place an hourly rate limit, in order to control initial onboarding and protect the user experience while keeping 90% of transactions in under 10 seconds. The SDK will retry on rate limit error and will set an `isReady()` flag when done.


### Our Suggested Onboarding Rollout

As we are still experimenting and onboarding additional developers and partners, we suggest increasing the scale in an exponential pace, keeping us updated when you start increasing the rate. Each time you increase the rate we'll ask to wait for a few hours to make sure there are no issues before increasing again.


### Onboarding Rate

Over a course of a week you could go full throttle with onboarding in the following way:

Starting at **1** users/second for a few hours, 

then increasing to **2** users/second,

then **4** users/second,

**8** users/second,

**15** users/second,

and finally **30** users/second.

At **30** users/second you'd be able to onboard **2.6** million users a day.

The onboarding process is a one time effort for existing applications and we are continuously working to improve these numbers. Please make sure to follow these guidelines and communicate on each rate change.


## Payments


### Spend and Earn Offers

Earn and spend are experiences offered either by the marketplace or natively by the application. The amount and caps of native offers are controlled by the app. We will apply sane limits on the amount and the hourly cap of offers, to prevent drainage of funds due to bugs or abuse.


### Peer to Peer (P2P)

This is the most likely feature to be viral and usage might spike. We will apply rate limits to prevent 

blockchain congestion - returning a rate limit error.


## Internal Roadmap 

As we progress and get more partners and developers using KIN, we will work on the following roadmap to reduce congestions and preserve quality of service:

*   Implement application level rate limits on endpoints that interact with the blockchain, including:
	*   Onboarding new users
	*   Creating new wallets for existing users
	*   Earn - limiting per user and per application
	*   Spend and P2P - limit per application
*   Batch wallet creation and payment to earning users - this might cause a slight increase in latency when looking at a single transaction, but will increase throughput which will benefit the entire ecosystem.
*   We are working on introducing a priority mechanism where non-partner applications and speculators will have a smaller slot in each block.
*   Introduce fees to non-partners or non-whitelisted applications to decentivize them from sending wasteful transactions.
*   Create best practices for partner node deployments to decrease latency and the impact of existing transaction times.
