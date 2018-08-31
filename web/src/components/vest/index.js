import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Vest from './vest';
import { vested } from '../../../../common/src/actions/account';

const mapDispatchToProps = dispatch => ({
  vested: data => dispatch(vested(data)),
});

export default connect(
  null,
  mapDispatchToProps,
)(translate()(Vest));
