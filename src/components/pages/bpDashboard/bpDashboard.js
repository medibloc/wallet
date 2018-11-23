import React from 'react';
import { translate } from 'react-i18next';
import MultiStep from '../../atoms/multiStep';
import VoteDashboard from '../../organisms/voteDashboard';
import VoteIntroPage from '../../organisms/voteIntroPage';
import WBox from '../../atoms/wbox/index';
import styles from './bpDashboard.css';

class BPDashboard extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return <WBox className={styles.wrapper} hasBorder={true}>
      <MultiStep className={styles.bpDashboard}>
        <VoteIntroPage/>
        <VoteDashboard/>
      </MultiStep>
    </WBox>;
  }
}

export default translate()(BPDashboard);
