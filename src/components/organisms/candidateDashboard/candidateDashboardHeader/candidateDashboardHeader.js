import { translate } from 'react-i18next';
import React from 'react';
import WBox from '../../../atoms/wbox/index';
import styles from './candidateDashboardHeader.css';

class CandidateDashboardHeader extends React.Component {
  render() {
    const { candidateNum, setShowMyBP, showMyBP, t } = this.props;
    return <WBox className={styles.wrapper}>
      <div className={styles.title}>
        <h5>{t('BP Candidates list')}</h5>
      </div>
      <div className={styles.candidateNumWrapper}>
        <h6>
          <span>
            {t('Total: {{candidateNum}}', { candidateNum })}{t(' ')}
          </span>
        </h6>
      </div>
      <div className={styles.candidateFilterWrapper}>
        <div className={`${styles.tab} ${!showMyBP ? styles.activeTab : styles.inactiveTab}`}
          onClick={() => setShowMyBP(false)}>
          <h6>{t('All')}</h6>
        </div>
        <div className={`${styles.tab} ${styles.hasLeftMargin} ${showMyBP ? styles.activeTab : styles.inactiveTab}`}
          onClick={() => setShowMyBP(true)}>
          <h6>{t('My BP')}</h6>
        </div>
      </div>
    </WBox>;
  }
}

export default translate()(CandidateDashboardHeader);
