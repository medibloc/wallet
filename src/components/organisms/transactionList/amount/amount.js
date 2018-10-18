import React from 'react';
import { translate } from 'react-i18next';
import styles from './amount.css';
import MedAmount from '../../../atoms/medAmount';
import transactionTypes from '../../../../constants/transactionTypes';

const Amount = (props) => {
  const params = {};
  if (props.value.tx_type === transactionTypes.send &&
    props.value.from === props.value.to) {
    // params.className = 'greyLabel';
    params.pre = '';
  } else if (props.value.from !== props.address) {
    // params.className = 'greenLabel';
    params.pre = '+';
  } else if (props.value.tx_type === transactionTypes.vest) {
    // params.className = 'greyLabel';
    params.pre = '-';
  } else if (props.value.tx_type === transactionTypes.withdrawVesting) {
    // params.className = 'greyLabel';
    params.pre = '+';
  } else if ((props.value.tx_type !== transactionTypes.send ||
      props.value.to !== props.address) && props.value.amount !== 0) {
    params.pre = '-';
    // params.className = 'greyLabel';
    params.clickToSendEnabled = props.value.tx_type === transactionTypes.send;
  }
  const amount = props.value.amount === 0 ? '-' : <MedAmount val={props.value.value} />;
  return <span id='transactionAmount' className={styles[params.className]}>
    { params.pre }{amount} MED
  </span>;
};
export default translate()(Amount);
