import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { loadTransaction } from '../../../actions/transactions';
import TransactionDetailView from './transactionDetailView';

const mapStateToProps = state => ({
  peers: state.peers,
  transaction: state.transaction,
});

const mapDispatchToProps = dispatch => ({
  loadTransaction: data => dispatch(loadTransaction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate()(TransactionDetailView));
