import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { loadTransactions } from '../../../actions/transactions';
import TransactionDashboard from './transactionDashboard';

const mapStateToProps = state => ({
  loading: state.loading.length > 0,
  transactions: [...state.transactions.pending,
    ...state.transactions.confirmed]
    .sort((a, b) => b.timestamp - a.timestamp),
  pendingTransactions: state.transactions.pending,
  total: state.transactions.total,
});

const mapDispatchToProps = dispatch => ({
  loadTransactions: data => dispatch(loadTransactions(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate()(TransactionDashboard));
