import thunk from 'redux-thunk';
import accountMiddleware from './account';
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
];
