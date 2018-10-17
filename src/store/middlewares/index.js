import thunk from 'redux-thunk';
import peersMiddleware from './peers';
import accountMiddleware from './account';
import loginMiddleware from './login';
import loadingBarMiddleware from './loadingBar';
import savedAccountsMiddleware from './savedAccounts';

export default [
  thunk,
  peersMiddleware,
  loginMiddleware,
  accountMiddleware,
  loadingBarMiddleware,
  savedAccountsMiddleware,
];
