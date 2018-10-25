import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import { translate } from 'react-i18next';
import TransactionType from '../transactionType';
import txTypes from '../../../../constants/transactionTypes';
import styles from './transactionRow.css';
import Amount from '../amount';
import Spinner from '../../../atoms/spinner';
import { DateFromTimestamp } from '../../../atoms/timestamp';
// import { FontIcon } from '../fontIcon';

class TransactionRow extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  // shouldComponentUpdate(nextProps) {
  //   return nextProps.value.id !== this.props.value.id;
  // }

  render() {
    const { props } = this;
    const onClick = !props.onClick ? (() => {}) : () => props.onClick(this.props);
    return (
      <div className={`${grid.row} ${styles.rows} transactions-row`}>
        <div className={`${styles.text} ${styles.leftText} ${grid['col-sm-2']} transactions-cell`}>
          <div className={`${styles.clickable}`} onClick={onClick}>
            <span> {props.value.hash} </span>
          </div>
        </div>
        <div className={`${styles.text} ${styles.leftText} ${grid['col-sm-2']} transactions-cell`}>
          {props.value.executed ? <DateFromTimestamp time={props.value.timestamp * 1000} /> :
            <Spinner />}
        </div>
        <div className={`${styles.text} ${styles.leftText} ${grid['col-sm-2']} transactions-cell`}>
          <a href={`https://explorer.medibloc.org/en/account/${props.value.from}`} target={'_blank'}>
            <span> {props.value.from} </span>
          </a>
        </div>
        <div className={`${styles.text} ${styles.leftText} ${grid['col-sm-2']} transactions-cell`}>
          <a href={`https://explorer.medibloc.org/en/account/${props.value.to}`} target={'_blank'} className={`${styles.clickable}`}>
            <span> {(props.value.tx_type === txTypes.send ||
              props.value.tx_type === txTypes.genesis) ?
              props.value.to : null} </span>
          </a>
        </div>
        <div className={`${styles.text} ${styles.middleText} ${grid['col-sm-2']} transactions-cell`}>
          <TransactionType
            isReceived={props.value.to && props.address && (props.value.to === props.address)}
            type={props.value.tx_type} />
        </div>
        <div className={`${styles.text} ${styles.rightText} ${grid['col-sm-2']} transactions-cell`}>
          <Amount {...props} />
        </div>
      </div>
    );
  }
}

export default translate()(TransactionRow);
