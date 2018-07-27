import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { activePeerSet } from '../../../../common/src/actions/peers';
import Register from './register';

const mapStateToProps = state => ({
  account: state.account,
});

const mapDispatchToProps = dispatch => ({
  activePeerSet: data => dispatch(activePeerSet(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate()(Register));
