import React from 'react';
import routes from '../../../constants/routes';
import styles from './footer.css';

const Footer = ({ history, t, type }) => {
  if (type === 'register') {
    return (
      <div className={styles.footer}>
        <h6> {t('or')} </h6>
        <div className={`${styles.wrapper}`}>
          <a className={`${styles.login}`} onClick={() => history.replace(`${routes.login.path}`)}>{t('Sign in')}</a>
          <span className={`${styles.divider}`}> | </span>
          <a className={`${styles.restore}`} onClick={() => history.replace(`${routes.restore.path}`)}>{t('Restore an account from a backup')}</a>
        </div>
      </div>
    );
  } else if (type === 'login') {
    return (
      <div className={styles.footer}>
        <h6> {t('or')} </h6>
        <div className={`${styles.wrapper}`}>
          <a className={`${styles.register}`} onClick={() => history.replace(`${routes.register.path}`)}>{t('Sign up')}</a>
          <span className={`${styles.divider}`}> | </span>
          <a className={`${styles.restore}`} onClick={() => history.replace(`${routes.restore.path}`)}>{t('Restore an account from a backup')}</a>
        </div>
      </div>
    );
  } else if (type === 'restore') {
    return (
      <div className={styles.footer}>
        <h6> {t('or')} </h6>
        <div className={`${styles.wrapper}`}>
          <a className={`${styles.login}`} onClick={() => history.replace(`${routes.login.path}`)}>{t('Sign in')}</a>
          <span className={`${styles.divider}`}> | </span>
          <a className={`${styles.register}`} onClick={() => history.replace(`${routes.register.path}`)}>{t('Create new wallet ID')}</a>
        </div>
      </div>
    );
  }
  return null;
};

export default Footer;
