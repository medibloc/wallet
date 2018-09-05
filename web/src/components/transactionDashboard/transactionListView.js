import React from 'react';
import TransactionList from '../transactions/transactionList';
import WBox from '../wbox';
import styles from './transactionListView.css';

class TransactionListView extends React.Component {
  render() {
    const { t } = this.props;

    return <WBox className={styles.txListViewWrapper}>
      <WBox className={`${styles.txListHeader}`}>
        <div className={styles.txListHeaderTitle}>
          <h4>
            { t('Last Activity') }
          </h4>
        </div>
        { /* <div className={styles.txListHeaderMore}>
          <h6>
            { t('See all transactions') }
          </h6>
        </div> */ }
      </WBox>
      <TransactionList
        {...this.props} />
    </WBox>;
  }
}

export default TransactionListView;
