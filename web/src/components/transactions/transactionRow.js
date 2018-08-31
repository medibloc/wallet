import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import { translate } from 'react-i18next';
import TransactionType from './transactionType';
import txTypes from '../../../../common/src/constants/transactionTypes';
import styles from './transactionRow.css';
import Amount from './amount';
import Spinner from '../spinner';
import { DateFromTimestamp } from '../timestamp/index';
// import { FontIcon } from '../fontIcon';

class TransactionRow extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  shouldComponentUpdate(nextProps) {
    return nextProps.value.id !== this.props.value.id;
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
          {props.value.executed ? <DateFromTimestamp time={props.value.timestamp * 1000} /> :
            <Spinner />}
        </div>
        <div className={`${styles.leftText} ${grid['col-sm-2']} transactions-cell`}>
          <span> {props.value.from} </span>
        </div>
        <div className={`${styles.leftText} ${grid['col-sm-2']} transactions-cell`}>
          <span> {(props.value.tx_type === txTypes.send ||
            props.value.tx_type === txTypes.genesis) ?
            props.value.to : null} </span>
        </div>
        <div className={`${styles.leftText} ${grid['col-sm-2']} transactions-cell`}>
          <TransactionType type={props.value.tx_type} />
        </div>
        <div className={`${styles.leftText} ${grid['col-sm-2']} transactions-cell`}>
          <Amount {...props} />
        </div>
      </div>
    );
  }
}

export default translate()(TransactionRow);
