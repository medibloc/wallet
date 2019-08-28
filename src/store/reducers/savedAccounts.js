import { getIndexOfSavedAccount } from '../../utils/savedAccounts';
import actionTypes from '../../constants/actions';

/**
 *
 * @param {Array} state
 * @param {Object} action
 */
const savedAccounts = (state = { accounts: [] }, action) => {
  const accounts = [...state.accounts];
  let indexOfAccount;
  let changedAccount;

  switch (action.type) {
    case actionTypes.accountsRetrieved:
      return action.data;
    case actionTypes.accountSaved:
      indexOfAccount = getIndexOfSavedAccount(state.accounts, action.data);
      changedAccount = action.data;
      if (indexOfAccount !== -1) {
        changedAccount = {
          ...accounts[indexOfAccount],
          address: action.data.address,
          balance: action.data.balance,
          encKey: action.data.encKey ?
            action.data.encKey :
            accounts[indexOfAccount].encKey,
          encPassphrase: action.data.encPassphrase ?
            action.data.encPassphrase :
            accounts[indexOfAccount].encPassphrase,
          label: action.data.label ?
            action.data.label :
            accounts[indexOfAccount].label,
          points: action.data.points,
          staking: action.data.staking,
          unstaking: action.data.unstaking,
        };
        accounts[indexOfAccount] = changedAccount;
      } else {
        accounts.push(action.data);
      }
      return {
        accounts,
        lastActive: changedAccount,
      };
    case actionTypes.activeAccountPasswordUpdated:
      indexOfAccount = getIndexOfSavedAccount(state.accounts, action.data);
      changedAccount = action.data;
      if (indexOfAccount !== -1) {
        changedAccount = {
          ...accounts[indexOfAccount],
          encKey: action.data.encKey ?
            action.data.encKey :
            accounts[indexOfAccount].encKey,
        };
        accounts[indexOfAccount] = changedAccount;
      }
      return {
        accounts,
        lastActive: changedAccount,
      };
    case actionTypes.accountSwitched:
      return {
        ...state,
        lastActive: action.data,
      };
    case actionTypes.accountRemoved:
      return {
        ...state,
        accounts: state.accounts.filter(account =>
          !(account.address === action.data.address &&
          account.networkCode === action.data.networkCode)),
      };
    default:
      return state;
  }
};

export default savedAccounts;
