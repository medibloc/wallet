import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import { translate } from 'react-i18next';
import TransactionType from './transactionType';
import styles from './transactionRow.css';
import Amount from './amount';
import { DateFromTimestamp } from '../timestamp/index';
// import { FontIcon } from '../fontIcon';

class TransactionRow extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  shouldComponentUpdate(nextProps) {
    return nextProps.value.id !== this.props.value.id || nextProps.value.confirmations <= 1000;
  }

  render() {
    const { props } = this;
    const onClick = !props.onClick ? (() => {}) : () => props.onClick(this.props);
    return (
      <div className={`${grid.row} ${styles.rows} ${styles.clickable} transactions-row`} onClick={onClick}>
        <div className={`${styles.leftText} ${grid['col-sm-2']} transactions-cell`}>
          <span> {props.value.hash} </span>
        </div>
        <div className={`${styles.leftText} ${grid['col-sm-2']} transactions-cell`}>
          <DateFromTimestamp time={props.value.timestamp} />
        </div>
        <div className={`${styles.leftText} ${grid['col-sm-2']} transactions-cell`}>
          <span> {props.value.from} </span>
        </div>
        <div className={`${styles.leftText} ${grid['col-sm-2']} transactions-cell`}>
          <span> {props.value.to} </span>
        </div>
        <div className={`${styles.leftText} ${grid['col-sm-2']} transactions-cell`}>
          <span> {props.value.data ? <TransactionType {...props.value.data} /> : null} </span>
        </div>
        <div className={`${styles.leftText} ${grid['col-sm-2']} transactions-cell`}>
          <Amount {...props} />
        </div>
      </div>
    );
  }
}

export default translate()(TransactionRow);
