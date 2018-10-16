import React from 'react';
import TransactionList from '../../organisms/transactions/transactionList';
import WBox from '../../atoms/wbox/index';
import styles from './transactionListView.css';

class TransactionListView extends React.Component {
  render() {
    const { t } = this.props;

    return <WBox className={styles.txListViewWrapper}>
      <WBox className={`${styles.txListHeader}`}>
        <div className={styles.txListHeaderTitle}>
          <h4>
            { t('Recent activities') }
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
