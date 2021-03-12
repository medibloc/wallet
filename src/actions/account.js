import i18next from 'i18next';
import difference from 'lodash.difference';
import actionTypes from '../constants/actions';
import transactionTypes from '../constants/transactionTypes';
import { send, vest, vote, withdrawVesting } from '../utils/api/account';
import { candidatesUpdated } from './candidates';
import { loadingStarted, loadingFinished } from './loading';
import { updateProcess, resetProcess } from './process';
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


/**
 *
 */
export const sent = ({ account, activePeer, amount, chainId,
  memo, password, to, fee }) =>
  (dispatch) => {
    dispatch(loadingStarted(actionTypes.requestTransferTransaction));
    dispatch(passwordVerifying());
    send({
      account,
      activePeer,
      chainId,
      memo,
      password,
      to,
      fee: toRawMed(fee),
      value: toRawMed(amount),
    }).then((res) => {
      dispatch({
        data: {
          fromAccount: account.address,
          txHash: res.txhash,
          timestamp: res.timestamp,
          toAccount: to,
          amount: toRawMed(amount),
          type: transactionTypes.send,
        },
        type: actionTypes.transactionAdded,
      });
      if (account.address !== to) {
        dispatch({
          data: {
            sequence: +account.sequence + 1,
            coins: [{
              denom: 'umed',
              amount: subMed(subMed(account.coins[0].amount, toRawMed(amount)), toRawMed(fee)),
            }],
          },
          type: actionTypes.accountUpdated,
        });
      } else {
        dispatch({
          data: {
            sequence: +account.sequence + 1,
            coins: [{
              denom: 'umed',
              amount: subMed(account.coins[0].amount, toRawMed(fee)),
            }],
          },
          type: actionTypes.accountUpdated,
        });
      }
      dispatch(resetProcess());
      dispatch(loadingFinished(actionTypes.requestTransferTransaction));
      dispatch(passwordUsed());
    })
      .catch((error) => {
        dispatch(loadingFinished(actionTypes.requestTransferTransaction));
        if (error === errorTypes.wrongPasswordError) {
          dispatch(updateProcess({ error }));
          dispatch(passwordFailed());
        } else {
          const errorMessage = error && error.raw_log ? `${error.raw_log}.` :
            i18next.t('An error occurred while creating the transaction.');
          dispatch(updateProcess({ error: errorMessage }));
          dispatch({ data: { errorMessage }, type: actionTypes.transactionFailed });
          dispatch(passwordUsed());
        }
      });
  };

/**
 *
 */
export const vested = ({ account, activePeer, amount, chainId,
  nonce, password }) =>
  (dispatch) => {
    dispatch(loadingStarted(actionTypes.requestVestTransaction));
    dispatch(passwordVerifying());
    vest({
      account,
      activePeer,
      chainId,
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
          nonce: nonce.toString(),
          staking: addMed(account.staking, toRawMed(amount)),
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

export const vestedAndSent = ({ account, activePeer, chainId, memo,
  nonce, password, to, transferAmount, vestingAmount }) =>
  (dispatch) => {
    dispatch(loadingStarted(actionTypes.requestVestAndSendTransaction));
    dispatch(passwordVerifying());
    Promise.all([
      vest({
        account,
        activePeer,
        chainId,
        nonce,
        password,
        value: toRawMed(vestingAmount),
      }),
      send({
        account,
        activePeer,
        chainId,
        memo,
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
          nonce: (Number(nonce) + 1).toString(),
          staking: addMed(account.staking, toRawMed(vestingAmount)),
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
export const vestedAndVoted = ({ account, activePeer, candidates, chainId,
  nonce, password, vestingAmount }) =>
  (dispatch) => {
    dispatch(loadingStarted(actionTypes.requestVestAndVoteTransaction));
    dispatch(passwordVerifying());
    Promise.all([
      vest({
        account,
        activePeer,
        chainId,
        nonce,
        password,
        value: toRawMed(vestingAmount),
      }),
      vote({
        account,
        activePeer,
        candidates,
        chainId,
        nonce: Number(nonce) + 1,
        password,
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
          voted: candidates,
          tx_type: transactionTypes.vote,
        },
        type: actionTypes.transactionAdded,
      });
      dispatch({
        data: {
          balance: subMed(account.balance, toRawMed(vestingAmount)),
          nonce: (Number(nonce) + 1).toString(),
          staking: addMed(account.staking, toRawMed(vestingAmount)),
          voted: candidates,
        },
        type: actionTypes.accountUpdated,
      });
      const voteAdded = difference(candidates, account.voted)
        .map(c => ({ candidateId: c, isAdded: true }));
      const voteSubtracted = difference(account.voted, candidates)
        .map(c => ({ candidateId: c, isAdded: false }));
      const voteDiff = voteAdded.concat(voteSubtracted);
      dispatch(candidatesUpdated({
        candidates,
        newStaking: toRawMed(vestingAmount),
        voteDiff,
        votePower: addMed(account.staking),
      }));
      dispatch(loadingFinished(actionTypes.requestVestAndVoteTransaction));
      dispatch(passwordUsed());
    })
      .catch((error) => {
        dispatch(loadingFinished(actionTypes.requestVestAndVoteTransaction));
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
export const voted = ({ account, activePeer, candidates, chainId,
  nonce, password }) =>
  (dispatch) => {
    dispatch(loadingStarted(actionTypes.requestVoteTransaction));
    dispatch(passwordVerifying());
    vote({
      account,
      activePeer,
      candidates,
      chainId,
      nonce,
      password,
    }).then((res) => {
      dispatch({
        data: {
          from: account.address,
          hash: res.transactionId,
          timestamp: res.timestamp,
          voted: candidates,
          tx_type: transactionTypes.vote,
        },
        type: actionTypes.transactionAdded,
      });
      dispatch({
        data: {
          nonce: nonce.toString(),
          voted: candidates,
        },
        type: actionTypes.accountUpdated,
      });
      const voteAdded = difference(candidates, account.voted)
        .map(c => ({ candidateId: c, isAdded: true }));
      const voteSubtracted = difference(account.voted, candidates)
        .map(c => ({ candidateId: c, isAdded: false }));
      const voteDiff = voteAdded.concat(voteSubtracted);
      dispatch(candidatesUpdated({
        voteDiff,
        votePower: account.staking,
      }));
      dispatch(loadingFinished(actionTypes.requestVoteTransaction));
      dispatch(passwordUsed());
    })
      .catch((error) => {
        dispatch(loadingFinished(actionTypes.requestVoteTransaction));
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
export const withdrewVesting = ({ account, activePeer, amount, chainId,
  nonce, password }) =>
  (dispatch) => {
    dispatch(loadingStarted(actionTypes.requestWithdrawVestingTransaction));
    dispatch(passwordVerifying());
    withdrawVesting({
      account,
      activePeer,
      chainId,
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
          nonce: nonce.toString(),
          staking: subMed(account.staking, toRawMed(amount)),
          unstaking: addMed(account.unstaking, toRawMed(amount)),
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
