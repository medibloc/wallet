import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import { translate } from 'react-i18next';
import TransactionType from '../transactionType';
import styles from './transactionRow.css';
import Amount from '../amount';
import Spinner from '../../../atoms/spinner';
import { DateFromTimestamp } from '../../../atoms/timestamp';
import getNetwork from '../../../../utils/getNetwork';


class TransactionRow extends React.Component {
  render() {
    const { props } = this;
    const url = getNetwork(props.networkCode).mServerURL;
    return (
      <div className={`${grid.row} ${styles.rows} transactions-row`}>
        <div className={`${styles.text} ${styles.leftText} ${grid['col-sm-2']} transactions-cell`}>
          <a href={`${url}/en/tx/${props.value.txHash}`} target={'_blank'}>
            <span> {props.value.txHash} </span>
          </a>
        </div>
        <div className={`${styles.text} ${styles.leftText} ${grid['col-sm-2']} transactions-cell`}>
          {props.value.on_chain ? <DateFromTimestamp time={props.value.timestamp * 1000} /> :
            <Spinner />}
        </div>
        <div className={`${styles.text} ${styles.leftText} ${grid['col-sm-2']} transactions-cell`}>
          <a href={`${url}/en/account/${props.value.fromAccount}`} target={'_blank'}>
            <span> {props.value.fromAccount} </span>
          </a>
        </div>
        <div className={`${styles.text} ${styles.leftText} ${grid['col-sm-2']} transactions-cell`}>
          <a href={`${url}/en/account/${props.value.toAccount}`} target={'_blank'} className={`${styles.clickable}`}>
            <span> { props.value.toAccount || null } </span>
          </a>
        </div>
        <div className={`${styles.text} ${styles.middleText} ${grid['col-sm-2']} transactions-cell`}>
          <TransactionType
            isReceived={
              props.value.toAccount && props.address &&
              (props.value.toAccount === props.address)
            }
            type={props.value.type} />
        </div>
        <div className={`${styles.text} ${styles.rightText} ${grid['col-sm-2']} transactions-cell`}>
          <Amount {...props} />
        </div>
      </div>
    );
  }
}

export default translate()(TransactionRow);
