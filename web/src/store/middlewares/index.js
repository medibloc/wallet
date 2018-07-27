import thunk from 'redux-thunk';
import peersMiddleware from '../../../../common/src/store/middlewares/peers';
import accountMiddleware from '../../../../common/src/store/middlewares/account';
import loginMiddleware from '../../../../common/src/store/middlewares/login';
import loadingBarMiddleware from '../../../../common/src/store/middlewares/loadingBar';
import savedAccountsMiddleware from '../../../../common/src/store/middlewares/savedAccounts';

export default [
  thunk,
  peersMiddleware,
  loginMiddleware,
  accountMiddleware,
  loadingBarMiddleware,
  savedAccountsMiddleware,
];
