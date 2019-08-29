import { parseTransactions } from '../mServer/utils/parser';

// Limit transaction due to prevent network overuse
const limit = 50; // TODO @ggomma move this to config

export const transactions = ({ address, mServer }) =>
  new Promise((resolve, reject) => {
    mServer.getAccountTransactions(address, limit).then((res) => {
      if (res && res.transactions) {
        const txs = parseTransactions(res.transactions);
        resolve({
          count: txs.length,
          transactions: txs,
          total: res.pagination.total,
        });
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
