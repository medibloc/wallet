import React from 'react';
import CandidateDashboardHeader from './candidateDashboardHeader';
import CandidateList from '../candidateList';
import WBox from '../../atoms/wbox/index';
import styles from './candidateDashboard.css';

class CandidateDashboard extends React.Component {
  render() {
    const { candidates } = this.props;
    return <WBox className={styles.wrapper}>
      <CandidateDashboardHeader
        candidateNum={candidates ? candidates.length : 0}/>
      <CandidateList {...this.props}/>
    </WBox>;
  }
}

export default CandidateDashboard;
