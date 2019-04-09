# Medibloc Wallet

Official wallet for the [medibloc blockchain](https://github.com/medibloc/go-medibloc). Desktop version will be published soon.

### Prerequisites

To run MediBloc Wallet following resources are required.

- Node.js v10.13.0 or higher (<https://nodejs.org/>)

- NPM v6.4.1 or higher (<https://www.npmjs.com/>)

- go-medibloc v1.0 (<https://github.com/medibloc/go-medibloc>) - You need to install all required resources written in [go-medibloc](https://github.com/medibloc/go-medibloc).

  ```
  git clone https://github.com/medibloc/go-medibloc.git
  cd go-medibloc
  make dep
  make build
  build/medi conf/local/single_node/node.conf
  ```

- MediBloc Explorer v1.0 (<https://github.com/medibloc/explorer>) - You need to install a server required resources written in [explorer](https://github.com/medibloc/explorer).

## Installation

- Clone the MediBloc Wallet repository and install npm modules.

  ```
  git clone https://github.com/medibloc/wallet.git
  cd wallet
  npm install
  ```

## Running a server using webpack-dev-server
### Configuration

* [networks.js](https://github.com/medibloc/wallet/blob/master/config/networks.js) configuration

You can add a new network configuration like below.

```
  ...
  custom: { // key of the networks object
    name: 'custom', // name of the network
    chainId: 999999, // chain id of the blockchain
    code: 999999, // code of the network
    mServerURL: 'http://localhost:3001', // MediBloc Explorer Server endpoint,
    nodes: ['http://localhost:9921'], // Blockchain RPC endpoint array
  },
  ...
```
* .env file

You should create .env file in the root directory and set CHAIN_VERSION to the networks object key like below.

```
CHAIN_VERSION=custom
```

### Running
```
$ npm run dev
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
