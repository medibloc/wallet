import {
  getAccountFromEncKey,
  getAccountFromPrivKey,
  getPrivateKeyFromKeyStore,
  isAddress,
} from '../account';
import {
  createVotePayload,
  valueTransferTx,
  vestTx,
  voteTx,
  withdrawVestingTx,
} from '../transaction';
import errorTypes from '../../constants/errors';

export const getAccount = (activePeer, address) =>
  new Promise((resolve, reject) => {
    if (!isAddress(address)) {
      reject('not a valid address');
    }

    let data = {};

    /**
     * Accound data
     * 1. Balance
     * 2. Bonding
     * 3. Unbonding
     * 4. Reward
     * */
    const process = [
      {
        req: addr => activePeer.Account.getAccount(addr),
        val: ['value'],
      },
      {
        req: addr => activePeer.Staking.getDelagatorInfo(addr),
        key: 'bonding',
      },
      {
        req: addr => activePeer.Staking.getDelegatorUnbondingInfo(addr),
        key: 'unbonding',
      },
      {
        req: addr => activePeer.Distribution.getDelegatorRewards(addr),
        key: 'reward',
      },
    ];
    process.reduce((acc, getData, i) => acc.then(() => getData.req(address)
      .then((response) => { // eslint-disable-line consistent-return
        let parsedData = response;
        if (getData.val) {
          parsedData = {};
          getData.val
            .forEach((v) => {
              parsedData[v] = response[v]; // eslint-disable-line no-return-assign
            });
        }

        if (getData.key) {
          data[getData.key] = parsedData;
        } else {
          data = { ...data, ...parsedData };
        }
        if (i === process.length - 1) return resolve(data);
      })
      .catch(err => reject(err))), Promise.resolve());
  });

export const send = ({ account, activePeer, chainId, description, password, to, value, fee }) =>
  new Promise((resolve, reject) => {
    let mAccount;
    try {
      const privKey = getPrivateKeyFromKeyStore(account.encKey, password);
      mAccount = getAccountFromPrivKey(privKey);
    } catch (e) {
      reject(errorTypes.wrongPasswordError);
    }

    const tx = valueTransferTx({
      // Msg params
      fromAddress: account.value.address,
      toAddress: to,
      amount: value,

      // Tx params
      sequence: account.value.sequence,
      accountNumber: account.value.account_number,
      chainId,
      memo: description,
      fee,
    });

    mAccount.sign(tx);
    const convertedTx = tx.convertToBroadcastTx('block');

    activePeer.Tendermint.broadcastTx(convertedTx).then((res) => {
      if (res.hash) {
        resolve({
          timestamp: Math.floor(new Date().getTime() / 1000),
          transactionId: res.hash,
        });
      } else {
        reject(res);
      }
    }).catch((error) => {
      console.log(error);
      reject(error);
    });
  });

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
    console.log(JSON.parse(JSON.stringify(tx)));

    activePeer.sendTransaction(tx).then((res) => {
      console.log(res);
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
      console.log(res);
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
    console.log(JSON.parse(JSON.stringify(tx)));

    mAccount.signTx(tx, password);
    activePeer.sendTransaction(tx).then((res) => {
      console.log(res);
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
