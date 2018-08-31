import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import WithdrawVesting from './withdrawVesting';
import { withdrewVesting } from '../../../../common/src/actions/account';

const mapDispatchToProps = dispatch => ({
  withdrewVesting: data => dispatch(withdrewVesting(data)),
});

export default connect(
  null,
  mapDispatchToProps,
)(translate()(WithdrawVesting));
