import i18next from 'i18next';
import actionTypes from '../constants/actions';
import { BANDWIDTH_USED_TX } from '../constants/bandwidth';
import transactionTypes from '../constants/transactionTypes';
import { send, vest, withdrawVesting } from '../utils/api/account';
// import { registerDelegate, getDelegate, getVotes, getVoters } from '../utils/api/delegate';
// import { loadTransactionsFinish } from './transactions';
// import { delegateRegisteredFailure } from './delegate';
// import { errorAlertDialogDisplayed } from './dialog';
// import Fees from '../constants/fees';
import { loadingStarted, loadingFinished } from './loading';
import { addMed, subMed, toRawMed } from '../utils/med';
import errorTypes from '../constants/errors';

/**
 * Trigger this action to remove passphrase from account object
 *
 * @param {Object} data - account data
 * @returns {Object} - Action object
 */
export const removePassphrase = data => ({
  data,
  type: actionTypes.removePassphrase,
});

/**
 * Trigger this action to update the account object
 * while already logged in
 *
 * @param {Object} data - account data
 * @returns {Object} - Action object
 */
export const accountUpdated = data => ({
  data,
  type: actionTypes.accountUpdated,
});

export const accountPasswordUpdated = data => ({
  data,
  type: actionTypes.accountPasswordUpdated,
});

/**
 * Trigger this action to log out of the account
 * while already logged in
 *
 * @returns {Object} - Action object
 */
export const accountLoggedOut = () => ({
  type: actionTypes.accountLoggedOut,
});

/**
 * Trigger this action to login to an account
 * The login middleware triggers this action
 *
 * @param {Object} data - account data
 * @returns {Object} - Action object
 */
export const accountLoggedIn = data => ({
  type: actionTypes.accountLoggedIn,
  data,
});

export const accountLoading = () => ({
  type: actionTypes.accountLoading,
});

export const accountReload = () => ({
  type: actionTypes.accountReload,
});

export const passwordUsed = data => ({
  type: actionTypes.passwordUsed,
  data,
});

export const passwordVerifying = () => ({
  type: actionTypes.passwordVerifying,
});

export const passwordFailed = () => ({
  type: actionTypes.passwordFailed,
});

// /**
//  * Gets list of all votes
//  */
// export const accountVotesFetched = ({ activePeer, address }) =>
//   dispatch =>
//     getVotes(activePeer, address).then(({ delegates }) => {
//       dispatch({
//         type: actionTypes.accountAddVotes,
//         votes: delegates,
//       });
//     });
//
// /**
//  * Gets list of all voters
//  */
// export const accountVotersFetched = ({ activePeer, publicKey }) =>
//   dispatch =>
//     getVoters(activePeer, publicKey).then(({ accounts }) => {
//       dispatch({
//         type: actionTypes.accountAddVoters,
//         voters: accounts,
//       });
//     });
// /**
//  *
//  */
// export const secondPassphraseRegistered =
//   ({ activePeer, secondPassphrase, account, passphrase }) =>
//   (dispatch) => {
//     setSecondPassphrase(activePeer, secondPassphrase, account.publicKey, passphrase)
//       .then((data) => {
//         dispatch({
//           data: {
//             id: data.transactionId,
//             senderPublicKey: account.publicKey,
//             senderId: account.address,
//             amount: 0,
//             fee: Fees.setSecondPassphrase,
//             type: transactionTypes.setSecondPassphrase,
//           },
//           type: actionTypes.transactionAdded,
//         });
//       }).catch((error) => {
//         const text = (error && error.message) ? error.message :
//          i18next.t('An error occurred while registering your second passphrase.'
//          + 'Please try again.');
//         dispatch(errorAlertDialogDisplayed({ text }));
//       });
//     dispatch(passwordUsed());
//   };
//
// /**
//  *
//  */
// export const delegateRegistered = ({
//   activePeer, account, passphrase, username, secondPassphrase }) =>
//   (dispatch) => {
//     registerDelegate(activePeer, username, passphrase, secondPassphrase)
//       .then((data) => {
//         // dispatch to add to pending transaction
//         dispatch({
//           data: {
//             id: data.transactionId,
//             senderPublicKey: account.publicKey,
//             senderId: account.address,
//             username,
//             amount: 0,
//             fee: Fees.registerDelegate,
//             type: transactionTypes.registerDelegate,
//           },
//           type: actionTypes.transactionAdded,
//         });
//       })
//       .catch((error) => {
//         dispatch(delegateRegisteredFailure(error));
//       });
//     dispatch(passwordUsed());
//   };

/**
 *
 */
export const sent = ({ account, activePeer, amount,
  description, nonce, password, to }) =>
  (dispatch) => {
    dispatch(loadingStarted(actionTypes.requestTransferTransaction));
    dispatch(passwordVerifying());
    send({
      account,
      activePeer,
      description,
      nonce,
      password,
      to,
      value: toRawMed(amount),
    }).then((res) => {
      dispatch({
        data: {
          from: account.address,
          hash: res.transactionId,
          timestamp: res.timestamp,
          to,
          value: toRawMed(amount),
          tx_type: transactionTypes.send,
        },
        type: actionTypes.transactionAdded,
      });
      if (account.address !== to) {
        dispatch({
          data: {
            balance: subMed(account.balance, toRawMed(amount)),
            bandwidth: addMed(account.bandwidth, BANDWIDTH_USED_TX),
            nonce: nonce.toString(),
          },
          type: actionTypes.accountUpdated,
        });
      }
      dispatch(loadingFinished(actionTypes.requestTransferTransaction));
      dispatch(passwordUsed());
    })
      .catch((error) => {
        dispatch(loadingFinished(actionTypes.requestTransferTransaction));
        if (error === errorTypes.wrongPasswordError) {
          dispatch(passwordFailed());
        } else {
          const errorMessage = error && error.message ? `${error.message}.` :
            i18next.t('An error occurred while creating the transaction.');
          dispatch({ data: { errorMessage }, type: actionTypes.transactionFailed });
          dispatch(passwordUsed());
        }
      });
  };


// export const loadDelegate = ({ activePeer, publicKey }) =>
//   (dispatch) => {
//     getDelegate(
//       activePeer, { publicKey },
//     ).then((response) => {
//       dispatch({
//         data: {
//           delegate: response.delegate,
//         },
//         type: actionTypes.updateDelegate,
//       });
//     });
//   };

// export const loadAccount = ({
//   activePeer,
//   address,
//   transactionsResponse,
//   isSameAccount }) =>
//
//   (dispatch) => {
//     getAccount(activePeer, address)
//       .then((response) => {
//         console.log(transactionsResponse);
//         console.log(isSameAccount);
//         dispatch({
//           data: {
//             address,
//             bandwidth: response.bandwidth,
//             balance: response.balance,
//             unstaking: response.unstaking,
//             vesting: response.vesting,
//           },
//           type: actionTypes.updateDelegate,
//         });
//       //   let accountDataUpdated = {
//       //     confirmed: transactionsResponse.transactions,
//       //     count: parseInt(transactionsResponse.count, 10),
//       //     balance: response.balance,
//       //     address,
//       //   };
//       //
//       //   if (!isSameAccount && response.publicKey) {
//       //     dispatch(loadDelegate({
//       //       activePeer,
//       //       publicKey: response.publicKey,
//       //     }));
//       //   } else if (isSameAccount && response.isDelegate) {
//       //     accountDataUpdated = {
//       //       ...accountDataUpdated,
//       //       delegate: response.delegate,
//       //     };
//       //   }
//       //   dispatch(loadTransactionsFinish(accountDataUpdated));
//       });
//   };

/**
 *
 */
export const vested = ({ account, activePeer, amount,
  nonce, password }) =>
  (dispatch) => {
    dispatch(loadingStarted(actionTypes.requestVestTransaction));
    dispatch(passwordVerifying());
    vest({
      account,
      activePeer,
      nonce,
      password,
      value: toRawMed(amount),
    }).then((res) => {
      dispatch({
        data: {
          from: account.address,
          hash: res.transactionId,
          timestamp: res.timestamp,
          value: toRawMed(amount),
          tx_type: transactionTypes.vest,
        },
        type: actionTypes.transactionAdded,
      });
      dispatch({
        data: {
          balance: subMed(account.balance, toRawMed(amount)),
          bandwidth: addMed(account.bandwidth, BANDWIDTH_USED_TX),
          nonce: nonce.toString(),
          vesting: addMed(account.vesting, toRawMed(amount)),
        },
        type: actionTypes.accountUpdated,
      });
      dispatch(loadingFinished(actionTypes.requestVestTransaction));
      dispatch(passwordUsed());
    })
      .catch((error) => {
        dispatch(loadingFinished(actionTypes.requestVestTransaction));
        if (error === errorTypes.wrongPasswordError) {
          dispatch(passwordFailed());
        } else {
          const errorMessage = error && error.message ? `${error.message}.` :
            i18next.t('An error occurred while creating the transaction.');
          dispatch({ data: { errorMessage }, type: actionTypes.transactionFailed });
          dispatch(passwordUsed());
        }
      });
  };

export const vestedAndSent = ({ account, activePeer, description,
  nonce, password, to, transferAmount, vestingAmount }) =>
  (dispatch) => {
    dispatch(loadingStarted(actionTypes.requestVestAndSendTransaction));
    dispatch(passwordVerifying());
    Promise.all([
      vest({
        account,
        activePeer,
        nonce,
        password,
        value: toRawMed(vestingAmount),
      }),
      send({
        account,
        activePeer,
        description,
        nonce: Number(nonce) + 1,
        password,
        to,
        value: toRawMed(transferAmount),
      }),
    ]).then((values) => {
      dispatch({
        data: {
          from: account.address,
          hash: values[0].transactionId,
          timestamp: values[0].timestamp,
          value: toRawMed(vestingAmount),
          tx_type: transactionTypes.vest,
        },
        type: actionTypes.transactionAdded,
      });
      dispatch({
        data: {
          from: account.address,
          hash: values[1].transactionId,
          timestamp: values[1].timestamp,
          to,
          value: toRawMed(transferAmount),
          tx_type: transactionTypes.send,
        },
        type: actionTypes.transactionAdded,
      });
      dispatch({
        data: {
          balance: (account.address !== to) ?
            subMed(subMed(account.balance, toRawMed(vestingAmount)), toRawMed(transferAmount)) :
            subMed(account.balance, toRawMed(vestingAmount)),
          bandwidth: addMed(account.bandwidth, 2 * BANDWIDTH_USED_TX),
          nonce: (Number(nonce) + 1).toString(),
          vesting: addMed(account.vesting, toRawMed(vestingAmount)),
        },
        type: actionTypes.accountUpdated,
      });
      dispatch(loadingFinished(actionTypes.requestVestAndSendTransaction));
      dispatch(passwordUsed());
    })
      .catch((error) => {
        dispatch(loadingFinished(actionTypes.requestVestAndSendTransaction));
        if (error === errorTypes.wrongPasswordError) {
          dispatch(passwordFailed());
        } else {
          const errorMessage = error && error.message ? `${error.message}.` :
            i18next.t('An error occurred while creating the transaction.');
          dispatch({ data: { errorMessage }, type: actionTypes.transactionFailed });
          dispatch(passwordUsed());
        }
      });
  };

/**
 *
 */
export const withdrewVesting = ({ account, activePeer, amount,
  nonce, password }) =>
  (dispatch) => {
    dispatch(loadingStarted(actionTypes.requestWithdrawVestingTransaction));
    dispatch(passwordVerifying());
    withdrawVesting({
      account,
      activePeer,
      nonce,
      password,
      value: toRawMed(amount),
    }).then((res) => {
      dispatch({
        data: {
          from: account.address,
          hash: res.transactionId,
          timestamp: res.timestamp,
          value: toRawMed(amount),
          tx_type: transactionTypes.withdrawVesting,
        },
        type: actionTypes.transactionAdded,
      });
      dispatch({
        data: {
          bandwidth: addMed(account.bandwidth, BANDWIDTH_USED_TX),
          nonce: nonce.toString(),
          unstaking: addMed(account.unstaking, toRawMed(amount)),
          vesting: subMed(account.vesting, toRawMed(amount)),
        },
        type: actionTypes.accountUpdated,
      });
      dispatch(loadingFinished(actionTypes.requestWithdrawVestingTransaction));
      dispatch(passwordUsed());
    })
      .catch((error) => {
        dispatch(loadingFinished(actionTypes.requestWithdrawVestingTransaction));
        if (error === errorTypes.wrongPasswordError) {
          dispatch(passwordFailed());
        } else {
          const errorMessage = error && error.message ? `${error.message}.` :
            i18next.t('An error occurred while creating the transaction.');
          dispatch({ data: { errorMessage }, type: actionTypes.transactionFailed });
          dispatch(passwordUsed());
        }
      });
  };
