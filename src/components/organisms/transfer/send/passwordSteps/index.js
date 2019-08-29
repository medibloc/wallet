import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import PasswordSteps from './passwordSteps';
import { sent } from '../../../../../actions/account';
import { errorToastDisplayed } from '../../../../../actions/toaster';
import { startProcess, updateProcess } from '../../../../../actions/process';

const mapStateToProps = state => ({
  account: state.account,
  loading: state.loading,
  transactions: state.transactions,
  peers: state.peers,
  process: state.process,
});

const mapDispatchToProps = dispatch => ({
  errorToastDisplayed: data => dispatch(errorToastDisplayed(data)),
  sent: data => dispatch(sent(data)),
  startProcess: () => dispatch(startProcess()),
  updateProcess: data => dispatch(updateProcess(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate()(PasswordSteps));
