import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { loadTransactions } from '../../../../common/src/actions/transactions';
import TransactionsDashboard from './transactionDashboard';

const mapStateToProps = state => ({
  account: state.account,
  loading: state.loading.length > 0,
  peers: state.peers,
  transactions: [...state.transactions.pending,
    ...state.transactions.confirmed].reverse().slice(0, 12),
  pendingTransactions: state.transactions.pending,
});

const mapDispatchToProps = dispatch => ({
  loadTransactions: data => dispatch(loadTransactions(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate()(TransactionsDashboard));
