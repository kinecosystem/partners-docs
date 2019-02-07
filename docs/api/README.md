---
id: api
title: Ecosytem SDK
hide_title: true
---

# Kin Ecosystem SDK #

## What is the Kin Ecosystem SDK? ##

The Kin Ecosystem SDK allows you to quickly and easily integrate with the Kin platform. This enables you to provide your users with new opportunities to earn and spend the Kin digital currency from inside your app or from the Kin Marketplace offer wall. For each user, the SDK will create wallet and an account on Kin blockchain. By calling the appropriate SDK functions, your application can performs earn and spend transactions. Your users can also view their account balance and their transaction history.

<!--DOCUSAURUS_CODE_TABS-->
<!--iOS-->
## Installation
The fastest way to get started with the sdk is with cocoapods (>= 1.4.0).
```
pod 'KinEcosystem', '0.6.3'
```
> Notice for apps using swift 3.2: the pod installation will change your project's swift version target to 4.0</br>
> This is because the sdk uses swift 4.0, and cocoapods force the pod's swift version on the project. For now, you can manually change your project's swift version in the build setting. A better solution will be available soon.

## Usage

> **Important note:** Apps using the sdk must include a NSPhotoLibraryUsageDescription key entry in the info.plist file. This is becuase the sdk may ask to use the photos library when restoring a backed up wallet. For example, you can use something like:</br>
"_Photo library access is required for backup and restore of your kin wallet_"

If your app already includes such an entry, you do not need to change anything.
<!--Android-->

## Setting Up the Sample App ##

The Kin Ecosystem SDK Sample App demonstrates how to perform common workflows such as creating a user account and creating Spend and Earn offers. You can build the Sample App from the `app` module in the Kin Ecosystem SDK Git repository. We recommend building and running the Sample App as a good way to get started with the Kin Ecosystem SDK and familiarize yourself with its functions.

>**NOTE:** The Sample App is for demonstration only, and should not be used for any other purpose.

The Sample App is pre-configured with the default credentials `appId='test'` and
`jwt private key`. These credentials can be used for integration testing in any app, but authorization will fail if you attempt to use them in a production environment.

*To override the default credential settings:* 

Create or edit a local `credential.properties` file in the `app` module directory and add the lines below, using the `appId` and `apiKey` values you received.

```java
APP_ID="YOUR_APP_ID" // The issuer (iss). Default = 'test'.
RS512_PRIVATE_KEY="YOUR_RS512_PRIVATE_KEY" // Used only for sample app, for production create the JWT by server side with ES256 signature.
```
<!--END_DOCUSAURUS_CODE_TABS-->
>**NOTE:** For production, create the JWT by server side with ES256 signature.

## Beta and Production Environments ##

The Kin Ecosystem provides two working environments:

- **Beta** – a staging and testing environment using test servers and a blockchain test network.
- **Production** – uses production servers and the main blockchain network.

Use the Beta environment to develop, integrate and test your app. Transition to the Production environment when you’re ready to go live with your Kin-integrated app.

<!--DOCUSAURUS_CODE_TABS-->
<!--Android-->

Add environment meta data to you manifest in application level, specifying which one you want to work with.
For Beta: ("beta")
```xml
<application>
    <meta-data android:name="com.kin.ecosystem.sdk.EnvironmentName" android:value="@string/kinecosystem_environment_beta"/>
</application>
```
And for Production use: `@string/kinecosystem_environment_production` as value. 

<!--iOS-->
<!--END_DOCUSAURUS_CODE_TABS-->

>**NOTES:**
>* When working with the Beta environment, you can only register up to 1000 users. An attempt to register additional users will result in an error.
>* In order to switch between environments, you’ll need to clear the application cache.

## Initialize The SDK ##
Kin Ecosystem SDK must be initialized before any interaction with the SDK, in order to do that you should first call:  

<!--DOCUSAURUS_CODE_TABS-->
<!--Android-->
```Java
Kin.initialize(getApplicationContext())
```

<!--iOS-->
```swift
Kin.shared.start(environment: Environment)
```
<!--END_DOCUSAURUS_CODE_TABS-->


>**NOTE** the above method does not perform any network calls and it's a synchronous method. If anything goes wrong during start, an error will be thrown.

## Obtaining Authentication Credentials ##

To access the Kin Ecosystem, you’ll need to obtain authentication credentials, which you then use to register your users.

* **JWT authentication** – a secure authentication method to be used in production. This method uses a JSON Web Token (JWT) signed by the Kin Server to authenticate the client request. You provide the Kin team with one or more public signature keys and its corresponding keyID, and you receive a JWT issuer identifier (ISS key). (See [https://jwt.io](https://jwt.io) to learn more about JWT tokens.)

You supply your credentials when calling the SDK’s ```Kin.login(…)``` function for a specific user. See [Creating a User’s Kin Account](api/CREATE_ACCOUNT.md) to learn more about login and logout.

## Generating the JWT Token ##

A JWT token is a string that is composed of 3 parts:

* **Header** – a JSON structure encoded in Base64Url
* **Payload** – a JSON structure encoded in Base64Url
* **Signature** – constructed with this formula:

    ```ES256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)```

    -- where the secret value is the private key of your agreed-on public/private key pair.

The 3 parts are then concatenated, with the ‘.’ character between each 2 consecutive parts, as follows:

```<header> + “.” + <payload> + “.” + <signature>```

See https://jwt.io to learn more about how to build a JWT token, and to find libraries that you can use to do this.

This is the header structure:

```
{
    "alg": "ES256",
    "typ": "JWT",
    "kid": string" // ID of the keypair that was used to sign the JWT.
    // IDs and public keys will be provided by the signing authority.
    // This enables using multiple private/public key pairs.
    // (The signing authority must provide the verifier with a list of public
    // keys and their IDs in advance.)
}
```

This is the payload structure:

```
{
    // standard fields
    iat: number;  // the time this token was issued, in seconds from Epoch
    iss: string;  // issuer (Kin will provide this value)
    exp: number;  // the time until this token expires, in seconds from Epoch
    sub: "register"

    // application fields
    user_id: string; // A unique ID of the end user (must only be unique among your app’s users; not globally unique)
    device_id: string; // A unique ID of the user's device
}
```

## Primary APIs ##

The following sections show how to implement some primary APIs using the Kin Ecosystem SDK.

* [Creating a User’s Kin Account](api/CREATE_ACCOUNT.md)
  
* [Getting an Account’s Balance](api/BALANCE.md)

* [Requesting Payment for a Custom Earn Offer](api/NATIVE_EARN.md)

* [Creating a Custom Spend Offer](api/NATIVE_SPEND.md)

* [Creating a Pay To User Offer](api/PEER_TO_PEER.md)

* [Displaying the Kin Marketplace](api/DISPLAY_EXPERIENCE.md)

* [Adding Native Offers to the Marketplace Offer Wall](api/ADD_NATIVE_OFFER_TO_MARKETPLACE.md)

* [Requesting an Order Confirmation](api/ORDER_CONFIRMATION.md)

* [Misc](api/MISC.md)

## Common Errors ##
The Ecosystem APIs can response with few types of error, [learn more here](api/COMMON_ERRORS.md)

## License ##

The `kin-ecosystem-ios-sdk` and `kin-ecosystem-android-sdk` libraries are licensed under the MIT license.
