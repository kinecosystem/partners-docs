---
id: integration
title: Integration
---

# Integration FAQ

* #### Where can we get the related documentation? 
  In the [kin-ecosystem-android-sdk](https://github.com/kinecosystem/kin-ecosystem-android-sdk/blob/dev/README.md) GitHub page.

* #### Do you have backup and restore options?
  The kin SDk provide automatic backup functionality via Google backup on Android and iCloud on iOS.
  The backup will restore the private key if user reinstall the app under the same Google/icloud account (even on a different device).
  However the automatic  backup is not 100% guaranteed and a successful automatic backup and install depends on several external factor such as android os version, on whether the user has opted-out from application backup, and whether the user is constantly on data or is using wifi or additional cases that we can’t control. 
  We are currently research and test Users activated Backup/restore functionality and it will be added to future version of the SDK.

* #### After uninstalling and reinstalling the app will the user lose the earned KIN?
  The SDK is doing its best effort to automatically backup and restore the user’s private key however the success is not guaranteed as it depends on external factors (Android OS version, user app backup opt out etc.).
  Therefore, in an event of app uninstall or cache clear, there is no 100% guarantee that the backup/restore succeeded and the user may lose his kin balance in such an event.
  We are well aware of this requirement and we are working on providing the right solution for user facing intuitive and safe backup/restore functionality.

* #### How do I set up a test (fake) account with an initial amount of KIN?
  No need to test (fake) account with initial Kin:  
    1. Playground environment provides  earn opportunities for testing environment where QA can quickly earn enough Kin for all testing( this will be the fastest way to achieve test)
    2. You can use native earn option (ready on Android WIP on iOS)  to request Kin programmatically from within kik
    3. Create a const earn JWT and use native earn API to request Kin for user - each JWT will only work once per user ID
 
* #### What exactly happens when we start the sdk?
  1. Client Wallet created locally (private and public keypair is created and private key is stored securely on client device)
  2. Client register to server providing JWT credentials and public address
  3. Ecosystem backend verify credential and create account for provided public address on Blockchain
  4. Client receive auth token to be used with any network request to Ecosystem backend 
  5. SDK watch blockchain and get notify when client account created
  6. SDK create a trustline transaction (Account can’t receive Kin without establishing  trustline)

* #### What happens exactly when I call purchase (JWT, callBack)?
  These are the steps:
    1. Client send createOrder request with offer JWT to ecosystem backend
    2. Ecosystem verify JWT and provide client the amount, payment address and internal orderID
    3. Client sign a transaction with provided information (the internal order Id is set in the transaction memo
    4. Client submitOrder with the orderID and server side monitor blockchain for transaction with the orderID in the memo field 
    5. Once transaction accepted by blockchain client request getOrder() from server side
    6. Server side verify that the transaction was accepted by the blockchain and sign a JWT confirming the transaction
    7. The JWT is returned to the purchase callback
    8. Client can pass the JWT to digital service server side to unlock offer
