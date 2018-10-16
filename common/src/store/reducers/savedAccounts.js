import { getIndexOfSavedAccount } from '../../../../common/src/utils/savedAccounts';
import actionTypes from '../../../../common/src/constants/actions';

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
          bandwidth: action.data.bandwidth,
          balance: action.data.balance,
          encKey: action.data.encKey ?
            action.data.encKey :
            accounts[indexOfAccount].encKey,
          label: action.data.label ?
            action.data.label :
            accounts[indexOfAccount].label,
          unstaking: action.data.unstaking,
          vesting: action.data.vesting,
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
    // case actionTypes.passphraseUsed:
    //   indexOfAccount = getIndexOfSavedAccount(state.accounts, state.lastActive);
    //   accounts[indexOfAccount] = {
    //     ...accounts[indexOfAccount],
    //     passphrase: action.data,
    //   };
    //   return {
    //     accounts,
    //     lastActive: {
    //       ...state.lastActive,
    //       passphrase: action.data,
    //     },
    //   };
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
    // case actionTypes.removeSavedAccountPassphrase:
    //   return {
    //     ...state,
    //     accounts: state.accounts.map((account) => {
    //       if (!action.data || (`${action.data.networkCode}${action.data.passphrase}`
    // === `${account.networkCode}${account.passphrase}`)) {
    //         delete account.passphrase;
    //       }
    //       return account;
    //     }),
    //   };
    default:
      return state;
  }
};

export default savedAccounts;
