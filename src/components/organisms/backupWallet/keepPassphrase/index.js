import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { successToastDisplayed } from '../../../../actions/toaster';
import KeepPassphrase from './keepPassphrase';

const mapDispatchToProps = dispatch => ({
  successToastDisplayed: data => dispatch(successToastDisplayed(data)),
});

export default connect(null, mapDispatchToProps)(translate()(KeepPassphrase));
