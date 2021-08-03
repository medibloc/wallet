import { activePeerSet, activePeerUpdate } from '../../actions/peers';
import actionTypes from '../../constants/actions';
import network from '../../constants/network';
import localJSONStorage from '../../utils/localJSONStorage';
import { getLoggedInMark } from '../../utils/savedAccounts';
import routes from '../../constants/routes';

const peersMiddleware = store => next => (action) => {
  next(action);

  const networkCode = process.env.NETWORK_CODE || network.code;
  const hasNoSavedAccounts = !localJSONStorage.get('accounts', []).length;

  switch (action.type) {
    case actionTypes.storeCreated:
      /* istanbul ignore else  */
      if (hasNoSavedAccounts) {
        store.dispatch(activePeerSet({ networkCode, noSavedAccounts: true }));
        store.dispatch(activePeerUpdate({ online: true }));
      }

      if (!getLoggedInMark() && !['/', '/#', '/#/'].includes(window.location.pathname)) {
        window.location.pathname = routes.startPage.path;
      }
      break;
    default:
      break;
  }
};

export default peersMiddleware;
