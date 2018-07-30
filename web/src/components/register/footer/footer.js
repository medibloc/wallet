import React from 'react';
import styles from './footer.css';

const Footer = ({ t }) => (
  <div className={styles.footer}>
    <h6> {t('or')} </h6>
    <h6> {t('Sign in')} | {t('Restore an account from a backup')} </h6>
  </div>
);

export default Footer;
