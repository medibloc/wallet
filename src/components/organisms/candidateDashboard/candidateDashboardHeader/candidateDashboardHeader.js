import { translate } from 'react-i18next';
import React from 'react';
import InlineSVG from 'svg-inline-react';
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
    const { candidateNum, loadCandidates, setShowMyBP, showMyBP, t } = this.props;
    return <WBox className={styles.wrapper}>
      <div className={styles.leftWrapper}>
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
      </div>
      <div className={styles.rightWrapper}>
        <div className={`${styles.refreshWrapper}`}>
          <InlineSVG className={`${styles.refresh}`}
            onClick={() => loadCandidates()}
            src={Refresh}/>
        </div>
      </div>
    </WBox>;
  }
}

export default translate()(CandidateDashboardHeader);
