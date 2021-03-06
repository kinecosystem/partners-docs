---
title: Errors
hide_title: true
---

## Common Errors
Most of the errors are derived from the `KinEcosystemException` exception, Exception has an error code - `getCode()` and a detailed message - `getMessage()`.

#### ClientException
Represents an error in local client SDK, error code might be:
* `ACCOUNT_NOT_LOGGED_IN` - Account is not logged in, use (`Kin.login(…)`) method first. see [Create Account](api_create_account.md).
* `BAD_CONFIGURATION` - Bad or missing configuration parameters.
* `INTERNAL_INCONSISTENCY` - Some unexpected error occurred internally.

#### ServiceException
Represents an error communicating with Kin server, error code might be:
* `SERVICE_ERROR` - Some internal server error happened.
* `NETWORK_ERROR` - Error accessing the server.
* `TIMEOUT_ERROR` - Timeout occurred.
* `USER_NOT_FOUND` - Operation required with a non existing user.

#### BlockchainException
Represents an error originated with Kin blockchain, error code might be:
* `ACCOUNT_CREATION_FAILED` - Error trying to create a new account for this user.
* `ACCOUNT_NOT_FOUND` - Blockchain operation required on non-existing account.
* `ACCOUNT_ACTIVATION_FAILED` - Activating(Add Trustline with Kin) an account failed.
* `INSUFFICIENT_KIN` - Not enough Kin balance to perform the operation.
* `TRANSACTION_FAILED` - Transaction has failed.
* `BLOCKCHAIN_ENDPOINT_CHANGED` - Migration needed. SDK of version 1.0 is needed to perform the migration. Any function can return this exception which will then trigger the migration of the current wallet. The user will have to retry his latest action after the migration completes.
