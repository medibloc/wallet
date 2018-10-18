import { translate } from 'react-i18next';
import React from 'react';
import TransactionListView from '../../organisms/transactionListView';
import Transfer from '../../organisms/transfer/index';
import WBox from '../../atoms/wbox/index';
import styles from './transactionDashboard.css';

class TransactionsDashboard extends React.Component {
  render() {
    return <div className={styles.wrapper}>
      <WBox className={styles.transfer}>
        <Transfer
          autoFocus={true}
          {...this.props}/>
      </WBox>
      <WBox className={styles.txListView}>
        <TransactionListView {...this.props}/>
      </WBox>
    </div>;
  }
}

export default translate()(TransactionsDashboard);
