import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import WithdrawVesting from './withdrawVesting';
import { withdrewVesting } from '../../../../common/src/actions/account';

const mapStateToProps = state => ({
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  withdrewVesting: data => dispatch(withdrewVesting(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate()(WithdrawVesting));
