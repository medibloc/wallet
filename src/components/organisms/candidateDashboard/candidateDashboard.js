import React from 'react';
import CandidateDashboardHeader from './candidateDashboardHeader';
import CandidateList from '../candidateList';
import WBox from '../../atoms/wbox/index';
import styles from './candidateDashboard.css';

class CandidateDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMyBP: false,
    };
  }

  setShowMyBP(showMyBP) {
    this.setState({
      showMyBP,
    });
  }

  render() {
    const { candidates } = this.props;
    return <WBox className={styles.wrapper}>
      <CandidateDashboardHeader
        candidateNum={candidates ? candidates.length : 0}
        setShowMyBP={bool => this.setShowMyBP(bool)}
        showMyBP={this.state.showMyBP}/>
      <CandidateList
        showMyBP={this.state.showMyBP}
        {...this.props}/>
    </WBox>;
  }
}

export default CandidateDashboard;
