import { translate } from 'react-i18next';
import React from 'react';
import WBox from '../../../atoms/wbox/index';
import styles from './candidateDashboardHeader.css';

class CandidateDashboardHeader extends React.Component {
  render() {
    const { candidateNum, t } = this.props;
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
    </WBox>;
  }
}

export default translate()(CandidateDashboardHeader);
