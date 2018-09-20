import { randomBytes } from 'crypto';
import blockTypes from '../../constants/blockTypes';
import { extractAddress, isAddress, getAccountFromPrivKey } from '../account';
import { createDefaultPayload, valueTransferTx, vestTx, withdrawVestingTx } from '../transaction';

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

export const send = ({ activePeer, description, nonce, privKey, to, value }) =>
  new Promise((resolve, reject) => {
    const password = randomBytes(32).toString('hex');
    const account = getAccountFromPrivKey(privKey, password);
    const from = extractAddress(account.pubKey);

    const tx = valueTransferTx({
      from,
      to,
      value,
      nonce,
      payload: description ? createDefaultPayload(description) : null,
    });

    account.signTx(tx, password);
    console.log(`send tx: ${JSON.stringify(tx)}`);

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

export const vest = ({ activePeer, nonce, privKey, value }) =>
  new Promise((resolve, reject) => {
    const password = randomBytes(32).toString('hex');
    const account = getAccountFromPrivKey(privKey, password);
    const address = extractAddress(account.pubKey);

    const tx = vestTx({
      from: address,
      nonce,
      value,
    });

    account.signTx(tx, password);
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

export const withdrawVesting = ({ activePeer, nonce, privKey, value }) =>
  new Promise((resolve, reject) => {
    const password = randomBytes(32).toString('hex');
    const account = getAccountFromPrivKey(privKey, password);
    const address = extractAddress(account.pubKey);

    const tx = withdrawVestingTx({
      from: address,
      nonce,
      value,
    });
    console.log(JSON.parse(JSON.stringify(tx)));

    account.signTx(tx, password);
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
