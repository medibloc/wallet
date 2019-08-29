import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Enter from './keyFile';
import { errorToastDisplayed } from '../../../../actions/toaster';

const mapStateToProps = state => ({
  account: state.account,
});

const mapDispatchToProps = dispatch => ({
  errorToastDisplayed: data => dispatch(errorToastDisplayed(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate()(Enter));
