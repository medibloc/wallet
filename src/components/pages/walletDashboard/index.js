import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import WalletDashboard from './walletDashboard';

const mapStateToProps = state => ({
  account: state.account,
  loading: state.loading.length > 0,
  peers: state.peers,
});

export default connect(mapStateToProps)(translate()(WalletDashboard));
