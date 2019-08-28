import React from 'react';
import { fromRawMed } from '../../../utils/med';
import FormattedNumber from '../formattedNumber/index';

const MedAmount = props => (<FormattedNumber val={fromRawMed(props.val)} />);

export default MedAmount;

