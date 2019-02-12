---
title: Local Environment
hide_title: true
---

# Running locally

## Payment service
Run:
```bash
payment-service > make generate-funding-address
```

The output should be something like:
```bash
. ./local.sh && docker-compose -f docker-compose.tests.yaml run generate-funding-address
# creating ADDRESS
```

Remember this `ADDRESS`, and now run:
```bash
payment-service > make
```

## JWT Service
Run:
```bash
jwt-service > make
```

## marketplace-server
Use the `ADDRESS` from before and run:
```bash
marketplace-server > STELLAR_ADDRESS=ADDRESS make db
```

When it's done run:
```bash
marketplace-server > make
```

To run the tests:
```bash
marketplace-server > JWT_SERVICE_BASE='http://localhost:3002' MARKETPLACE_BASE='http://localhost:3000' make test-system
```
