import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { loadTransactions } from '../../../actions/transactions';
import TransactionOverview from './transactionOverview';

const mapStateToProps = state => ({
  networkCode: state.peers.networkCode,
});

const mapDispatchToProps = dispatch => ({
  loadTransactions: data => dispatch(loadTransactions(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate()(TransactionOverview));
