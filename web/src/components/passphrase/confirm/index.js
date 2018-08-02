import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Confirm from './confirm';

const mapStateToProps = state => ({
  account: state.account,
});

export default connect(
  mapStateToProps,
)(translate()(Confirm));
