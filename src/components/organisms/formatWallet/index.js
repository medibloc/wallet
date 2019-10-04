import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { resetAll } from '../../../actions/settings';
import FormatWallet from './formatWallet';

const mapStateToProps = state => ({
  account: state.account,
});

const mapDispatchToProps = dispatch => ({
  resetAll: () => dispatch(resetAll()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate()(FormatWallet));
