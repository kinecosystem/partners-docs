## Setting Up the Sample App ##

The Kin Ecosystem SDK Sample App demonstrates how to perform common workflows such as creating a user account and creating Spend and Earn offers. You can build the Sample App from the ```app``` module in the Kin Ecosystem SDK Git repository. We recommend building and running the Sample App as a good way to get started with the Kin Ecosystem SDK and familiarize yourself with its functions.

>**NOTE:** The Sample App is for demonstration only, and should not be used for any other purpose.

The Sample App is pre-configured with the default credentials ```appId='test'``` and
```jwt private key```. These credentials can be used for integration testing in any app, but authorization will fail if you attempt to use them in a production environment.

*To override the default credential settings:* 

Create or edit a local ```credential.properties``` file in the ```app``` module directory and add the lines below, using the ```appId``` and ```apiKey``` values you received.

```
APP_ID="YOUR_APP_ID" // The issuer (iss). Default = 'test'.

RS512_PRIVATE_KEY="YOUR_RS512_PRIVATE_KEY" // Used only for sample app, for production create the JWT by server side with ES256 signature.

```

>**NOTE:** For production, create the JWT by server side with ES256 signature.

## Integrating with the Kin SDK ##

*To integrate your project with the Kin Android SDK:*


1. Add the following lines to your project module's ```build.gradle``` file.
```groovy
 repositories {
     ...
     maven {
         url 'https://jitpack.io'
     }
 }
```
2.	Add the following lines to the app module's ```build.gradle``` file.
```groovy
 dependencies {
     ...
     implementation 'com.github.kinfoundation.kin-ecosystem-android-sdk:sdk:0.4.0'

 }
```
>**NOTE:** The kin-ecosystem-android-sdk arr is tested for Android OS version 4.4 (API level 19) and above. 
>* Some functionalities such as observing balance update will not be supported for lower OS version.
>* If your app support lower OS versions (minSdkVersion < 19) we recommend to only enable Kin integration for users with version 4.4 and above.
