import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { activePeerSet } from '../../../../common/src/actions/peers';
import { accountSaved } from '../../../../common/src/actions/savedAccounts';
import Register from './register';

const mapStateToProps = state => ({
  account: state.account,
});

const mapDispatchToProps = dispatch => ({
  accountSaved: data => dispatch(accountSaved(data)),
  activePeerSet: data => dispatch(activePeerSet(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate()(Register));
