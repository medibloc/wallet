import BPDashboard from '../components/pages/bpDashboard';
import Dashboard from '../components/pages/dashboard';
// import Healthdata from '../components/healthdata';
// import Setting from '../components/setting';
import Login from '../components/pages/login';
import Register from '../components/pages/register';
import Restore from '../components/pages/restore';
// import RegisterDelegate from '../components/registerDelegate';
// import SecondPassphrase from '../components/secondPassphrase';
// import SignMessage from '../components/signMessage';
// import Search from '../components/search';
// import SearchResult from '../components/search/searchResult';
// import Settings from '../components/settings';
import StartPage from '../components/pages/startPage';
import WalletDashboard from '../components/pages/walletDashboard';
// import AccountTransactions from '../components/accountTransactions';
// import Voting from '../components/voting';
// import SingleTransaction from '../components/singleTransaction';
// import NotFound from '../components/notFound';
// import AccountVisualDemo from '../components/accountVisual/demo';

export default {
  // accountVisualDemo: {
  //   path: '/account-visual-demo',
  //   component: AccountVisualDemo,
  //   isPrivate: true,
  // },
  blockProducer: {
    path: '/blockProducer',
    component: BPDashboard,
    isPrivate: true,
  },
  dashboard: {
    path: '/dashboard',
    component: Dashboard,
    isPrivate: true,
  },
  wallet: {
    path: '/wallet',
    component: WalletDashboard,
    isPrivate: true,
  },
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
  setting: {
    path: '/setting',
    component: Dashboard,
    isPrivate: true,
  },
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
  // notFound: {
  //   path: '*',
  //   component: NotFound,
  //   isPrivate: false,
  // },
  explorer: {
    path: '/explorer',
    component: Dashboard,
    isPrivate: true,
  },
};
