import { translate } from 'react-i18next';
import React from 'react';
import VoteDashboard from '../../organisms/voteDashboard';
import WBox from '../../atoms/wbox/index';
import styles from './bpDashboard.css';

class BPDashboard extends React.Component {
  render() {
    return <div className={styles.wrapper}>
      <WBox className={styles.voteDashboard}>
        <VoteDashboard {...this.props}/>
      </WBox>
    </div>;
  }
}

export default translate()(BPDashboard);
