import React from 'react';
import { translate } from 'react-i18next';
import styles from './transactions.css';
import MedAmount from '../medAmount';
import transactionTypes from '../../../../common/src/constants/transactionTypes';

const Amount = (props) => {
  const params = {};
  if (props.value.type === transactionTypes.send &&
    props.value.from === props.value.to) {
    params.className = 'greyLabel';
    params.pre = '';
  } else if (props.value.from !== props.address) {
    params.className = 'greenLabel';
    params.pre = '+';
  } else if ((props.value.type !== transactionTypes.send ||
      props.value.to !== props.address) && props.value.amount !== 0) {
    params.pre = '-';
    params.className = 'greyLabel';
    params.clickToSendEnabled = props.value.type === transactionTypes.send;
  }
  const amount = props.value.amount === 0 ? '-' : <MedAmount val={props.value.value} />;
  return <span id='transactionAmount' className={styles[params.className]}>
    { params.pre }{amount}
  </span>;
};
export default translate()(Amount);