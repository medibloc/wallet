import actionTypes from '../constants/actions';
import { loadingStarted, loadingFinished } from './loading';
import { transaction, transactions } from '../utils/api/transaction';


export const loadTransactions = ({ address, mServer }) =>
  (dispatch) => {
    // eslint-disable-next-line no-unneeded-ternary
    dispatch(loadingStarted(actionTypes.transactionsLoad));
    // TODO: get transaction details
    transactions({ address, mServer })
      .then((transactionsResponse) => {
        if (transactionsResponse && transactionsResponse.transactions) {
          dispatch({
            data: {
              count: parseInt(transactionsResponse.count, 10),
              confirmed: transactionsResponse,
            },
            type: actionTypes.transactionsLoaded,
          });
          dispatch(loadingFinished(actionTypes.transactionsLoad));
        } else {
          dispatch({
            data: {
              count: 0,
              confirmed: [],
            },
            type: actionTypes.transactionsLoaded,
          });
          dispatch(loadingFinished(actionTypes.transactionsLoad));
        }
      });
  };

export const loadTransaction = ({ hash }) =>
  (dispatch, getState) => {
    const activePeer = getState().peers.activePeer;
    dispatch({ type: actionTypes.transactionCleared });
    transaction({ activePeer, hash })
      .then((response) => {
        dispatch({ data: response, type: actionTypes.transactionLoaded });
      }).catch((error) => {
        dispatch({ data: error, type: actionTypes.transactionLoadFailed });
      });
  };
