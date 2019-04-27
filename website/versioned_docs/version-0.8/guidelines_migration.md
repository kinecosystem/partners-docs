---
id: guidelines_migration
title: Blockchain Migration
hide_title: true
id: version-0.8-guidelines_migration
original_id: guidelines_migration
---

# Kin Blockchain Migration

## Before We Begin
Moving to the new Kin Blockchain has been a top priority of Kin's for the past few months.
The Kin Blockchain opens a world of new possibilities for Kin developers, and we're very excited to onboard you.

This document will walk you through your migration process as a Kin developer. Please read it carefully.

 >**Important note:** You should thoroughly test the migration process in the Beta environment before moving to Production.
 
### Terminology
- **Old Blockchain**: The old blockchain that you're currently using.
- **Kin Blockchain**: The new blockchain that you'll be migrating to.

## Migration Overview - How Is It Going to Work?
Let's start by understanding what migrating an account actually means. Note that this process is similar for end-user accounts and digital service accounts (that's yours).
Migrating an account to the Kin Blockchain consists of the following three main steps:

1. **A new account is created on the Kin Blockchain -**
This new account has *the same* keypair (i.e., private and public addresses) as the account on the Old Blockchain.
The account is pre-created before the migration begins with a balance of zero.

2. **The Old Blockchain account is "deactivated" -**
Deactivating an account ("burning") means the account can no longer earn or spend Kins. 
However, the account's last known balance and transaction history are still available.

3. **The Kin Blockchain account is funded -**
Once we've "burned" the old account, we can safely fund the new account with the last known account balance.
This step marks the end of the migration process.

#### The Migration Process
Now that we understand what migrating an account means, let's talk about what the migration process of your application looks like.

The new SDK supports the Kin Blockchain "silently", alongside the Old Blockchain.
This allows you to integrate the SDK and wait until the desired adoption rate of your app is reached before starting the migration process.

Once you reach your desired adoption rate, contact Kin and together we'll decide on a migration date.
On the migration date, we (Kin) will raise a flag on our servers indicating to your clients that the migration of your application has started.
From that moment on, your users will automatically migrate to the Kin Blockchain upon launching your application. 

>**Important note:** Once the migration start flag is raised, old application clients who have not integrated the new SDK will not be able to use Kin.

#### Migrating the Digital Service Accounts
While your users migrate automatically, your blockchain accounts will be migrated manually by Kin.
You need to create and send Kin a signed transaction for burning both DS Wallet and Shared Wallet. 

Before we migrate you and your users' accounts, you need to complete the following tasks:
1. Integrate the new SDK into your app. 
2. Publish your new, migration-ready app to the App Store.
3. Together with us, decide on the desired adpotion rate of the new version.
4. Together with us, set a date and time for the migration (preferably, at low traffic hours).

#### Migrating Your End Users 
Once you release a new version of your application that implements the migration-enabled SDK, it will take care of migrating your users automatically when you first initate the SDK (continue reading for more details).

## Understanding the User Migration Flow
To support migration to the Kin Blockchain, an additional step was added "under the hood" to the SDK instantiation flow.

In previous versions of the SDK, calling `Kin.start()` would immediately initiate the SDK. In the migration edition, this is no longer the case.
Now, when `Kin.start()` is called, the SDK will query our servers and check if the current application's migration process has been initiated. If true, the SDK will proceed to check if the current user has already migrated to the Kin Blockchain. If the current user has not migrated, the SDK will begin the user migration flow. Only once the user has successfully migrated to the Kin Blockchain will the SDK be initiated.


## Important Things to Know
Migrating your users to the Kin Blockchain may pose a new temporary challenge. During the migration phase, your user base will be split between migrated users and users who have not been migrated yet (i.e., not all the users will be connected to the same blockchain). As a result, you may encounter the following situations: 

#### Migration flag raised during an active user session
A user launched your app while the migration flag (on our servers) is set to pre-migration (i.e., the user will not go through the migration process). During the user's session, the migration flag was changed to *migration started*. 

**Outcome:** On the next user interaction with the SDK the migration will take place. At the end of the migration, the user will have to retry the interaction, this time it will complete successfully.

#### User attempts to transfer Kin from a migrated account to a non-migrated account 
User transfers Kin from account A, which has already been migrated, to account B, which has not been migrated yet.

**Outcome:** For account A, the transfer will succeed. In account B, the SDK will be unusable until he migrates. Once accout B is migrated, the transfer will appear in the payment history and balance will be updated.

## Testing on Beta
We will provide an endpoint to change your application to the new blockchain.
Please note that once an account has been migrated to the new blockchain, it can *NOT* be used in the old blockchain (by design). During your tests, you would want to go back and forth between versions, please make sure to clear application cache or uninstall the app each time you change the blockchain version from new to old.

On the `Beta` environment, you can use the following POST HTTP request to change your application migration flag:

```bash
curl -XPUT https://api.kinecosystembeta.com/v2/applications/<your app_id>/blockchain_version -H "Content-type: Application/json" -d '{"blockchain_version": "<desired blockchain vesion>"}'
```

Where `<desired blockchain vesion>` can have a value of "2" or "3" as a string. 
- "2" - Set your application flag to pre-migration
- "3" - Set your application flag to migration started

For example, the following HTTP request sets the flag to pre-migration for app_id "ABC1":

```bash
curl -XPUT https://api.kinecosystembeta.com/v2/applications/ABC1/blockchain_version -H "Content-type: Application/json" -d '{"blockchain_version": "2"}'
```
