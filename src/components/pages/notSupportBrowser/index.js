import React from 'react';
import { translate } from 'react-i18next';
import Box from '../../atoms/box/index';
import Chrome from '../../../assets/images/icons/chrome.png';
import Firefox from '../../../assets/images/icons/firefox.png';
import styles from './notSupportBrowser.css';

const NotSupportBrowser = ({ t }) => (<section>
  <Box className={styles.wrapper}>
    <Box className={styles.notSupportBrowser}>
      <div className={styles.headerWrapper}>
        <h2>
          <span className={styles.emphasis}>{t('Browser update')}{t(' ')}</span>
          <span>{t('required')}</span>
        </h2>
      </div>
      <div className={styles.contentWrapper}>
        <h5>{t('We noticed you are using an old version of Internet Explorer which is now unsupported.')}</h5>
        <h5>{t('MediBloc testnet wallet requires an updated version of Internet Explorer or other modern browsers.')}</h5>
        <h5>{t('To using testnet wallet, upgrade your browser with one of the following.')}</h5>
      </div>
      <Box className={styles.browserImageWrapper}>
        <div className={styles.browserImage}>
          <img
            className={styles.chromeBrowser}
            onClick={() => {
              window.location.href = 'https://www.google.com/chrome/';
            }}
            src={Chrome} />
        </div>
        <div className={styles.browserImage}>
          <img
            className={styles.firefoxBrowser}
            onClick={() => {
              window.location.href = 'https://www.mozilla.org/firefox/';
            }}
            src={Firefox} />
        </div>
      </Box>
      <Box className={styles.browserTextWrapper}>
        <div className={styles.browserText}>
          <h5>{t('Chrome')}</h5>
        </div>
        <div className={styles.browserText}>
          <h5>{t('Firefox')}</h5>
        </div>
      </Box>
      <div className={styles.footerWrapper}>
        <h4>{t('Thank you.')}</h4>
      </div>
    </Box>
  </Box>
</section>);

export default translate()(NotSupportBrowser);
