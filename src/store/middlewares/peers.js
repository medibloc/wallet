import { activePeerSet, activePeerUpdate } from '../../actions/peers';
import actionTypes from '../../constants/actions';
import networks from '../../constants/networks';
import localJSONStorage from '../../utils/localJSONStorage';
import { getLoggedInMark } from '../../utils/savedAccounts';

const peersMiddleware = store => next => (action) => {
  next(action);

  const networkCode = process.env.NETWORK_CODE || networks.default.code;
  const hasNoSavedAccounts = !localJSONStorage.get('accounts', []).length;

  switch (action.type) {
    case actionTypes.storeCreated:
      /* istanbul ignore else  */
      if (hasNoSavedAccounts) {
        store.dispatch(activePeerSet({ networkCode, noSavedAccounts: true }));
        store.dispatch(activePeerUpdate({ online: true }));
      }

      if (!getLoggedInMark()) {
        window.location.pathname = '/';
      }
      break;
    default:
      break;
  }
};

export default peersMiddleware;
