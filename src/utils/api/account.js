import { panaceaWalletOpts, SigningPanaceaClient } from '@medibloc/panacea-js';
import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import { assertIsBroadcastTxSuccess } from '@cosmjs/stargate';
import {
  getPrivateKeyFromKeyStore,
  isAddress,
} from '../account';
import errorTypes from '../../constants/errors';

export async function getAccount(activePeer, address) {
  if (!isAddress(address)) {
    throw new Error('not a valid address');
  }

  const data = {
    value: 100,
    bonding: 0,
    unbonding: 0,
    reward: 0,
  };
  return data;
//
//   /**
//    * Accound data
//    * 1. Balance
//    * 2. Bonding
//    * 3. Unbonding
//    * 4. Reward
//    * */
//   const process = [
//     {
//       req: addr => PanaceaClient.connect(activePeer).getAccount(addr),
//       val: ['value'],
//     },
//     {
//       req: addr => PanaceaClient.connect(activePeer).getAccount(addr),
//       key: 'bonding',
//     },
//     {
//       req: addr => PanaceaClient.connect(activePeer).getAccount(addr),
//       key: 'unbonding',
//     },
//     {
//       req: addr => PanaceaClient.connect(activePeer).getAccount(addr),
//       key: 'reward',
//     },
//   ];
//   process.reduce((acc, getData, i) => acc.then(() => getData.req(address)
//     .then((response) => { // eslint-disable-line consistent-return
//       let parsedData = response.result;
//       if (getData.val) {
//         parsedData = {};
//         getData.val
//           .forEach((v) => {
//             parsedData[v] = response.result[v]; // eslint-disable-line no-return-assign
//           });
//       }
//
//       if (getData.key) {
//         data[getData.key] = parsedData;
//       } else {
//         if (parsedData.value) parsedData = { ...parsedData.value };
//         data = { ...data, ...parsedData };
//       }
//       if (i === process.length - 1) return resolve(data);
//     })
//     .catch(err => reject(err))), Promise.resolve());
// }
}

export async function send({ account, activePeer, memo, password, to, value, fee }) {
  let wallet;

  try {
    const privKey = getPrivateKeyFromKeyStore(account.encKey, password);
    wallet = DirectSecp256k1Wallet.fromKey(privKey, panaceaWalletOpts.prefix);
  } catch (e) {
    throw errorTypes.wrongPasswordError;
  }

  const [firstAccount] = await wallet.getAccounts();

  const client = await SigningPanaceaClient.connectWithSigner(activePeer, wallet);

  const msg = {
    typeUrl: '/cosmos.bank.v1beta1.MsgSend',
    value: {
      fromAddress: firstAccount.address,
      toAddress: to,
      amount: [{
        denom: 'umed',
        amount: value,
      }],
    },
  };
  const fees = {
    amount: [{
      denom: 'umed',
      amount: fee,
    }],
  };
  const result = await client.signAndBroadcast(firstAccount.address, [msg], fees, memo);
  assertIsBroadcastTxSuccess(result);
}
