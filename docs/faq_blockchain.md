---
title: Blockchain
hide_title: true
---

# Blockchain FAQ

* #### Which Blockchain solution are you using?  
  We started with Ethereum and then moved to Stellar testnet blockchain.
  We are currently building a new Kin Blockchain which is a fork of Stellar.
  
* #### What does it mean when you say you are migrating Kin to Stellar or Kin Blockchain, or any other alternative blockchain? What is the purpose of it?  
  Migration refers to moving between systems in one direction. 
  In this case, however, migration of Kin to Kin Blockchain means using Kin Blockchain as an alternative blockchain that runs in parallel. 
  In the instance of Kin Blockchain, we would use both Ethereum and Kin Blockchain side-by-side. 
  Tokens will be swappable between ERC20 and Kin Blockchain and will be completely equal in value. 
  There are many benefits to the migration - fees are much lower on blockchains like Kin Blockchain, the blockchain is more predictable, 
  and confirmation times for transactions are much faster, In addition, throughput is higher since the network is less congested. 
  This will allow us to scale Kin as we build our ecosystem of digital services. Our migration process will be as follows:  
    + **Phase #1:** create KIN on Kin Blockchain that will only be available there  
    + **Phase #2:** add swap between Ethereum and Kin Blockchain, tokens will be available through both blockchains.

* #### How many transactions per second will the Blockchain support?
  Current Stellar production supports 10tx/sec, and their codebase set 20tx/sec in the configuration. 
  Our current tests shows >50tx/sec but this is still on testing phase.
       
* #### How long do transactions take to settle on the Steller network?
  Approximately 5 seconds
       
* #### What is the cost per transaction?
  Since we are running on our network, there is no cost for transaction for now. 
  We might use fractions of Kin for fees in order to avoid spamming the network.

* #### What type of tests have you run on the blockchain?
  We believe testing should come from numerous proof points:
   1. The Stellar network is being used by multiple organizations around the world for more than a few years now. 
      We believe this is a good testament of its performance and stability. 
      This is why Kin blockchain if using Stellar codebase as a baseline.
      
   2. We performed our own load-testing and published detailed results. 
      You can check it here.
      
   3. ATN test: An experimental token called ATN (attention token) was sent when a selected group of Kik users sent and received messages. 
      We reached more than ten million transactions, with the height exceeding 1.2M daily transactions. 
      The confirmation time was also super fast, about 97% of the transactions were lower than 10 seconds. 
      This proved that Stellar’s blockchain was scalable and had high transaction rates.

* #### How do users transfer Kin into and out of their wallets?
  Users can earn and spend Kin through different opportunities within the marketplace and within the native experiences you implement into your app. 
  In the first phase, users will not be able to transfer their Kin out of their wallet. 

* #### When a user registers, do they get an address on the blockchain or is it managed within a group account?
  For every user a private/public key pair is generated on the client side. 
  The SDK will provide a method to get the public key. 

* #### How will users transfer Kin to another Kin powered app?
  Users will not be able to export or do cross app transfers in the beginning. 
  It has yet to We are considering ‘one kin wallet’ solution for all apps, transfer methods and the option to use Kin standalone apps to manage various app wallets and balances. 

* #### How do they verify the identity of their friends?
  The SDK will generate a private/public key pair for every onboarded user and a public method to get onboarded user’s “public address”. 
  A simple discovery service can be implemented by digital services to map between “user ID” and ”public address”. 
  User A needs to query user B’s “public address” based on B’s “user ID”. 
  The SDK provides an API to pay the “public address” a set KIN amount. 
  The SDK could also be set to provide a built-in “user id” to “public address” discovery service. 
  In the latter case, the SDK provides an API to pay the “user id” with a set KIN  amount, the SDK then converts the “user ID” to a public address internally and broadcasts the transaction to the stellar blockchain.  

* #### Is there an update to how the Kin Rewards Engine works? 
  We are working with MIT and running tests to see if we need to make further adaptations once there are real transactions running with our first few partners. 
  We will start with a manual verification of the KRE prior to going fully automated and will slowly transition based on the number of transactions and validity of the model. 

* #### What recourse do we have for securing accounts after a security breach?
  There is no centralized place where we keep any personally identifiable information (PII) or user data or private keys. 
  We have no control on the accounts once they are created since we have no access to the user’s private key. 

* #### Do you keep a record of every transaction off of the blockchain? What API access do we have? If a user wants to see transaction history is that done through your DB or by querying the blockchain?
  We will provide a report of all transactions originated from each of the apps that the SDK is integrated in. 
  The order history includes blockchain completed transactions. 
  The details of the order history are received from the ecosystem server. 
  The ecosystem server is open sourced and digital service can choose to provide their own offers directly (will be supported based on demand). We will provide tools for digital services to query stellar directly and filter all these transaction directly from stellar blockchain (based on demand).

* #### What is going to be changed in the 'fork' process?
  We will not use Stellar public blockchain but Kin Blockchain. 

* #### How does stellar works?
  Stellar is a blockchain based on Federation unlike Ethereum and Bitcoin, which makes transactions faster and lower the cost. 
  More information can be found here.

* #### Why is it more secure?
  Its not. 
  Security is not in our considerations when moving to Stellar or Kin Blockchain. 
  Ethereum security is driven from permissionless nodes and PoW and Stellar security derives from pre-trusted nodes that approves transactions.

* #### testnet vs mainnet vs research etc - whats the plan? how many networks? 
  Our current assumption is that we have the following networks: Production, Staging, Developers sandbox, Dev and Research

* #### Test phase/production phase in Kik? differences? 
  Production phase is when Kin Blockchain has federation, lock/swap mechanism, real token issued and secured and full liquidity and exchangeability with ERC20/Kin. 
  Every phase until that is a testing phase.

* #### Swap and lock mechanism? how? timeline? 
  Swap will be enabled either by 3rd party such as Tempo or by our own swap mechanism, depends on compliance and regulation requirements. 
  Lock will be done by locking funds on Ethereum and Stellar using multi-sig wallet with federation quorum members that will be in charge of having no more than 10T Kin tokens on Ethereum and Kin blockchain combined

* #### What triggers the migration?
  At a certain point when Kin Blockchain will be ready in terms of compliance (federation, swap/lock, coin issued), we will decide to move to the new token/network. 
  One possible scenario is that at this point we will update client’s sdks to use the new network and issuer, and once they update and re-create their account, they will start to use the new network in a totally seamless manner on their end.
  Another possibility is to duplicate client’s data and avoid trustline approval and replace client’s uri of the network and client will be automatically migrated.

* #### What if users don't update/ trigger? 
  This is more of a business/product decision. 
  Easiest solution is to stop supporting old blockchain/coin on our system so user will have to upgrade if he wants to use the coins. 

* #### Do we keep these accounts forever?
  At a certain time, if we don't see activity from user from the old network, we can record current balance client have, and once he reconnects the app and network, use this value to fund him on his new wallet on the new network.

* #### What happens on logout in Digital service?
  We are working on a solution to keep user’s Kin wallet upon logout. 
   1. **On single use device:** User will have their Kin wallet safe, even if they log out and log back in. 
   2. **On multi use device:** We need an identifier for the digital service - and work on a solution (TBD). 
      This solution will allow multiple users to use the same phone.
