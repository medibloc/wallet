import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import { translate } from 'react-i18next';
import styles from './transactionRow.css';

const TransactionsHeader = ({ t }) => (
  <div className={`${grid.row}  ${styles.headerWrapper}`} id="transactionsHeader">
    <div className={`${styles.leftText} ${grid['col-sm-2']} ${styles.header} transactions-header`}>{t('TxHash')}</div>
    <div className={`${styles.leftText} ${grid['col-sm-2']} ${styles.header} transactions-header`}>{t('Timestamp')}</div>
    <div className={`${styles.leftText} ${grid['col-sm-2']} ${styles.header} transactions-header`}>{t('From')}</div>
    <div className={`${styles.leftText} ${grid['col-sm-2']} ${styles.header} transactions-header`}>{t('To')}</div>
    <div className={`${styles.leftText} ${grid['col-sm-2']} ${styles.header} transactions-header`}>{t('Action')}</div>
    <div className={`${styles.leftText} ${grid['col-sm-2']} ${styles.header} transactions-header`}>{t('Amount')}</div>
  </div>);

export default translate()(TransactionsHeader);
