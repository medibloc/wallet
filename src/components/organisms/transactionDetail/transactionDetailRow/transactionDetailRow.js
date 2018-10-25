import React from 'react';
import WBox from '../../../atoms/wbox/index';
import styles from './transactionDetailRow.css';

class TransactionDetailRow extends React.Component {
  render() {
    const {
      label, shouldShow, value,
    } = this.props;
    return ((shouldShow === null || shouldShow === false) ? null :
      <WBox className={`${styles.row}`}>
        <div className={styles.label}>
          <h6>{label}</h6>
        </div>
        <div className={`${styles.value}`}>
          <h6>{value}</h6>
        </div>
      </WBox>
    );
  }
}

export default TransactionDetailRow;
