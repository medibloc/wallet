import React from 'react';
import CandidateDashboard from '../candidateDashboard';
import VotingStatus from '../votingStatus';
import WBox from '../../atoms/wbox/index';
import styles from './voteDashboard.css';

class VoteDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.loadAccount();
    this.loadCandidates();
  }

  loadAccount() {
    this.props.accountReload();
  }

  loadCandidates() {
    this.props.loadCandidates();
  }

  render() {
    return <WBox className={styles.wrapper}>
      <VotingStatus {...this.props}/>
      <CandidateDashboard {...this.props}/>
    </WBox>;
  }
}

export default VoteDashboard;
