---
title: Migration FAQ
hide_title: true
id: version-0.8-guidelines_migration_faq
original_id: guidelines_migration_faq
---

# Kin Migration FAQ

We’re happy to inform you that Kin is transitioning to its own dedicated blockchain. A new SDK will provide the security, stability, speed and scale necessary to support consumer applications, each with millions of users in mind.

## Technical

#### Does it mean I need the new SDK? What does this mean for my users?
Partners will need to update to the new SDK (delivered early/mid April). The SDK will include a migration module. Users of an older SDK version will not be able to earn/spend more KIN until they upgrade their app to initiate the SDK that supports the new blockchain.
Registering a new user on an older SDK version will fail. 

#### How long will it take for a user to migrate (what's the user experience)?
The migration process will occur in the background once the KIN entrypoint (Kin.Start()) is called. The migration process itself takes around 15 seconds during which the user is blocked from using SDK functions.

#### What will happen to users who did not update to new app version?
Users of an older SDK version will not be able to earn/spend more KIN until they upgrade their app to initiate the SDK that supports the new blockchain.

Registering a new user on an older SDK version will fail.

#### Will I have to force update?
We recommend that (if you have the capability) you show a force update message to users who don't have the new blockchain-supported SDK version.

#### Is the migration flow different between Android and iOS?
The flow is the same. However, there are different events and documentation available for each platform. For this information, please refer to the documentation on our website.

#### What happens to new users that enter the app during and after the migration process? Do they need to go through migration?
New users on the new blockchain don't go through migration. Once your app is set on the new blockchain, any new user that will engage with the app will only interact with the new blockchain. 

#### Where in my user flow should I call Kin.start?
Kin.start should be called early in your user's flow. The earlier you call it, the better the chance that the user would already be migrated before they start earning Kin in your application.

#### Can QR codes from the old blockchain restore wallets on the new blockchain?
The key pairs will be the same so users can still use the QR code (if they saved it) during their backup. We always recommend prompting your users to use the backup and restore functionalities.

#### Does the server know the wallet status?
The server is aware of a wallet’s status by checking the blockchain.

#### What happens to the user's transaction history?
The marketplace transaction history is kept. If you've been using the paymentConfirmation to double check the existence of a transaction on the blockchain, you will have to start checking on the new blockchain. Old transactions will not be transferred between blockchains, making all users accounts on the blockchain seem new and without history.

####  Is there a way we can flip to switch manually on a couple test accounts to validate everything is working post migration ourselves? on either beta or production?
You can’t change the version for specific users. Only for the whole app. We encourage you to test on beta using the endpoint documented here: https://partners.kinecosystem.com/docs/guidelines_migration.html
You can switch back a forth on beta, but once a wallet has been migrated to KIN3 it is burnt, meeting it won’t work on kin2 anymore. You will have to reset the wallet after migrating back.

#### If the migration enabled sdk will migrate _all_ wallets on the device, or only the wallet for the current active account. i.e. if 2 users have logged into kik, both of their wallet keypairs will be stored...if user B is logged in during migration will user A's also be migrated at that time? or would user A have to also log in to trigger their own migration?
Each wallet is migrated separately. When a kin.init is called it will trigger the migration of the currently held wallet. The migration will also trigger on recovering a backed up wallet. As mentioned previously, if the sdk is already initialized when migration starts, the first api cal will trigger the migration.

## Issues and Errors

#### Will launching a new app using the platform SDK before the migration cause any issues?
No, but you will need to migrate your new users on that application to the new blockchain. It might be best to launch after the migration flag is raised so that those users are automatically created on the new blockchain.

#### What happens when a user that is migrated tries to send Kin to a user that has not migrated (peer to peer)?
The transaction should go through on the new blockchain. The receiving user will only be able to access the funds when he migrates his wallet.

#### What happens if the migration is happening when the user is in the middle of earning Kin?
The SDK will detect that the migration has begun, will migrate the current wallet and will raise an error to the caller - failing the current earn flow. The user will have to start the earn flow over again - this time on the new blockchain.

#### What happens if the app crashes or loses network connection during SDK migration process?
The SDK always tries to re-execute the migration. Re-executing will continue from where the process stopped and will complete successfully. If the migration failure persists, please log the error and show a message to the user.

#### What happens if the migration gets terminated, does it restart automatically?
The migration will restart automatically from its last known state if it hadn't completed successfully.

## Timing

#### When do you expect the migration to be completed?
We will try to align to your schedule. We will not be turning off the previous blockchain any time soon, but would like everyone to update their SDK, and publish to their respective app stores in the month following the SDK's release. The most important thing is that a large percentage of your users update their app with the new SDK before raising the migration flag so that migration is smooth.

#### When will the old blockchain be retired?
The old blockchain will stay up while not all partners have migrated. Once all partners and developers have transitioned to the new blockchain, the old blockchain is redundant and can be retried. We will keep the old blockchain history, but it will not be accessible via horizon.

## Support

#### How can I get help with the migration?
For any support that isn't covered above, you may email us at [partners@kin.org](mailto:partners@kin.org) 
