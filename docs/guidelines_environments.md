---
title: Environments
hide_title: true
---

# Environments and Credentials

We currently have 2 environments available for partners:
1. Production - operational and highly available. Uses real Kin.
1. Beta - A place to test your newest Kin integrations. Lower availability. Uses fake Kin.

## Application Credentials
Each environment services multiple applications. Each application has it's own:
* `app_id` - the main identifier for the app.
* JWT public keys - the keys exchanged by the digital service and kin upon the [onboarding](guidelines_onboarding.md) process.
* Rate limits and configuration

On beta, we have generic credentials for a `test` app that are prebuilt into our sample app. The sample app has no server side to generate and sign JWT messages, thus it generates and signs the JWT payloads locally on the device with the example private key (see [Android example](https://github.com/kinecosystem/kin-ecosystem-android-sdk/blob/dev/app/build.gradle#L109-L125)). 
You can use these credentials to connect to the beta environment as the `test` app before you start your onboarding.

On production you will have to have been set up with your own credentials.
