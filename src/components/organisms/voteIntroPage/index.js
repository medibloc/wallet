import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { settingsUpdated } from '../../../actions/settings';
import VoteIntroPage from './voteIntroPage';

const mapStateToProps = state => ({
  hasVoted: state.account.voted.length > 0,
  showVoteIntroPage: state.settings.showVoteIntroPage,
});

const mapDispatchToProps = dispatch => ({
  settingsUpdated: data => dispatch(settingsUpdated(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate()(VoteIntroPage));
