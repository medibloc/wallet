import React from 'react';
import { fromRawMed } from '../../../utils/med';
import FormattedNumber from '../formattedNumber/index';

const roundTo = (value, places) => {
  if (!places) {
    return value;
  }
  const x = 10 ** places;
  return Math.round(value * x) / x;
};

const MedAmount = props => (<FormattedNumber val={
  roundTo(parseFloat(fromRawMed(props.val)), props.roundTo)} />);

export default MedAmount;
