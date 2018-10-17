import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import Login from './login';
import { activePeerSet } from '../../../actions/peers';
import { activeAccountSaved, accountSwitched } from '../../../actions/savedAccounts';

/**
 * Using react-redux connect to pass state and dispatch to Login
 */
const mapStateToProps = state => ({
  account: state.account,
  nodes: state.nodes,
  savedAccounts: state.savedAccounts,
});

const mapDispatchToProps = dispatch => ({
  activePeerSet: data => dispatch(activePeerSet(data)),
  activeAccountSaved: () => dispatch(activeAccountSaved()),
  accountSwitched: data => dispatch(accountSwitched(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(translate()(Login)));
