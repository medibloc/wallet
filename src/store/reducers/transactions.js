import actionTypes from '../../constants/actions';
import txFilter from '../../constants/transactionFilters';

const initialState = {
  pending: [],
  confirmed: [],
  count: null,
  total: null,
};

/**
 *
 * @param {Array} state
 * @param {Object} action
 */
const transactions = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.transactionAdded:
      return Object.assign({}, state, {
        pending: [action.data, ...state.pending],
      });
    case actionTypes.transactionFailed:
      return Object.assign({}, state, {
        failed: { errorMessage: action.data.errorMessage },
      });
    case actionTypes.transactionsFailed:
      return Object.assign({}, state, {
        // Filter any failed transaction from pending
        pending: state.pending.filter(
          pendingTransaction => action.data.failed.filter(
            transaction => transaction.id === pendingTransaction.id).length === 0),
      });
    case actionTypes.transactionsLoaded:
      return Object.assign({}, state, {
        // Filter any newly confirmed transaction from pending
        pending: state.pending.filter(
          pendingTransaction => action.data.confirmed.filter(
            transaction => transaction.id === pendingTransaction.id).length === 0),
        confirmed: [
          ...action.data.confirmed,
        ],
        count: action.data.count,
        total: action.data.total,
      });
    case actionTypes.transactionsUpdated: {
      // Remove transaction from pendingTransactions if success
      const filteredPendingTransactions = state.pending.filter(
        pendingTransaction => !action.data.confirmed.some(
          transaction => transaction.txHash.includes(pendingTransaction.txHash)));
      // Prevent duplicate transaction in confirmed transactions
      const filteredConfirmedTransactions = [
        ...action.data.confirmed,
        ...state.confirmed.filter(
          confirmedTransaction => !action.data.confirmed.some(
            transaction => transaction.txHash.includes(confirmedTransaction.txHash))),
      ];
      return Object.assign({}, state, {
        pending: filteredPendingTransactions,
        confirmed: filteredConfirmedTransactions,
        count: action.data.count ||
          filteredPendingTransactions.length + filteredConfirmedTransactions.length,
        total: action.data.total || state.total,
      });
    }
    case actionTypes.transactionsFiltered:
      return Object.assign({}, state, {
        confirmed: action.data.confirmed,
        count: action.data.count,
        total: action.data.total,
        filter: action.data.filter,
      });
    case actionTypes.transactionsLoadFinish:
      return Object.assign({}, state, {
        confirmed: action.data.confirmed,
        count: action.data.count,
        total: action.data.total,
        account: {
          address: action.data.address,
          balance: action.data.balance,
          // delegate: action.data.delegate,
        },
        filter: txFilter.all,
      });
    case (actionTypes.accountSwitched):
      return { pending: [], confirmed: [], count: 0, total: 0 };
    case actionTypes.resetAll:
      return initialState;
    default:
      return state;
  }
};

export default transactions;
