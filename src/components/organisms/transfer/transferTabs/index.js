import React from 'react';
import { translate } from 'react-i18next';
import styles from './tabs.css';

const TransferTabs = ({ t, setTabSend, isActiveTabSend }) => (
  <div className={`${styles.tab} `}>
    <div className={`${isActiveTabSend ? styles.tabActive : styles.tabInactive} send-tab`}
      onClick={() => { setTabSend(true); }}>
      {t('Send')}
    </div>
    <div className={`${isActiveTabSend ? styles.tabInactive : styles.tabActive} request-tab`}
      onClick={() => { setTabSend(false); }}>
      {t('Request')}
    </div>
  </div>
);

export default translate()(TransferTabs);
