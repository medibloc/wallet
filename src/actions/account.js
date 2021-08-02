import i18next from 'i18next';
import actionTypes from '../constants/actions';
import transactionTypes from '../constants/transactionTypes';
import { send } from '../utils/api/account';
import { loadingStarted, loadingFinished } from './loading';
import { updateProcess, resetProcess } from './process';
import { subMed, toRawMed } from '../utils/med';
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
