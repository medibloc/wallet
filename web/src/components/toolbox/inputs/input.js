import React from 'react';
import Input from 'react-toolbox/lib/input';
import { themr } from 'react-css-themr';
import styles from './input.css';

const ToolBoxInput = props => (
  <div className={`${styles.inputWrapper} ${props.parentclassname}`}>
    <h6>{props.title}</h6>
    <Input
      {...props}
      theme={props.theme}
    />
  </div>
);

export default themr('TBInput', styles)(ToolBoxInput);
