import React from 'react';
import DropDown from 'react-toolbox/lib/dropdown';
import { themr } from 'react-css-themr';
import styles from './dropdown.css';

const ToolBoxDropDown = props => (
  <div className={`${styles.inputWrapper} ${props.parentclassname}`}>
    <DropDown
      {...props}
      theme={props.theme}
    />
  </div>
);

export default themr('TBDropDown', styles)(ToolBoxDropDown);
