# Panacea Web Wallet

An official web wallet for [Panacea Core](https://github.com/medibloc/panacea-core) v2+.

## Building

### Prerequisites

- Node.js v10.13.0 ~ v10.24.0
- [Panacea Tendermint RPC Endpoint](https://docs.cosmos.network/v0.43/core/grpc_rest.html#tendermint-rpc)
  
### Installing dependencies

```bash
npm install
```

### Running a dev server

First of all, edit configurations in the [network.js](https://github.com/medibloc/wallet/blob/master/config/network.js).
```ts
{
  name: 'Mynet',                        // An alias of the network
  chainId: 'mychain-1',                 // A chain ID of the network
  code: 1,                              // To be deprecated soon
  mServerURL: 'http://localhost:8080',  // A Panacea Explorer Server endpoint
  mClientURL: 'http://localhost:7070',  // A Panacea Explorer Client(web) endpoint
  nodes: ['http://localhost:26657'],    // Tendermint RPC endpoint
}
```

Then, the dev server can be run:
```bash
npm run dev
```


## Deploying

### Packaging for production

```bash
npm run build
```
The package is built in the output directory: `app/build/`.

### Uploading the package to AWS S3

Upload the package to the AWS S3 bucket which is associated to a proper AWS Cloudfront.
```bash
cd app/build/
aws cp . s3://BUCKET_NAME/ --recursive
```


## License

[GPL-3.0 License](LICENSE)
