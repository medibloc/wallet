import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Fee from './fee';
import { changeDefaultFee } from '../../../actions/settings';

const mapStateToProps = state => ({
  loading: state.loading,
  fee: state.settings.fee,
});

const mapDispatchToProps = dispatch => ({
  changeDefaultFee: data => dispatch(changeDefaultFee(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate()(Fee));
