import { translate } from 'react-i18next';
import React from 'react';
import MultiStep from '../../atoms/multiStep';
import VoteDashboard from '../../organisms/voteDashboard';
import VoteIntroPage from '../../organisms/voteIntroPage';
import WBox from '../../atoms/wbox/index';
import styles from './bpDashboard.css';

class BPDashboard extends React.Component {
  render() {
    return <WBox className={styles.wrapper} hasBorder={true}>
      <MultiStep className={styles.bpDashboard}>
        { /* <VoteIntroPage/> */ }
        <VoteDashboard {...this.props}/>
        <VoteIntroPage/>
      </MultiStep>
    </WBox>;
  }
}

export default translate()(BPDashboard);
