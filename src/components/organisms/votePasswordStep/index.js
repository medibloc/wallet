import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { errorToastDisplayed } from '../../../actions/toaster';
import { vestedAndVoted, voted } from '../../../actions/account';
import VotePasswordStep from './votePasswordStep';

const mapStateToProps = state => ({
  account: state.account,
  loading: state.loading,
  peers: state.peers,
});

const mapDispatchToProps = dispatch => ({
  errorToastDisplayed: data => dispatch(errorToastDisplayed(data)),
  vestedAndVoted: data => dispatch(vestedAndVoted(data)),
  voted: data => dispatch(voted(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate()(VotePasswordStep));
