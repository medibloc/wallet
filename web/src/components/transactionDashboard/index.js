import { connect } from 'react-redux';
import TransactionsDashboard from './transactionDashboard';

const mapStateToProps = state => ({
  address: state.account.address,
  balance: state.account.balance,
  vesting: state.account.vesting,
  account: state.account,
  pendingTransactions: state.transactions.pending,
});

export default connect(mapStateToProps)(TransactionsDashboard);
