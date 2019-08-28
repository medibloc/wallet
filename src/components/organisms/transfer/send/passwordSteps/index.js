import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import PasswordSteps from './passwordSteps';
import { sent } from '../../../../../actions/account';
import { errorToastDisplayed } from '../../../../../actions/toaster';

const mapStateToProps = state => ({
  account: state.account,
  loading: state.loading,
  transactions: state.transactions,
  peers: state.peers,
});

const mapDispatchToProps = dispatch => ({
  errorToastDisplayed: data => dispatch(errorToastDisplayed(data)),
  sent: data => dispatch(sent(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate()(PasswordSteps));
