import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { successToastDisplayed } from '../../../../actions/toaster';
import KeepKeyFile from './keepKeyFile';

const mapDispatchToProps = dispatch => ({
  successToastDisplayed: data => dispatch(successToastDisplayed(data)),
});

export default connect(null, mapDispatchToProps)(translate()(KeepKeyFile));
