import React from 'react';
import { PrimaryButton } from '../../atoms/toolbox/buttons/button';
import voteIntro from '../../../assets/images/voteIntro.png';
import WBox from '../../atoms/wbox/index';
import styles from './voteIntroPage.css';

class VoteIntroPage extends React.Component {
  render() {
    const { nextStep, t } = this.props;

    return <div className={styles.wrapper}
      style={{ backgroundImage: `url(${voteIntro})` }}>
      <WBox className={styles.voteDashboard}>
        <div className={styles.header}>
          <h3>{t('Vote. Show your power.')}</h3>
        </div>
        <PrimaryButton
          className={`${styles.nextButton}`}
          label={t('Go to vote')}
          onClick={() => nextStep()}/>
      </WBox>
    </div>;
  }
}

export default VoteIntroPage;
