import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import ResetPassword from './resetPassword';
import { activeAccountPasswordUpdated } from '../../../actions/savedAccounts';

/**
 * Using react-redux connect to pass state and dispatch to ResetPassword
 */
const mapStateToProps = state => ({
  account: state.account,
  savedAccounts: state.savedAccounts,
});

const mapDispatchToProps = dispatch => ({
  activeAccountPasswordUpdated: data => dispatch(activeAccountPasswordUpdated(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(translate()(ResetPassword)));
