---
title: JWT Keys
hide_title: true
id: version-0.7-guidelines_create_jwt_keys
original_id: guidelines_create_jwt_keys
---

# JWT Keys

For the initial partner integration with our SDK and the ability to use your own app identifer with Kin's production and beta servers, you should provide a list of ES256 keys.
Each key has an identifier (key id or `kid` as it appears in a JWT header). The identifier is decided by the digital service.

## Creating a ES256 Key Through the Terminal

First create the private key:
```
openssl ecparam -name secp256k1 -genkey -noout -out myapp-es256_random_id-priv.pem
```
Your file should look similar to:
```
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIA6y07Ry9UBSDnwNdxt2SjexparlF5LW2cUYwSPOExtdoAcGBSuBBAAK
oUQDQgAEiOeUmr4QLe8kFlmoNNXOho+e2zp7Ps8ugY5WaKKGekkSKcmpb0lFXoTo
ujPV3Dbu3YuhdJA52/7BrOuZl3e8IA==
-----END EC PRIVATE KEY-----
```

Then create the public key:
```
openssl ec -in myapp-es256_random_id-priv.pem -pubout -out myapp-es256_random_id.pem
```
Your file should look similar to:
```
-----BEGIN PUBLIC KEY-----
MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEiOeUmr4QLe8kFlmoNNXOho+e2zp7Ps8u
gY5WaKKGekkSKcmpb0lFXoToujPV3Dbu3YuhdJA52/7BrOuZl3e8IA==
-----END PUBLIC KEY-----
```

## Sending Your Keys to Us

For each key you create and would like to use, send us it's public key and the `kid` you will identify it with.
For example:
```json
{
    "random_id1": "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE7ZMH+00RvGSUtKqrjpPTapOKZUZ3aJik\nUhiT8JAoKue/yfA9WK23JAHD07jUqt1bIq7V2wwo6ZzZ5mr6VU4FOw==\n-----END PUBLIC KEY-----\n",
    "random_id2": "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE56gpcf3QRfLHDk0fNzZ4fzUHOHtxChuM\nrFc5zHsbx2RNnAWFiBShkrkm1iDeq6sTfCI2V13P0o2Ht4Ywl3pfAg==\n-----END PUBLIC KEY-----\n"
}
```

The above contains two keys named `random_id1` and `random_id2`. An example JWT payload header signed with key `random_id1` would look like:
```
{
  "alg": "ES256",
  "typ": "JWT",
  "kid": "random_id1"
}
```

