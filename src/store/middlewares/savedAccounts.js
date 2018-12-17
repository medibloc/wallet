import actionTypes from '../../constants/actions';
import { accountLoading, accountLoggedOut, accountPasswordUpdated } from '../../actions/account';
import { accountsRetrieved, accountSaved } from '../../actions/savedAccounts';
import { activePeerSet } from '../../actions/peers';
import { getAccount } from '../../utils/api/account';
import { extractAddress } from '../../utils/account';
import { getLastActiveAccount } from '../../utils/savedAccounts';

const savedAccountsMiddleware = (store) => {
  setImmediate(() => {
    const accountsRetrievedAction = accountsRetrieved();
    const savedAccounts = accountsRetrievedAction.data;
    store.dispatch(accountsRetrievedAction);

    if (savedAccounts && savedAccounts.lastActive) {
      const account = savedAccounts.lastActive;
      const networkCode = account.networkCode;

      // /* istanbul ignore if  */
      // if (account.networkCode === networks.customNode.code) {
      //   network.address = account.address;
      // }

      store.dispatch(activePeerSet({
        address: account.address,
        encKey: account.encKey,
        encPassphrase: account.encPassphrase,
        networkCode,
      }));
    }
  });

  const isSameNetwork = (account, peers) => peers.networkCode === account.networkCode;

  const updateSavedAccounts = (peers, accounts) => {
    accounts.forEach((account, i) => {
      const address = extractAddress(account.address);
      if (isSameNetwork(account, peers)) {
        getAccount(peers.activePeer, address).then((result) => {
          if (result.balance !== account.balance ||
            result.staking !== account.staking ||
            result.unstaking !== account.unstaking) {
            accounts[i].balance = result.balance;
            accounts[i].staking = result.staking;
            accounts[i].unstaking = result.unstaking;
            store.dispatch({
              data: {
                accounts,
                lastActive: getLastActiveAccount(),
              },
              type: actionTypes.accountsRetrieved,
            });
          }
        });
      }
    });
  };

  const checkTransactionsAndUpdateSavedAccounts = (peers, tx, savedAccounts) => {
    const changedAccounts = savedAccounts.accounts.filter((account) => {
      const address = extractAddress(account.address);
      const relevantTransactions = tx.filter((transaction) => {
        const sender = transaction ? transaction.senderId : null;
        const recipient = transaction ? transaction.recipientId : null;
        return (address === recipient || address === sender);
      });
      return relevantTransactions.length > 0;
    });
    updateSavedAccounts(peers, changedAccounts);
  };

  return next => (action) => {
    next(action);
    const { peers, account, savedAccounts } = store.getState();
    switch (action.type) {
      case actionTypes.newBlockCreated:
        checkTransactionsAndUpdateSavedAccounts(
          peers,
          action.data.block.transactions,
          savedAccounts,
        );
        break;
      case actionTypes.accountSwitched:
        store.dispatch(accountLoading());
        store.dispatch(activePeerSet({
          address: action.data.address,
          encKey: action.data.encKey,
          encPassphrase: action.data.encPassphrase,
          networkCode: action.data.networkCode,
        }));
        break;
      case actionTypes.activeAccountSaved:
        store.dispatch(accountSaved({
          address: account.address,
          balance: account.balance,
          encKey: account.encKey,
          encPassphrase: account.encPassphrase,
          networkCode: peers.networkCode,
          staking: account.staking,
          points: action.data.points,
          unstaking: account.unstaking,
        }));
        break;
      case actionTypes.activeAccountPasswordUpdated:
        store.dispatch(accountPasswordUpdated({
          address: account.address,
          encKey: action.data.encKey,
          networkCode: account.networkCode,
        }));
        break;
      case actionTypes.accountLoggedIn:
        updateSavedAccounts(peers, savedAccounts.accounts);
        store.dispatch(accountSaved({
          address: action.data.address,
          balance: action.data.balance,
          encKey: action.data.encKey,
          encPassphrase: action.data.encPassphrase,
          networkCode: action.data.networkCode,
          staking: account.staking,
          points: action.data.points,
          unstaking: account.unstaking,
        }));
        break;
      case actionTypes.accountRemoved:
        if (savedAccounts.accounts.length === 0) {
          store.dispatch(accountLoggedOut());
        }
        break;
      default:
        break;
    }
  };
};

export default savedAccountsMiddleware;
