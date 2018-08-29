import { activePeerSet, activePeerUpdate } from '../../actions/peers';
import actionTypes from '../../constants/actions';
import networks from './../../constants/networks';
import localJSONStorage from './../../utils/localJSONStorage';

const peersMiddleware = store => next => (action) => {
  next(action);

  const networkCode = networks.default.code;
  const hasNoSavedAccounts = !localJSONStorage.get('accounts', []).length;

  switch (action.type) {
    case actionTypes.storeCreated:
      /* istanbul ignore else  */
      if (hasNoSavedAccounts) {
        store.dispatch(activePeerSet({ networkCode, noSavedAccounts: true }));
        store.dispatch(activePeerUpdate({ online: true }));
      }
      break;
    default:
      break;
  }
};

export default peersMiddleware;
