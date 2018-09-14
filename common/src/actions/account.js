import i18next from 'i18next';
import actionTypes from '../constants/actions';
import transactionTypes from '../constants/transactionTypes';
import { getAccount, send, vest, withdrawVesting } from '../utils/api/account';
import airdrop from '../utils/api/airdrop';
// import { registerDelegate, getDelegate, getVotes, getVoters } from '../utils/api/delegate';
// import { loadTransactionsFinish } from './transactions';
// import { delegateRegisteredFailure } from './delegate';
// import { errorAlertDialogDisplayed } from './dialog';
// import Fees from '../constants/fees';
import { extractPrivKey } from '../utils/account';
import { toRawMed } from '../utils/med';

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

export const passphraseUsed = data => ({
  type: actionTypes.passphraseUsed,
  data,
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
//     dispatch(passphraseUsed(passphrase));
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
//     dispatch(passphraseUsed(passphrase));
//   };

/**
 *
 */
export const airDropped = ({ activePeer, address }) =>
  (dispatch) => {
    airdrop({
      activePeer, address,
    }).then((res) => {
      dispatch({
        data: {
          transactionId: res.transactionId,
        },
        type: actionTypes.airdropped,
      });
    })
      .catch((error) => {
        const errorMessage = error && error.message ? `${error.message}.` :
          i18next.t('An error occurred while creating the transaction.');
        dispatch({ data: { errorMessage }, type: actionTypes.transactionFailed });
      });
  };

/**
 *
 */
export const sent = ({ activePeer, address, amount,
  description, nonce, passphrase, privKey, to }) =>
  (dispatch) => {
    send({
      activePeer,
      description,
      nonce,
      privKey: privKey || extractPrivKey(passphrase),
      to,
      value: toRawMed(amount),
    }).then((res) => {
      dispatch({
        data: {
          from: address,
          hash: res.transactionId,
          timestamp: res.timestamp,
          to,
          value: toRawMed(amount),
          type: transactionTypes.send,
        },
        type: actionTypes.transactionAdded,
      });
    })
      .catch((error) => {
        const errorMessage = error && error.message ? `${error.message}.` :
          i18next.t('An error occurred while creating the transaction.');
        dispatch({ data: { errorMessage }, type: actionTypes.transactionFailed });
      });
    dispatch(passphraseUsed(passphrase));
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

export const loadAccount = ({
  activePeer,
  address,
  transactionsResponse,
  isSameAccount }) =>

  (dispatch) => {
    getAccount(activePeer, address)
      .then((response) => {
        console.log(transactionsResponse);
        console.log(isSameAccount);
        dispatch({
          data: {
            address,
            bandwidth: response.bandwidth,
            balance: response.balance,
            unstaking: response.unstaking,
            vesting: response.vesting,
          },
          type: actionTypes.updateDelegate,
        });
      //   let accountDataUpdated = {
      //     confirmed: transactionsResponse.transactions,
      //     count: parseInt(transactionsResponse.count, 10),
      //     balance: response.balance,
      //     address,
      //   };
      //
      //   if (!isSameAccount && response.publicKey) {
      //     dispatch(loadDelegate({
      //       activePeer,
      //       publicKey: response.publicKey,
      //     }));
      //   } else if (isSameAccount && response.isDelegate) {
      //     accountDataUpdated = {
      //       ...accountDataUpdated,
      //       delegate: response.delegate,
      //     };
      //   }
      //   dispatch(loadTransactionsFinish(accountDataUpdated));
      });
  };

/**
 *
 */
export const vested = ({ activePeer, address, amount,
  nonce, privKey, passphrase }) =>
  (dispatch) => {
    vest({
      activePeer,
      nonce,
      privKey: privKey || extractPrivKey(passphrase),
      value: toRawMed(amount),
    }).then((res) => {
      dispatch({
        data: {
          from: address,
          hash: res.transactionId,
          timestamp: res.timestamp,
          value: toRawMed(amount),
          type: transactionTypes.vest,
        },
        type: actionTypes.transactionAdded,
      });
    })
      .catch((error) => {
        const errorMessage = error && error.message ? `${error.message}.` :
          i18next.t('An error occurred while creating the transaction.');
        dispatch({ data: { errorMessage }, type: actionTypes.transactionFailed });
      });
    dispatch(passphraseUsed(passphrase));
  };

/**
 *
 */
export const withdrewVesting = ({ activePeer, address, amount,
  nonce, privKey, passphrase }) =>
  (dispatch) => {
    withdrawVesting({
      activePeer,
      nonce,
      privKey: privKey || extractPrivKey(passphrase),
      value: toRawMed(amount),
    }).then((res) => {
      dispatch({
        data: {
          from: address,
          hash: res.transactionId,
          timestamp: res.timestamp,
          value: toRawMed(amount),
          type: transactionTypes.withdrawVesting,
        },
        type: actionTypes.transactionAdded,
      });
    })
      .catch((error) => {
        const errorMessage = error && error.message ? `${error.message}.` :
          i18next.t('An error occurred while creating the transaction.');
        dispatch({ data: { errorMessage }, type: actionTypes.transactionFailed });
      });
    dispatch(passphraseUsed(passphrase));
  };
