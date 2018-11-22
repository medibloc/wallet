import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { accountReload } from '../../../actions/account';
import { loadCandidates } from '../../../actions/candidates';
import VoteDashboard from './voteDashboard';

const mapStateToProps = state => ({
  account: state.account,
  candidates: state.candidates && state.candidates.allCandidates ?
    state.candidates.allCandidates.sort((a, b) => b.votePower - a.votePower) : [],
  totalVotes: state.candidates.totalVotes,
  votingList: state.account.voted,
  voted: state.account.voted,
});

const mapDispatchToProps = dispatch => ({
  accountReload: () => dispatch(accountReload()),
  loadCandidates: () => dispatch(loadCandidates()),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate()(VoteDashboard));
