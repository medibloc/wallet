import txTypes from '../../constants/transactionTypes';
import { parseTransactions } from '../mServer/utils/parser';

export const transactions = ({ address, mServer, txTypeFilter }) =>
  new Promise((resolve, reject) => {
    mServer.getAccountTransactions(address).then((res) => {
      if (res && res.transactions) {
        const txs = parseTransactions(res.transactions);
        if (txTypeFilter) {
          const filteredTxs = txs.filter((tx) => {
            let flag = false;
            if (tx && tx.tx_type) {
              txTypes.forEach((v) => {
                if (tx.tx_type === v) {
                  flag = true;
                }
              });
            }
            return flag;
          });
          resolve({
            count: filteredTxs.length,
            transactions: filteredTxs,
          });
        } else {
          resolve({
            count: txs.length,
            txs,
          });
        }
      }
      reject(res);
    }).catch(error => reject(error));
  });

export const transaction = ({ activePeer, hash }) =>
  new Promise((resolve, reject) => {
    activePeer.getTransaction(hash).then((data) => {
      if (data) {
        resolve({
          ...data,
        });
      } else {
        reject(data);
      }
    }).catch(error => reject(error));
  });
