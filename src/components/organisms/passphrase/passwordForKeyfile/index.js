import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { activePeerSet } from '../../../../actions/peers';
import Password from './passwordForKeyfile';
import { errorToastDisplayed } from '../../../../actions/toaster';

const mapStateToProps = state => ({
  account: state.account,
});

const mapDispatchToProps = dispatch => ({
  activePeerSet: data => dispatch(activePeerSet(data)),
  errorToastDisplayed: data => dispatch(errorToastDisplayed(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate()(Password));
