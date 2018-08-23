import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import PasswordSteps from './passwordSteps';
import { sent } from '../../../../common/src/actions/account';

const mapStateToProps = state => ({
  account: state.account,
  peers: state.peers,
});

const mapDispatchToProps = dispatch => ({
  sent: data => dispatch(sent(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate()(PasswordSteps));
