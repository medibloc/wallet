import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Enter from './enter';

const mapStateToProps = state => ({
  account: state.account,
});

export default connect(
  mapStateToProps,
)(translate()(Enter));
