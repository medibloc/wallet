import React from 'react';
import { translate } from 'react-i18next';
import MedAmount from '../../../atoms/medAmount';

const Amount = (props) => {
  const amount = <MedAmount val={props.value.amount} />;
  return (
    <span id='transactionAmount'>
      {amount} MED
    </span>
  );
};

export default translate()(Amount);
