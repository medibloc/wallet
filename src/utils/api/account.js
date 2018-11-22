import blockTypes from '../../constants/blockTypes';
import { getAccountFromEncKey, isAddress } from '../account';
import {
  createDefaultPayload,
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
    activePeer.getAccount(address, null, blockTypes.tail).then((data) => {
      if (data) {
        resolve({
          ...data,
        });
      } else {
        reject(data);
      }
    }).catch(error => reject(error));
  });

export const send = ({ account, activePeer, chainId, description, nonce, password, to, value }) =>
  new Promise((resolve, reject) => {
    let mAccount;
    try {
      mAccount = getAccountFromEncKey(account.encKey, password);
    } catch (e) {
      reject(errorTypes.wrongPasswordError);
    }
    const tx = valueTransferTx({
      chain_id: chainId,
      from: account.address,
      to,
      value,
      nonce,
      payload: description ? createDefaultPayload(description) : null,
    });

    mAccount.signTx(tx, password);
    console.log(JSON.parse(JSON.stringify(tx)));

    activePeer.sendTransaction(tx).then((res) => {
      console.log(res);
      if (res.hash) {
        resolve({
          timestamp: tx.rawTx.timestamp,
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

// export const transactions = ({ activePeer, address, limit = 20, offset = 0,
// orderBy = 'timestamp:desc', filter = txFilters.all }) => {
//   let params = {
//     recipientId: (filter === txFilters.incoming || filter === txFilters.all)
//      ? address : undefined,
//     senderId: (filter === txFilters.outgoing || filter === txFilters.all)
//      ? address : undefined,
//     limit,
//     offset,
//     orderBy,
//   };
//   params = JSON.parse(JSON.stringify(params));
//   return requestToActivePeer(activePeer, 'transactions', params);
// };

// export const unconfirmedTransactions = (activePeer, address, limit = 20,
//  offset = 0, orderBy = 'timestamp:desc') =>
//   requestToActivePeer(activePeer, 'transactions/unconfirmed', {
//     senderId: address,
//     recipientId: address,
//     limit,
//     offset,
//     orderBy,
//   });

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
          timestamp: tx.rawTx.timestamp,
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
          timestamp: tx.rawTx.timestamp,
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
          timestamp: tx.rawTx.timestamp,
          transactionId: res.hash,
        });
      } else {
        reject(res);
      }
    }).catch(error => reject(error));
  });
