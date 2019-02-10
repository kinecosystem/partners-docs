---
hide_title: true
title: Miscellaneous
---

## Checking if a User Has a Kin Account

This API will help you determine whether the recipient user has a Kin Account, so if user has account you can [pay Kin to this user](api/PEER_TO_PEER.md)

Call `hasAccount(…)`, while passing the userId (your app userId) and a callback function that will receive a boolean value.
<!--DOCUSAURUS_CODE_TABS-->
<!--Android-->
```java
try {
    Kin.hasAccount(userId, new KinCallback<Boolean>() {
        @Override
        public void onResponse(Boolean hasAccount) {
            if (hasAccount != null && hasAccount){
                createPayToUserOffer(userId);
            } else {
                showSnackbar("Account not found", true)
            }
        }

        @Override
        public void onFailure(KinEcosystemException exception) {
            showSnackbar("Failed - " + exception.getMessage(), true);
        }
    });
} catch (ClientException e) {
    e.printStackTrace();
}
```
<!--iOS-->
```swift
// from sample app:
Kin.shared.hasAccount(peer: otherUserId) { [weak self] response, error in
    if let response = response {
        guard response else {
            self?.presentAlert("User Not Found", body: "User \(otherUserId) could not be found. Make sure the receiving user has activated kin, and in on the same environment as this user")
            return
        }
        // Proceed with payment (transferKin is an internal function in the sample app)
        self?.transferKin(to: otherUserId, appId: id, pKey: jwtPKey)
    } else if let error = error {
        self?.presentAlert("An Error Occurred", body: "\(error.localizedDescription)")
    } else {
        self?.presentAlert("An Error Occurred", body: "unknown error")
    }
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

### User's Order History Stats ###

This API provides user's stats which include information such number of Earn/Spend orders completed by the user or last earn/spend dates.
UserStats information could be used for re-engaging users, provide specific experience for users who never earn before etc.

<!--DOCUSAURUS_CODE_TABS-->
<!--Android-->
```java
try {
    Kin.userStats(new KinCallback<UserStats>() {
        @Override
        public void onResponse(UserStats response) {
            if (response.getEarnCount() == 0) {
                //show first time user UI
            }
        }

        @Override
        public void onFailure(KinEcosystemException exception) {
            //handle onFailure
        }
    });
} catch (ClientException e) {
    //handle ClientException
}
```
<!--iOS-->
```swift
Kin.shared.userStats { [weak self] stats, error in
    if let result = stats {
        self?.presentAlert("User Stats", body: result.description)
    } else if let err = error {
        self?.presentAlert("Error", body: err.localizedDescription)
    } else {
        self?.presentAlert("Error", body: "Unknown Error")
    }
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

