# Creating a ES256 Key Through the Terminal

```
openssl ecparam -name secp256k1 -genkey -noout -out kin-es256_0-priv.pem
openssl ec -in kin-es256_0-priv.pem -pubout -out kin-es256_0.pem
```
