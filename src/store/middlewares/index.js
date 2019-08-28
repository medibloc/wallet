import thunk from 'redux-thunk';
import accountMiddleware from './account';
import infoMiddleware from './info';
import loadingBarMiddleware from './loadingBar';
import loginMiddleware from './login';
import peersMiddleware from './peers';
import savedAccountsMiddleware from './savedAccounts';

export default [
  thunk,
  accountMiddleware,
  loadingBarMiddleware,
  loginMiddleware,
  peersMiddleware,
  savedAccountsMiddleware,
  infoMiddleware,
];
