import React from 'react';
import { translate } from 'react-i18next';
import QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import TransferTabs from '../transferTabs';
import WBox from '../wbox';
import { PrimaryButton } from '../toolbox/buttons/button';
import styles from './request.css';

class Request extends React.Component {
  render() {
    const { setTabSend, t, account } = this.props;

    return (
      <WBox className={`${styles.requestWrapper}`}>
        <TransferTabs setTabSend={setTabSend} isActiveTabSend={false} />
        <div className={`${styles.bodyWrapper}`}>
          <div>
            <h6>{t('Scan code to receive from others')}</h6>
          </div>
          <div className={`${styles.qrCode} ${styles.magnified} request-qr-code`}>
            <QRCode value={account.address} />
          </div>
        </div>
        <footer className={styles.requestFooter}>
          <div className={styles.address}>
            <h6>{account.address}</h6>
          </div>
          <CopyToClipboard
            className={styles.copyButton}
            text={account.address}>
            <PrimaryButton
              label={t('Copy address')} />
          </CopyToClipboard>
        </footer>
      </WBox>
    );
  }
}

export default translate()(Request);
