import React from 'react';
import styles from './wbox.css';

const WBox = ({ className, children, hasBorder }) => (
  <div className={`${styles.wrapper} ${className} ${hasBorder ? styles.hasBorder : null}`}>
    { children }
  </div>);

export default WBox;
