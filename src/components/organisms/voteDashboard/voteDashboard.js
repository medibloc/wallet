import React from 'react';
import CandidateDashboard from '../candidateDashboard';
import VotingStatus from '../votingStatus';
import VotePasswordStep from '../votePasswordStep';
import WBox from '../../atoms/wbox/index';
import styles from './voteDashboard.css';

class VoteDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showVotePasswordStep: false,
      votingList: props.votingList,
    };

    this.loadAccount();
    this.loadCandidates();
  }

  loadAccount() {
    this.props.accountReload();
  }

  loadCandidates() {
    this.props.loadCandidates();
  }

  setVotingList(votingList) {
    this.setState({
      votingList,
    });
  }

  toggleVotePasswordStep() {
    this.setState({
      showVotePasswordStep: !this.state.showVotePasswordStep,
    });
  }

  render() {
    return <WBox className={styles.wrapper}>
      <VotingStatus {...this.props}/>
      <CandidateDashboard
        openPasswordStep={(votingList) => {
          this.setVotingList(votingList);
          this.toggleVotePasswordStep();
        }}
        {...this.props}/>
      {
        this.state.showVotePasswordStep ?
          <VotePasswordStep
            closePopUp={() => this.toggleVotePasswordStep()}
            votingList={this.state.votingList}/> : null
      }
    </WBox>;
  }
}

export default VoteDashboard;
