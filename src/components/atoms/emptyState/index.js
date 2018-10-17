import React from 'react';
import styles from './emptyState.css';

const EmptyState = ({ title, message, className, children }) => (
  <div className={`${styles.emptyState} ${className}`}>
    <h2 className='empty-message'>{title}</h2>
    <p>{message}</p>
    { children }
  </div>
);

export default EmptyState;
