import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import ResetPasswordStep from './resetPasswordStep';
import { activeAccountPasswordUpdated } from '../../../../actions/savedAccounts';

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
)(withRouter(translate()(ResetPasswordStep)));
