# Panacea Web Wallet

An official web wallet for [Panacea](https://github.com/medibloc/panacea).

## Building

### Prerequisites

- Node.js v10.13.0 ~ v10.24.0
- [Panacea LCD(Light Client Daemon)](https://medibloc.gitbook.io/panacea-core/guide/light-client-daemon)
  - or, the pre-deployed LCD can be used. See below.
- [Panacea Explorer Server](https://github.com/medibloc/explorer)
  - or, the pre-deployed Explorer Server can be used. See below.
  
### Installing dependencies

```bash
npm install
```

### Running a dev server

First of all, edit configurations in the [networks.js](https://github.com/medibloc/wallet/blob/master/config/networks.js).
There are two pre-defined network configurations for each of Mainnet and Testnet.
Additional network configurations can be defined as below.
```ts
{
  ...,
  mynet: {
    name: 'Mynet',                        // An alias of the network
    chainId: 'mychain-1',                 // A chain ID of the network
    code: 2,                              // To be deprecated soon
    mServerURL: 'http://localhost:8080',  // A Panacea Explorer Server endpoint
    mClientURL: 'http://localhost:7070',  // A Panacea Explorer Client(web) endpoint
    nodes: ['http://localhost:1317'],     // Panacea LCD endpoints
  }
}
```

Next, set an environment variable `CHAIN_VERSION`.
It must be one of the network keys configured in the `networks.js` (such as `mainnet`, `testnet` or `mynet` from the example above).
```bash
export CHAIN_VERSION=mynet
```

Then, the dev server can be run:
```bash
npm run dev
```

### Packaging for production

```bash
npm run build
```
That command makes a package for Mainnet by default.
For other networks, see the `build:testnet` script in the [package.json](https://github.com/medibloc/wallet/blob/master/config/networks.js) for now.
This process would be improved in near future.

The package is built in the output directory: `app/build/`.
Upload those files to the AWS S3 bucket which is associated to a proper AWS Cloudfront.
```bash
cd app/build/
aws cp . s3://BUCKET_NAME/ --recursive
```


## License
```
Copyright (C) 2018  MediBloc

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
