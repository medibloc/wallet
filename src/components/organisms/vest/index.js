import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Vest from './vest';
import { vested } from '../../../actions/account';

const mapStateToProps = state => ({
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  vested: data => dispatch(vested(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate()(Vest));
