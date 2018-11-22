import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { voted } from '../../../actions/account';
import VotePasswordStep from './votePasswordStep';

const mapStateToProps = state => ({
  account: state.account,
  loading: state.loading,
  peers: state.peers,
});

const mapDispatchToProps = dispatch => ({
  voted: data => dispatch(voted(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate()(VotePasswordStep));
