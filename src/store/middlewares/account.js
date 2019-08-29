import { getAccount } from '../../utils/api/account';
import { transactions as getTransactions } from '../../utils/api/transaction';
import { accountUpdated } from '../../actions/account';
import { activePeerUpdate } from '../../actions/peers';
import actionTypes from '../../constants/actions';
import accountConfig from '../../constants/account';
import { isEqualTo } from '../../utils/med';

const { lockDuration } = accountConfig;

const updateTransactions = (store, peers) => {
  const state = store.getState();
  const { filter } = state.transactions;
  const address = state.transactions.account
    ? state.transactions.account.address
    : state.account.address;

  getTransactions({
    address, limit: 25, mServer: peers.mServer, filter,
  }).then((response) => {
    store.dispatch({
      data: {
        confirmed: response.transactions,
        count: parseInt(response.count, 10),
      },
      type: actionTypes.transactionsUpdated,
    });
  });
};

const updateAccountData = (store) => {
  const { peers, account } = store.getState();

  getAccount(peers.activePeer, account.address).then((result) => {
    if (!isEqualTo(result.balance, account.balance) ||
      !isEqualTo(result.staking, account.staking) ||
      !isEqualTo(result.unstaking, account.unstaking) ||
      !isEqualTo(result.nonce, account.nonce)) {
      updateTransactions(store, peers, account);
    }

    // If account is new and has no log in blockchain
    // It means that account does not have any balance. (No future transaction)
    if (!result.address) {
      result = {
        account_number: null,
        address: account.address,
      };
    }
    store.dispatch(accountUpdated(result));
    store.dispatch(activePeerUpdate({ online: true }));
  }).catch((res) => {
    store.dispatch(activePeerUpdate({ online: false, code: res.code }));
  });
};

const passwordUsed = (store) => {
  store.dispatch(accountUpdated({
    expireTime: Date.now() + lockDuration,
    passwordValidity: true,
    passwordVerifying: false,
  }));
};

const passwordVerifying = (store) => {
  store.dispatch(accountUpdated({
    passwordValidity: false,
    passwordVerifying: true,
  }));
};

const passwordFailed = (store) => {
  store.dispatch(accountUpdated({
    passwordValidity: false,
    passwordVerifying: false,
  }));
};

const accountMiddleware = store => next => (action) => {
  next(action);
  switch (action.type) {
    // update on login because the 'save account' button
    // depends on a rerendering of the page
    // TODO: fix the 'save account' path problem, so we can remove this
    case actionTypes.accountLoggedIn:
      updateAccountData(store);
      break;
    case actionTypes.accountReload:
      updateAccountData(store);
      break;
    case actionTypes.passwordUsed:
      passwordUsed(store);
      break;
    case actionTypes.passwordVerifying:
      passwordVerifying(store);
      break;
    case actionTypes.passwordFailed:
      passwordFailed(store);
      break;
    default: break;
  }
};

export default accountMiddleware;
