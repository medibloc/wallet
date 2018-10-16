import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import SettingsMenu from './settingsMenu';
import { activeAccountSaved, accountsRetrieved } from '../../../../../../common/src/actions/savedAccounts';

/**
 * Using react-redux connect to pass state and dispatch to SettingsMenu
 */
const mapStateToProps = state => ({
  account: state.account,
  savedAccounts: state.savedAccounts,
});

const mapDispatchToProps = dispatch => ({
  activeAccountSaved: () => dispatch(activeAccountSaved()),
  accountsRetrieved: () => dispatch(accountsRetrieved()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate()(SettingsMenu));
