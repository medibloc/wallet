import React from 'react';
import CandidateDashboard from '../candidateDashboard';
import VotingStatus from '../votingStatus';
import Vote from '../vote';
import WBox from '../../atoms/wbox/index';
import styles from './voteDashboard.css';

class VoteDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showVoteStep: false,
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

  toggleVoteStep() {
    this.setState({
      showVoteStep: !this.state.showVoteStep,
    });
  }

  render() {
    return <WBox className={styles.wrapper}>
      <VotingStatus {...this.props}/>
      <CandidateDashboard
        openPasswordStep={(votingList) => {
          this.setVotingList(votingList);
          this.toggleVoteStep();
        }}
        {...this.props}/>
      {
        this.state.showVoteStep ?
          <Vote
            closePopUp={() => this.toggleVoteStep()}
            votingList={this.state.votingList}/> : null
      }
    </WBox>;
  }
}

export default VoteDashboard;
