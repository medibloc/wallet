import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { loadTransactions } from '../../../actions/transactions';
import WalletDashboard from './walletDashboard';

const mapStateToProps = state => ({
  account: state.account,
  loading: state.loading.length > 0,
  peers: state.peers,
  transactions: [...state.transactions.pending,
    ...state.transactions.confirmed]
    .sort((a, b) => b.timestamp - a.timestamp),
  pendingTransactions: state.transactions.pending,
});

const mapDispatchToProps = dispatch => ({
  loadTransactions: data => dispatch(loadTransactions(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate()(WalletDashboard));
