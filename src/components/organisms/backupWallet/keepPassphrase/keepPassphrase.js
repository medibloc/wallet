import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PrimaryButton } from '../../../atoms/toolbox/buttons/button';
import styles from './keepPassphrase.css';

class KeepPassphrase extends React.Component {
  showCopySuccessToast() {
    this.props.successToastDisplayed({
      label: this.props.t('Backup phrase copied.'),
    });
  }

  render() {
    const { finalCallback, passphrase, t } = this.props;

    return (
      <div className={styles.keepPassphrase}>
        <div className={styles.resultBody}>
          <div className={styles.titleWrapper}>
            <h6>{t('Please keep this file safe.')}</h6>
          </div>
        </div>
        <footer className={styles.resultBoxFooter}>
          <CopyToClipboard
            className={`${styles.copyButtonWrapper}`}
            text={passphrase}>
            <PrimaryButton
              className={`${styles.copyButton}`}
              label={t('Close')}
              onClick={() => finalCallback()} />
          </CopyToClipboard>
        </footer>
      </div>
    );
  }
}

export default KeepPassphrase;
