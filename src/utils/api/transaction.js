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

export const transaction = ({ hash, mServer }) =>
  new Promise((resolve, reject) => {
    mServer.getTransaction(hash).then((res) => {
      if (res.error) {
        reject(res.error);
      }
      if (res) {
        resolve({
          transactions: parseTransactions(res.transactions),
        });
      } else {
        reject(res);
      }
    }).catch(error => reject(error));
  });
