import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { loadTransactions } from '../../../actions/transactions';
import TransactionOverview from './transactionOverview';

const mapDispatchToProps = dispatch => ({
  loadTransactions: data => dispatch(loadTransactions(data)),
});

export default connect(null, mapDispatchToProps)(translate()(TransactionOverview));
