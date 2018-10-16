import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import VestSettings from './vestSettings';

const mapStateToProps = state => ({
  account: state.account,
});

export default connect(
  mapStateToProps,
)(translate()(VestSettings));
