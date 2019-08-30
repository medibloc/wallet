import actionTypes from '../constants/actions';
import { loadingStarted, loadingFinished } from './loading';
import { transaction, transactions } from '../utils/api/transaction';

// this flag prevents loadTransactions function called more than once
// which apply empty transactions on the state
let flag = true;

export const loadTransactions = ({ address, mServer }) =>
  (dispatch) => {
    // eslint-disable-next-line no-unneeded-ternary
    if (!flag) return;
    flag = false;
    dispatch(loadingStarted(actionTypes.transactionsLoad));
    // TODO: get transaction details
    transactions({ address, mServer })
      .then((transactionsResponse) => {
        if (transactionsResponse && transactionsResponse.transactions) {
          dispatch({
            data: {
              count: parseInt(transactionsResponse.count, 10),
              confirmed: transactionsResponse.transactions,
              total: parseInt(transactionsResponse.total, 10),
            },
            type: actionTypes.transactionsLoaded,
          });
          dispatch(loadingFinished(actionTypes.transactionsLoad));
          flag = true;
        } else {
          dispatch({
            data: {
              count: 0,
              confirmed: [],
              total: 0,
            },
            type: actionTypes.transactionsLoaded,
          });
          dispatch(loadingFinished(actionTypes.transactionsLoad));
          flag = true;
        }
      });
  };

export const loadTransaction = ({ hash, fromPending = false }) =>
  (dispatch, getState) => {
    const mServer = getState().peers.mServer;
    if (!fromPending) dispatch({ type: actionTypes.transactionCleared });
    transaction({ hash, mServer })
      .then((response) => {
        if (fromPending) {
          dispatch({ data: { confirmed: response.transactions },
            type: actionTypes.transactionsUpdated });
        } else {
          dispatch({ data: response, type: actionTypes.transactionLoaded });
        }
      }).catch((error) => {
        if (!fromPending) dispatch({ data: error, type: actionTypes.transactionLoadFailed });
      });
  };
