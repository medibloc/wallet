import actionTypes from '../constants/actions';
import { reset } from '../utils/savedAccounts';

/**
 * An action to update settings
 *
 */
export const settingsUpdated = data => ({
  data,
  type: actionTypes.settingsUpdated,
});

export const settingsReset = data => ({
  data,
  type: actionTypes.settingsReset,
});

export const changeDefaultFee = data => ({
  data,
  type: actionTypes.settingsChangeFee,
});

export const resetAll = () => {
  reset();
  return ({
    type: actionTypes.resetAll,
  });
};
