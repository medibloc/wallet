import { translate } from 'react-i18next';
import React from 'react';
import InlineSVG from 'svg-inline-react';
import CandidateSearch from '../../../molecules/candidateSearch/candidateSearch';
import Refresh from '../../../../assets/images/icons/refresh.svg';
import WBox from '../../../atoms/wbox/index';
import styles from './candidateDashboardHeader.css';

class CandidateDashboardHeader extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.showMyBP !== this.props.showMyBP) return true;
    // case when candidates are cleared.
    if (nextProps.candidateNum === 0) return false;
    return nextProps.candidateNum !== this.props.candidateNum;
  }

  render() {
    const { showMyBP, t } = this.props;
    return <WBox className={styles.wrapper}>
      <div className={styles.leftWrapper}>
        <div className={styles.title}>
          <h5>{t('BP Candidates list')}</h5>
        </div>
        <div className={styles.candidateNumWrapper}>
          <h6>
            <span>
              {t('Total: {{candidateNum}}', { candidateNum: this.props.candidateNum })}{t(' ')}
            </span>
          </h6>
        </div>
        <div className={styles.candidateFilterWrapper}>
          <div className={`${styles.tab} ${!showMyBP ? styles.activeTab : styles.inactiveTab}`}
            onClick={() => this.props.setShowMyBP(false)}>
            <h6>{t('All')}</h6>
          </div>
          <div className={`${styles.tab} ${styles.hasLeftMargin} ${showMyBP ? styles.activeTab : styles.inactiveTab}`}
            onClick={() => this.props.setShowMyBP(true)}>
            <h6>{t('My BP')}</h6>
          </div>
        </div>
      </div>
      <div className={styles.rightWrapper}>
        <div className={`${styles.refreshWrapper}`}>
          <InlineSVG className={`${styles.refresh}`}
            onClick={() => this.props.loadCandidates()}
            src={Refresh}/>
        </div>
        <div className={`${styles.searchWrapper}`}>
          <CandidateSearch
            candidates={this.props.candidates}
            clearSearchedCandidate={() => this.props.clearSearchedCandidate()}
            setSearchedCandidate={candidateId => this.props.setSearchedCandidate(candidateId)}/>
        </div>
      </div>
    </WBox>;
  }
}

export default translate()(CandidateDashboardHeader);
