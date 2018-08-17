import React from 'react';
import styles from './wbox.css';

const WBox = ({ className, children }) => (<div className={`${styles.wrapper} ${className}`}>
  { children }
</div>);

export default WBox;
