---
title: Launch Experience
hide_title: true
---

## Launching a Specific Experience in KinEcosystem
> For best practice: do not allow the user to double click on the entry point, as it will open the experience twice.

### Launch Kin Marketplace
Optionally, your app can launch the Kin Marketplace offer wall. It displays Earn and Spend offers, which can be added to it by your app or by the Kin Ecosystem Server. When a user selects one of these offers, the Kin Marketplace notifies the app that created the offer. The app can then launch the Earn or Spend activity for the user to complete.
You may choose to add your custom Earn and Spend offers to the Kin Marketplace so that there is a convenient, visible place where the user can access all offers. Some offers displayed in-app might require that the user choose to navigate to a specific page, and therefore might not be so readily visible.

*To display the Kin Marketplace offer wall:*

<!--DOCUSAURUS_CODE_TABS-->
<!--Android-->
```java
try {
    Kin.launchEcosystem(MainActivity.this, EcosystemExperience.MARKETPLACE);
} catch (ClientException e) {
    // handle exception
}
```
<!--iOS-->
```swift
// The default target for opening the ecosystem is the marketplace
try? Kin.shared.launchEcosystem(from: self)
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Launch Kin Order History
Use this option to launch the Ecosystem experience right into the users’ orders history page, where they can view a list of all their spend and earn actions.

*To display the Order History Page:*

<!--DOCUSAURUS_CODE_TABS-->
<!--Android-->
```java
try {
    Kin.launchEcosystem(MainActivity.this, EcosystemExperience.ORDER_HISTORY);
} catch (ClientException e) {
    // handle exception
}
```

<!--iOS-->
```swift
try? Kin.shared.launchEcosystem(from: self, at: .history)
```
<!--END_DOCUSAURUS_CODE_TABS-->

> **NOTE:**  
> The launchEcosystem function is not a one-time initialization function, you must call it each time you want to display a feature in KinEcosystem side.

### Launch Backup And Restore Flows
Optionally, your app can launch the Kin Backup or Restore flows and receive callbacks when user either completed successfully or failure.

<!--DOCUSAURUS_CODE_TABS-->
<!--Android-->
* Step 1 - Create `backupAndRestore` to handle responses:</br>
Call `Kin.getBackupAndRestoreManager(activity)`
```java
try {
    backupAndRestore = Kin.getBackupAndRestoreManager(MainActivity.this);
} catch (ClientException e) {
    // sdk not initialized
}
```

* Step 2 - Add callbacks for backup or restore flow as you wish:</br>
Call `backupAndRestore.registerBackupCallback(callback)` or `backupAndRestore.registerRestoreCallback`

>**NOTE:**  
> The callback registration should happen in `onCreate` for the cases of activity restart.

```java
// For Backup Flow
backupAndRestore.registerBackupCallback(new BackupAndRestoreCallback() {
    @Override
    public void onSuccess() {
        showSnackbar("Backup Succeed", false);
    }

    @Override
    public void onCancel() {
        showSnackbar("Backup Canceled", false);
    }

    @Override
    public void onFailure(Throwable throwable) {
        showSnackbar("Backup Failed " + throwable.getMessage(), true);
    }
});

// For Restore Flow
backupAndRestore.registerRestoreCallback(new BackupAndRestoreCallback() {
    @Override
    public void onSuccess() {
        showSnackbar("Restore Succeed", false);
    }

    @Override
    public void onCancel() {
        showSnackbar("Restore Canceled", false);
    }

    @Override
    public void onFailure(Throwable throwable) {
        showSnackbar("Restore Failed " + throwable.getMessage(), true);
    }
});
```

* Step 3 - In your `onActivityResult` method:</br>
Call `backupAndRestore.onActivityResult(...)` to pass the results.
```java
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    backupAndRestore.onActivityResult(requestCode, resultCode, data);
}
```

* Step 4 - Finally, launch Backup or Restore simply by calling: `backupAndRestore.backupFlow()` or `backupAndRestore.restoreFlow()`.

* Step 5 - After you received the callback, release the backupAndRestore by calling: `backupAndRestore.release()`
<!--iOS-->
*Not Available Yet*
<!--END_DOCUSAURUS_CODE_TABS-->

### Launch Gifting Dialog
Use this option to launch a gifting dialog, where the user can show their appreciation to
other users by gifting Kin.

<!--DOCUSAURUS_CODE_TABS-->
<!--Android-->
* Step 1 - Implement `JwtProvider`</br>
This object will be provided on the following step, in order to create a jwt for p2p offer after the user clicks on a gift option. `JwtProvider` methods are begin used in a worker thread so it's safe to do a synchronous network call on the implementation side.

* Step 2 - Create `GiftingManager`</br>
You should provide your Implementation of `JwtProvider` here. `Kin.login(...)` should be called prior to this API call.

```java
try {
    giftingManager = Kin.getGiftingManager(Your Implementation of JwtProvider);
} catch (ClientException e) {
    // sdk not initialized or account not logged in.
}
```

* Step 3 - Add Gifting Order Confirmation Observer</br>
Once you add your observer you will get a `Subscription` so you can easily remove your observer when you don't need it anymore.
```java
giftingOrderConfirmation = getGiftingManager().addOrderConfirmationObserver(
            new Observer<OrderConfirmation>() {
                @Override
                public void onChanged(OrderConfirmation confirmation) {
                    switch(confirmation.getStatus()) {
                        case COMPLETED:
                            // Gifting succeed
                            Log.d(TAG, "Jwt confirmation: \n" + confirmation.getJwtConfirmation());
                            break;
                        case FAILED:
                            // Gifting Failed
                            confirmation.getException().printStackTrace();
                            break;
                    }

                    // Removing the observer once we do not need it.
                    if (giftingOrderConfirmation != null) {
                        giftingOrderConfirmation.remove();
                    }
                }
            });
```

* Step 4 - Show Gifting Dialog</br>
The `recipientId` is the one who will get Kin after gifting flow is completed.
`recipientId` is required here since we need to create relevant JWT with JwtProvider once the user click on gifting option.
```java
getGiftingManager().showDialog(context, recipientId);
```

<!--iOS-->
* Step 1 - Setup the Delegate</br>
Set the delegate of the `giftingManager` and include the protocol stubs.

```swift
Kin.giftingManager.delegate = self
```

```swift
extension SomeController: GiftingManagerDelegate {
    func giftingManagerDidPresent(_ giftingManager: GiftingManager) {

    }

    func giftingManagerDidCancel(_ giftingManager: GiftingManager) {

    }

    func giftingManagerNeedsJWT(_ giftingManager: GiftingManager, amount: Decimal) -> String? {
        
    }

    func giftingManager(_ giftingManager: GiftingManager, didCompleteWith jwtConfirmation: String) {

    }

    func giftingManager(_ giftingManager: GiftingManager, error: Error) {

    }
}
```

* Step 2 - Provide the JWT</br>
Before the `GiftingManager` sends the payment, it will request the `JWT` string from its `delegate`.

```swift
func giftingManagerNeedsJWT(_ giftingManager: GiftingManager, amount: Decimal) -> String? {
    // Return your JWT string
    return buildJWT(with: amount)
}
```

> Returning `nil` will cause the `GiftingManager.delegate` to call `giftingManager(_:, error:)`.

* Step 3 - Present the Module</br>
When everything is ready, you can present the module from the `GiftingManager`.

```swift
Kin.giftingManager.present(in: someViewController)
```

> `Kin.login(...)` should be called prior to this API call.

* Dismissing the Module

The `GiftingManager` will automatically dismiss itself in the following ways.

- Background Tap: Tapping outside of the appreciation view controller bounds.
- Close Button: Tapping the close button in the appreciation view controller.
- Select Amount: Tapping one of the gifting buttons in the appreciation view controller.
<!--END_DOCUSAURUS_CODE_TABS-->
