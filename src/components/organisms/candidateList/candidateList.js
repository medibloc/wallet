import React from 'react';
import isEqual from 'lodash.isequal';
import CandidatesHeader from './candidatesHeader';
import CandidateRow from './candidateRow';
import { MAX_VOTE_NUM } from '../../../constants/candidates';
import VoteFooterMenu from './voteFooterMenu';
import WBox from '../../atoms/wbox/index';
import styles from './candidateList.css';

class CandidateList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFooterMenu: false,
      votingList: Array.from(props.voted) || [],
    };
  }

  componentDidUpdate(prevProps) {
    if (!isEqual([...prevProps.voted].sort(), [...this.props.voted].sort())) {
      this.setState({
        showFooterMenu: false,
        votingList: Array.from(this.props.voted) || [],
      });
    }
  }

  isVotingChanged(votingList) {
    if (!votingList) return this.props.voted.length > 0;
    if (votingList === this.props.voted) return false;
    if (votingList.length !== this.props.voted.length) return true;
    return !isEqual([...votingList].sort(), [...this.props.voted].sort());
  }

  toggleVoting(candidateId) {
    const votingList = this.state.votingList;
    const index = votingList.indexOf(candidateId);
    if (index >= 0) {
      votingList.splice(index, 1);
      this.setState({
        votingList,
      });
      this.setShowFooterMenu(this.isVotingChanged(votingList));
    } else {
      if (votingList.length >= MAX_VOTE_NUM) {
        // TODO @lucasjyjung display message
        return;
      }
      this.setState({
        votingList: [...votingList, candidateId],
      });
      this.setShowFooterMenu(this.isVotingChanged([...votingList, candidateId]));
    }
  }

  setShowFooterMenu(show) {
    if (show) {
      this.setState({
        showFooterMenu: true,
      });
    } else {
      this.setState({
        showFooterMenu: false,
        votingList: Array.from(this.props.voted) || [],
      });
    }
  }

  render() {
    const { openPasswordStep, t } = this.props;
    let candidateList;
    if (!this.props.searchedCandidate) {
      candidateList = (this.props.showMyBP && this.props.candidates) ?
        this.props.candidates.filter(c => this.props.voted.includes(c.candidateId)) :
        this.props.candidates;
    } else {
      candidateList = this.props.searchedCandidate;
    }

    if (this.props.loading) return null;
    // istanbul ignore else
    if (!candidateList || candidateList.length === 0) {
      // istanbul ignore else
      return <p className={`${styles.empty} hasPaddingRow empty-message`}>
        {t('There are no candidates.')}
      </p>;
    }

    return <WBox className={styles.wrapper}>
      <CandidatesHeader/>
      <div className={styles.candidateRowWrapper}>
        {candidateList
          .map((candidate, i) => (
            <CandidateRow
              candidate={candidate}
              isVoted={this.state.votingList.includes(candidate.candidateId)}
              key={i}
              rank={candidate.rank}
              t={t}
              toggleVoting={() => this.toggleVoting(candidate.candidateId)}
              totalVotes={this.props.totalVotes}
            />))}
      </div>
      {this.state.showFooterMenu ?
        <VoteFooterMenu
          onClosePopUp={() => this.setShowFooterMenu(false)}
          openPasswordStep={() => openPasswordStep(this.state.votingList)}
          votingNum={this.state.votingList.length}/> : null
      }
    </WBox>;
  }
}

export default CandidateList;
