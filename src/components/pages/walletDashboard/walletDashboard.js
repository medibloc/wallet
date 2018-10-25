import { translate } from 'react-i18next';
import React from 'react';
import TransactionDashboard from '../../organisms/transactionDashboard';
import Transfer from '../../organisms/transfer/index';
import WBox from '../../atoms/wbox/index';
import styles from './walletDashboard.css';

class WalletDashboard extends React.Component {
  render() {
    return <div className={styles.wrapper}>
      <WBox className={styles.transfer}>
        <Transfer
          autoFocus={true}
          {...this.props}/>
      </WBox>
      <WBox className={styles.txDashboard}>
        <TransactionDashboard {...this.props}/>
      </WBox>
    </div>;
  }
}

export default translate()(WalletDashboard);
