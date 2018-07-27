import { extractAddress } from '../../../common/src/utils/account';
import actionTypes from '../constants/actions';
// import { loadingStarted, loadingFinished } from '../utils/loading';
import { transactions } from '../utils/api/account';
import { transaction } from '../utils/api/transaction';
// import { transactions, transaction, unconfirmedTransactions } from '../utils/api/account';
// import { getDelegate } from '../utils/api/delegate';
import { loadAccount } from './account';
// import txTypes from '../constants/transactionTypes';


export const transactionsFilterSet = ({ activePeer, address, limit, txTypeFilter }) =>
  (dispatch) => {
    transactions({
      activePeer,
      address,
      limit,
      txTypeFilter,
    }).then(response => dispatch({
      data: {
        confirmed: response.transactions,
        count: parseInt(response.count, 10),
        txTypeFilter,
      },
      type: actionTypes.transactionsFiltered,
    }));
  };

// export const transactionsUpdateUnconfirmed = ({ activePeer, address, pendingTransactions }) =>
//   (dispatch) => {
//     unconfirmedTransactions(activePeer, address).then(response => dispatch({
//       data: {
//         failed: pendingTransactions.filter(tx =>
//           response.transactions.filter(unconfirmedTx => tx.id
// === unconfirmedTx.id).length === 0),
//       },
//       type: actionTypes.transactionsFailed,
//     }));
//   };

// export const loadTransactionsFinish = accountUpdated =>
//   (dispatch) => {
//     loadingFinished(actionTypes.transactionsLoad);
//     dispatch({
//       data: accountUpdated,
//       type: actionTypes.transactionsLoadFinish,
//     });
//   };

export const loadTransactions = ({ activePeer, publicKey, address }) =>
  (dispatch) => {
    const lastActiveAddress = publicKey ?
      extractAddress(publicKey) :
      null;
    const isSameAccount = lastActiveAddress === address;
    // loadingStarted(actionTypes.transactionsLoad);
    // TODO: get transaction details
    transactions({ activePeer, address })
      .then((transactionsResponse) => {
        dispatch(loadAccount({
          activePeer,
          address,
          transactionsResponse,
          isSameAccount,
        }));

        if (transactionsResponse && transactionsResponse.transactions) {
          let txRequests = [];
          transactionsResponse.transactions.forEach((tx) => {
            txRequests = txRequests.concat(transaction({ activePeer, hash: tx.hash }));
          });
          Promise.all(txRequests).then((txs) => {
            dispatch({
              data: {
                count: parseInt(transactionsResponse.count, 10),
                confirmed: txs,
              },
              type: actionTypes.transactionsLoaded,
            });
          }).catch((err) => {
            console.log(err);
          });
        } else {
          dispatch({
            data: {
              count: 0,
              confirmed: [],
            },
            type: actionTypes.transactionsLoaded,
          });
        }
      });
  };

/**
 *
 *
 */
// export const transactionsRequested = ({ activePeer, address, limit, offset, filter }) =>
//   (dispatch) => {
//     transactions({ activePeer, address, limit, offset, filter })
//       .then((response) => {
//         dispatch({
//           data: {
//             count: parseInt(response.count, 10),
//             confirmed: response.transactions,
//             address,
//             filter,
//           },
//           type: actionTypes.transactionsLoaded,
//         });
//       });
//   };

export const loadTransaction = ({ activePeer, id }) =>
  (dispatch) => {
    dispatch({ type: actionTypes.transactionCleared });

    // TODO: load transaction
    console.log(activePeer, id);
    dispatch({ data: {}, type: actionTypes.transactionLoaded });
    // transaction({ activePeer, id })
    //   .then((response) => {
    //     const added = (response.transaction.votes && response.transaction.votes.added) || [];
    //     const deleted = (response.transaction.votes && response.transaction.votes.deleted) || [];
    //
    //     deleted.map(publicKey =>
    //       getDelegate(activePeer, { publicKey })
    //         .then((delegateData) => {
    //           dispatch({
    //             data: { delegate: delegateData.delegate, voteArrayName: 'deleted' },
    //             type: actionTypes.transactionAddDelegateName,
    //           });
    //         }),
    //     );
    //
    //     added.map(publicKey =>
    //       getDelegate(activePeer, { publicKey })
    //         .then((delegateData) => {
    //           dispatch({
    //             data: { delegate: delegateData.delegate, voteArrayName: 'added' },
    //             type: actionTypes.transactionAddDelegateName,
    //           });
    //         }),
    //     );
    //     dispatch({ data: response, type: actionTypes.transactionLoaded });
    //   }).catch((error) => {
    //   dispatch({ data: error, type: actionTypes.transactionLoadFailed });
    // });
  };
