import React from 'react';
import CandidateDashboardHeader from './candidateDashboardHeader';
import CandidateList from '../candidateList';
import WBox from '../../atoms/wbox/index';
import styles from './candidateDashboard.css';

class CandidateDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchedCandidate: null,
      showMyBP: false,
    };
  }

  clearSearchedCandidate() {
    this.setState({
      searchedCandidate: null,
    });
  }

  setSearchedCandidate(candidateId) {
    const candidate = this.props.candidates.find(c => c.candidateId === candidateId);
    this.setState({
      searchedCandidate: candidate ? [candidate] : null,
    });
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
        candidates={candidates}
        candidateNum={candidates ? candidates.length : 0}
        clearSearchedCandidate={() => this.clearSearchedCandidate()}
        loadCandidates={() => this.props.loadCandidates()}
        setSearchedCandidate={candidateId => this.setSearchedCandidate(candidateId)}
        setShowMyBP={bool => this.setShowMyBP(bool)}
        showMyBP={this.state.showMyBP}/>
      <CandidateList
        searchedCandidate={this.state.searchedCandidate}
        showMyBP={this.state.showMyBP}
        {...this.props}/>
    </WBox>;
  }
}

export default CandidateDashboard;
