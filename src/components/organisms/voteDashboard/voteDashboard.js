import { translate } from 'react-i18next';
import React from 'react';
import { PrimaryButton } from '../../atoms/toolbox/buttons/button';
import WBox from '../../atoms/wbox/index';
import styles from './voteDashboard.css';

class VoteDashboard extends React.Component {
  render() {
    const { t } = this.props;

    return <div className={styles.wrapper}>
      <WBox className={styles.voteDashboard}>
        <div className={styles.header}>
          <h3>{t('Vote. Show your power.')}</h3>
        </div>
        <PrimaryButton
          className={`${styles.nextButton}`}
          label={t('Go to vote')}/>
      </WBox>
    </div>;
  }
}

export default translate()(VoteDashboard);
