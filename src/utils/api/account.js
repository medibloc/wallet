import { PanaceaClient, panaceaWalletOpts, SigningPanaceaClient } from '@medibloc/panacea-js';
import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import { assertIsBroadcastTxSuccess } from '@cosmjs/stargate';
import {
  getAccountFromEncKey,
  getPrivateKeyFromKeyStore,
  isAddress,
} from '../account';
import {
  createVotePayload,
  vestTx,
  voteTx,
  withdrawVestingTx,
} from '../transaction';
import errorTypes from '../../constants/errors';

export async function getAccount(activePeer, address) {
  if (!isAddress(address)) {
    throw new Error('not a valid address');
  }

  const client = await PanaceaClient.connect(activePeer);
  const balance = await client.getBalance(address, 'umed');

  const data = {
    coins: [balance],
    bonding: 0,
    unbonding: 0,
    reward: 0,
  };
  return data;
}

export async function send({ account, activePeer, memo, password, to, value, fee }) {
  let wallet;

  try {
    const privKey = getPrivateKeyFromKeyStore(account.encKey, password);
    wallet = await DirectSecp256k1Wallet.fromKey(privKey, panaceaWalletOpts.prefix);
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
  // TODO: To be removed since panacea-js v2.0.1
  const fees = {
    amount: [{
      denom: 'umed',
      amount: fee,
    }],
    gas: '200000',
  };
  const result = await client.signAndBroadcast(firstAccount.address, [msg], fees, memo);
  assertIsBroadcastTxSuccess(result);

  return {
    txhash: result.transactionHash,
    timestamp: '', // TODO: for backward-compatibility, but not used
  };
}

export const vest = ({ account, activePeer, chainId, nonce, password, value }) =>
  new Promise((resolve, reject) => {
    let mAccount;
    try {
      mAccount = getAccountFromEncKey(account.encKey, password);
    } catch (e) {
      reject(errorTypes.wrongPasswordError);
    }

    const tx = vestTx({
      chain_id: chainId,
      from: account.address,
      nonce,
      value,
    });

    mAccount.signTx(tx, password);

    activePeer.sendTransaction(tx).then((res) => {
      if (res.hash) {
        resolve({
          timestamp: Math.floor(new Date().getTime() / 1000),
          transactionId: res.hash,
        });
      } else {
        reject(res);
      }
    }).catch(error => reject(error));
  });

export const vote = ({ account, activePeer, candidates, chainId, nonce, password }) =>
  new Promise((resolve, reject) => {
    let mAccount;
    try {
      mAccount = getAccountFromEncKey(account.encKey, password);
    } catch (e) {
      reject(errorTypes.wrongPasswordError);
    }

    const tx = voteTx({
      chain_id: chainId,
      from: account.address,
      payload: candidates ? createVotePayload(candidates) : null,
      nonce,
    });

    mAccount.signTx(tx, password);

    activePeer.sendTransaction(tx).then((res) => {
      if (res.hash) {
        resolve({
          timestamp: Math.floor(new Date().getTime() / 1000),
          transactionId: res.hash,
        });
      } else {
        reject(res);
      }
    }).catch(error => reject(error));
  });

export const withdrawVesting = ({ account, activePeer, chainId, nonce, password, value }) =>
  new Promise((resolve, reject) => {
    let mAccount;
    try {
      mAccount = getAccountFromEncKey(account.encKey, password);
    } catch (e) {
      reject(errorTypes.wrongPasswordError);
    }

    const tx = withdrawVestingTx({
      chain_id: chainId,
      from: account.address,
      nonce,
      value,
    });

    mAccount.signTx(tx, password);
    activePeer.sendTransaction(tx).then((res) => {
      if (res.hash) {
        resolve({
          timestamp: Math.floor(new Date().getTime() / 1000),
          transactionId: res.hash,
        });
      } else {
        reject(res);
      }
    }).catch(error => reject(error));
  });
