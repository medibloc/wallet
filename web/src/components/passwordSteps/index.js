import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import PasswordSteps from './passwordSteps';
import { sent, vested, vestedAndSent } from '../../../../common/src/actions/account';
import { errorToastDisplayed } from '../../../../common/src/actions/toaster';

const mapStateToProps = state => ({
  account: state.account,
  peers: state.peers,
});

const mapDispatchToProps = dispatch => ({
  errorToastDisplayed: data => dispatch(errorToastDisplayed(data)),
  sent: data => dispatch(sent(data)),
  vested: data => dispatch(vested(data)),
  vestedAndSent: data => dispatch(vestedAndSent(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate()(PasswordSteps));
