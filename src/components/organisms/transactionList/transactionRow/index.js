import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import TransactionRow from './transactionRow';

const mapStateToProps = state => ({
  networkCode: state.peers.networkCode,
});

export default connect(mapStateToProps)(translate()(TransactionRow));
