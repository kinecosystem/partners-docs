
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

The ```kin-ecosystem-ios-sdk``` library is licensed under the MIT license.
