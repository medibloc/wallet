// import Dashboard from '../components/dashboard';
// import Healthdata from '../components/healthdata';
// import Setting from '../components/setting';
import Login from '../components/login';
import Register from '../components/register';
import Restore from '../components/restore';
// import RegisterDelegate from '../components/registerDelegate';
// import SecondPassphrase from '../components/secondPassphrase';
// import SignMessage from '../components/signMessage';
// import Search from '../components/search';
// import SearchResult from '../components/search/searchResult';
import StartPage from '../components/startPage/startPage';
// import TransactionDashboard from '../components/transactionDashboard';
// import AccountTransactions from '../components/accountTransactions';
// import Voting from '../components/voting';
// import SingleTransaction from '../components/singleTransaction';
import NotFound from '../components/notFound';
// import AccountVisualDemo from '../components/accountVisual/demo';

export default {
  // accountVisualDemo: {
  //   path: '/account-visual-demo',
  //   component: AccountVisualDemo,
  //   isPrivate: true,
  // },
  // dashboard: {
  //   path: '/dashboard',
  //   component: Dashboard,
  //   isPrivate: true,
  // },
  // wallet: {
  //   path: '/wallet',
  //   component: TransactionDashboard,
  //   isPrivate: true,
  // },
  // delegates: {
  //   path: '/delegates',
  //   component: Voting,
  //   isPrivate: true,
  // },
  // healthdata: {
  //   path: '/healthdata',
  //   component: Healthdata,
  //   isPrivate: true,
  // },
  // setting: {
  //   path: '/setting',
  //   component: Setting,
  //   isPrivate: true,
  // },
  // secondPassphrase: {
  //   path: '/second-passphrase',
  //   component: SecondPassphrase,
  //   isPrivate: true,
  // },
  // signMessage: {
  //   path: '/sign-message',
  //   component: SignMessage,
  //   isPrivate: true,
  // },
  // registerDelegate: {
  //   path: '/register-delegate',
  //   component: RegisterDelegate,
  //   isLoaded: true,
  //   isPrivate: false,
  // },
  // addAccount: {
  //   path: '/add-account',
  //   component: Login,
  //   isLoaded: true,
  //   isPrivate: false,
  // },
  login: {
    path: '/login',
    component: Login,
    isLoaded: true,
    isPrivate: false,
  },
  register: {
    path: '/register',
    component: Register,
    isLoaded: true,
    isPrivate: false,
  },
  restore: {
    path: '/restore',
    component: Restore,
    isLoaded: true,
    isPrivate: false,
  },
  startPage: {
    path: '/',
    component: StartPage,
    isLoaded: true,
    isPrivate: false,
    exact: true,
  },
  notFound: {
    path: '*',
    component: NotFound,
    isPrivate: false,
  },
  // search: {
  //   pathPrefix: '/explorer',
  //   path: '/search',
  //   component: Search,
  //   isPrivate: false,
  // },
  // searchResult: {
  //   name: 'searchResult',
  //   pathPrefix: '/explorer',
  //   path: '/result',
  //   pathSuffix: '/:query?',
  //   component: SearchResult,
  //   isPrivate: false,
  // },
  // accounts: {
  //   pathPrefix: '/explorer',
  //   path: '/accounts',
  //   pathSuffix: '/:address?',
  //   component: AccountTransactions,
  //   isPrivate: false,
  // },
  // transactions: {
  //   pathPrefix: '/explorer',
  //   path: '/transactions',
  //   pathSuffix: '/:id?',
  //   component: SingleTransaction,
  //   isPrivate: false,
  // },
  // notFoundExplorer: {
  //   pathPrefix: '/explorer',
  //   path: '*',
  //   component: NotFound,
  //   isPrivate: false,
  // },
  // explorer: {
  //   path: '/explorer',
  // },
};
