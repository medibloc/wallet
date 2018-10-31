import React from 'react';
import { translate } from 'react-i18next';
import { txColorConverter, txTypeConverter } from '../../../../utils/txFieldConverter';
import styles from './transactionType.css';

const TransactionType = (props) => {
  const color = txColorConverter(props.type, props.isReceived);
  const type = txTypeConverter(props.type, props.isReceived);
  return type ? <span className={`${styles.smallButton} ${styles[color]}`}>{type}</span> : null;
};

export default translate()(TransactionType);
