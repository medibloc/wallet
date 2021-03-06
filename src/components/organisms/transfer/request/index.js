import React from 'react';
import { translate } from 'react-i18next';
import QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import TransferTabs from '../transferTabs/index';
import WBox from '../../../atoms/wbox/index';
import { PrimaryButton } from '../../../atoms/toolbox/buttons/button';
import styles from './request.css';

class Request extends React.Component {
  render() {
    const { setTabSend, t, account } = this.props;

    return (
      <WBox className={`${styles.requestWrapper}`}>
        <TransferTabs setTabSend={setTabSend} isActiveTabSend={false} />
        <div className={`${styles.bodyWrapper}`}>
          <div className={`${styles.contentWrapper}`}>
            <div className={`${styles.headerWrapper}`}>
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
        </div>
      </WBox>
    );
  }
}

export default translate()(Request);
