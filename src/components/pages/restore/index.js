import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { activePeerSet } from '../../../actions/peers';
import { accountSaved } from '../../../actions/savedAccounts';
import Restore from './restore';

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
)(translate()(Restore));
