import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import MainMenu from './mainMenu';
import getNetwork from '../../../utils/getNetwork';

const mapStateToProps = state => ({
  account: state.account,
  showDelegate: state.settings.advancedMode,
  showFaucet: state.account.networkCode ?
    getNetwork(state.account.networkCode).testnet || false : false,
});

export default withRouter(connect(mapStateToProps)(translate()(MainMenu)));

