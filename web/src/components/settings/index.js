import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Settings from './settings';

/**
 * Using react-redux connect to pass state and dispatch to Settings
 */
const mapStateToProps = state => ({
  account: state.account,
  savedAccounts: state.savedAccounts,
});

export default connect(
  mapStateToProps,
)(translate()(Settings));
