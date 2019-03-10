---
title: Environments
hide_title: true
---

# Environments and Credentials

We currently have 2 environments available for partners:
1. Production - operational and highly available. Uses real Kin.
1. Beta - A place to test your newest Kin integrations. Lower availability. Uses fake Kin.

## Application Credentials
Each environment supports multiple applications. Each app has it's own:
* `app_id` - the main identifier for the app.
* JWT public keys - the keys exchanged by the digital service and kin upon the [onboarding](guidelines_onboarding.md) process.

On beta, we have generic credentials for a `test` app.
You can use these credentials to connect to the beta environment as the `test` app before you start your onboarding.

On production you will have to have been set up with your own credentials.
