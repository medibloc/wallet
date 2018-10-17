import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { activePeerSet } from '../../../actions/peers';
import { accountSaved } from '../../../actions/savedAccounts';
import { successToastDisplayed } from '../../../actions/toaster';
import Register from './register';

const mapStateToProps = state => ({
  account: state.account,
});

const mapDispatchToProps = dispatch => ({
  accountSaved: data => dispatch(accountSaved(data)),
  activePeerSet: data => dispatch(activePeerSet(data)),
  successToastDisplayed: data => dispatch(successToastDisplayed(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate()(Register));
