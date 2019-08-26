import i18next from 'i18next';
import { getAccount } from '../../utils/api/account';
// import { extractAddressFromMnemonic, extractPublicKey } from '../../utils/account';
// import { getDelegate } from '../../utils/api/delegate';
import { accountLoggedIn, accountLoading } from '../../actions/account';
import actionTypes from '../../constants/actions';
import accountConfig from '../../constants/account';
import { errorToastDisplayed } from '../../actions/toaster';

const { lockDuration } = accountConfig;
const loginMiddleware = store => next => (action) => {
  if (action.type !== actionTypes.activePeerSet || action.data.noSavedAccounts) {
    return next(action);
  }
  next(action);

  const { encKey, encPassphrase, activePeer, networkCode } = action.data;
  const address = action.data.address;
  const accountBasics = {
    address,
    encKey,
    encPassphrase,
    networkCode,
  };

  store.dispatch(accountLoading());
  // redirect to main/transactions
  return getAccount(activePeer, address).then((accountData) => {
    const duration = (encKey && store.getState().settings.autoLog) ?
      Date.now() + lockDuration : 0;
    store.dispatch(accountLoggedIn({
      ...accountData,
      ...accountBasics,
      ...{ delegate: {}, isDelegate: false, expireTime: duration },
    }));

    // return getDelegate(activePeer, { publicKey })
    //   .then((delegateData) => {
    //     store.dispatch(accountLoggedIn({
    //       ...accountData,
    //       ...accountBasics,
    //       ...{ delegate: delegateData.delegate, isDelegate: true, expireTime: duration },
    //     }));
    //   }).catch(() => {
    //     store.dispatch(accountLoggedIn({
    //       ...accountData,
    //       ...accountBasics,
    //       ...{ delegate: {}, isDelegate: false, expireTime: duration },
    //     }));
    //   });
  }).catch(() => store.dispatch(errorToastDisplayed({ label: i18next.t('Unable to connect to the node') })));
};

export default loginMiddleware;
