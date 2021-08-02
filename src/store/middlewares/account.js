import { getAccount } from '../../utils/api/account';
import { accountUpdated } from '../../actions/account';
import { activePeerUpdate } from '../../actions/peers';
import actionTypes from '../../constants/actions';
import accountConfig from '../../constants/account';

const { lockDuration } = accountConfig;

const updateAccountData = (store) => {
  const { peers, account } = store.getState();

  getAccount(peers.activePeer, account.address).then((result) => {
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
