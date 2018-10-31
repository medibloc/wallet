import React, { Fragment } from 'react';
import { DateAndTimeFromTimestamp, TimeFromNow } from '../../atoms/timestamp';
import MedAmount from '../../atoms/medAmount';
import TransactionDetailRow from './transactionDetailRow';
import WBox from '../../atoms/wbox/index';
import { isTransactionField, recoverPayload } from '../../../utils/transaction';
import styles from './transactionDetail.css';

class TransactionDetail extends React.Component {
  render() {
    const { t, transaction } = this.props;
    const payload = recoverPayload(transaction);
    return <WBox className={styles.txDetail}>
      <TransactionDetailRow
        label={t('TxHash')}
        shouldShow={true}
        value={transaction.hash}
      />
      <TransactionDetailRow
        label={t('Type')}
        shouldShow={true}
        value={transaction.tx_type}
      />
      <TransactionDetailRow
        label={t('Timestamp')}
        shouldShow={true}
        value={
          transaction.executed ?
            <Fragment>
              <TimeFromNow time={transaction.timestamp * 1000}/>
              {' '}
              (<DateAndTimeFromTimestamp time={transaction.timestamp * 1000}/>)
            </Fragment> :
            t('Pending...')
        }
      />
      <TransactionDetailRow
        label={t('Nonce')}
        shouldShow={true}
        value={transaction.nonce}
      />
      <TransactionDetailRow
        label={t('From')}
        shouldShow={true}
        value={transaction.from}
      />
      <TransactionDetailRow
        label={t('To')}
        shouldShow={isTransactionField(transaction.tx_type, 'to')}
        value={transaction.to}
      />
      <TransactionDetailRow
        label={t('Amount')}
        shouldShow={isTransactionField(transaction.tx_type, 'value')}
        value={
          <Fragment>
            <MedAmount
              val={transaction.value}>
            </MedAmount>
            <span> MED</span>
          </Fragment>
        }
      />
      <TransactionDetailRow
        label={t('Payload')}
        shouldShow={isTransactionField(transaction.tx_type, 'payload')}
        // TODO: display other kinds of payload
        value={payload && payload.message ? payload.message : null}
      />
    </WBox>;
  }
}

export default TransactionDetail;
