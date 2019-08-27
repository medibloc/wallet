import BPDashboard from '../components/pages/bpDashboard';
import Dashboard from '../components/pages/dashboard';
import Login from '../components/pages/login';
import Register from '../components/pages/register';
import Restore from '../components/pages/restore';
import StartPage from '../components/pages/startPage';
import WalletDashboard from '../components/pages/walletDashboard';


export default {
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
  setting: {
    path: '/setting',
    component: Dashboard,
    isPrivate: true,
  },
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
  explorer: {
    path: '/explorer',
    component: Dashboard,
    isPrivate: true,
  },
};
