import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { accountLoggedOut } from '../../../actions/account';
import Settings from './settings';

/**
 * Using react-redux connect to pass state and dispatch to Settings
 */
const mapStateToProps = state => ({
  account: state.account,
  savedAccounts: state.savedAccounts,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(accountLoggedOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate()(Settings));
