import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import WithdrawVesting from './withdrawVesting';
import { withdrewVesting } from '../../../actions/account';

const mapStateToProps = state => ({
  loading: state.loading,
  price: state.info.supply ? state.info.supply.price : 0,
});

const mapDispatchToProps = dispatch => ({
  withdrewVesting: data => dispatch(withdrewVesting(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate()(WithdrawVesting));
