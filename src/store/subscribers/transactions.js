import { loadTransaction } from '../../actions/transactions';

const checkPendingTransactionStatus = (store) => {
  const { transactions } = store.getState();

  // Check if pending transaction is
  if (transactions && transactions.pending && transactions.pending.length > 0) {
    transactions.pending.forEach((pendingTx) => {
      loadTransaction({
        hash: pendingTx.txHash, fromPending: true,
      })(store.dispatch, store.getState);
    });
  }
};

export default checkPendingTransactionStatus;
