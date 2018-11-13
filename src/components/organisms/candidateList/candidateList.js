import React from 'react';
import CandidatesHeader from './candidatesHeader';
import CandidateRow from './candidateRow';
import VoteFooterMenu from './voteFooterMenu';
import WBox from '../../atoms/wbox/index';
import styles from './candidateList.css';

class CandidateList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      candidatesMap: [],
      votingList: Array.from(props.voted) || [],
      voted: Array.from(props.voted) || [],
    };
  }

  isVotingChanged() {
    if (this.state.votingList === this.state.voted) return false;
    if (this.state.votingList.length !== this.state.voted.length) return true;
    for (let i = 0; i < this.state.votingList.length; ++i) {
      if (!this.state.voted.includes(this.state.votingList[i])) return true;
    }
    return false;
  }

  toggleVoting(candidateId) {
    const votingList = this.state.votingList;
    const index = votingList.indexOf(candidateId);
    if (index >= 0) {
      votingList.splice(index, 1);
      this.setState({
        votingList,
      });
    } else {
      this.setState({
        votingList: [...votingList, candidateId],
      });
    }
  }

  render() {
    const { candidates, loading, t, totalVotes } = this.props;

    if (loading) return null;
    // istanbul ignore else
    if (!candidates || candidates.length === 0) {
      // istanbul ignore else
      return <p className={`${styles.empty} hasPaddingRow empty-message`}>
        {t('There are no candidates.')}
      </p>;
    }

    return <WBox className={styles.wrapper}>
      <CandidatesHeader/>
      <div className={styles.candidateRowWrapper}>
        {candidates
        // .filter(fixIncomingFilter)
          .map((candidate, i) => (
            <CandidateRow
              candidate={candidate}
              isVoted={this.state.votingList.includes(candidate.candidateId)}
              key={i}
              rank={i + 1}
              t={t}
              toggleVoting={() => this.toggleVoting(candidate.candidateId)}
              totalVotes={totalVotes}
            />))}
      </div>
      {this.isVotingChanged() ?
        <VoteFooterMenu/> :
        <div className={styles.footer}/>
      }
    </WBox>;
  }
}

export default CandidateList;
