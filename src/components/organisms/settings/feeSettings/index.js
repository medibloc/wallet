import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import FeeSettings from './feeSettings';

const mapStateToProps = state => ({
  account: state.account,
});

export default connect(
  mapStateToProps,
)(translate()(FeeSettings));
