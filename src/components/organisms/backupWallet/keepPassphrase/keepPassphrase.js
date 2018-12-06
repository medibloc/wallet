import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PassphraseBox from '../../passphrase/passphraseBox/passphrasebox';
import { PrimaryButton } from '../../../atoms/toolbox/buttons/button';
import styles from './keepPassphrase.css';

class KeepPassphrase extends React.Component {
  showCopySuccessToast() {
    this.props.successToastDisplayed({
      label: this.props.t('Backup phrase copied.'),
    });
  }

  render() {
    const { passphrase, t } = this.props;

    return (
      <div className={styles.keepPassphrase}>
        <div className={styles.resultBody}>
          <div className={styles.titleWrapper}>
            <h6>{t('Please keep these 12 words safe.')}</h6>
          </div>
          <div className={styles.passphraseBoxWrapper}>
            <PassphraseBox
              className={styles.passphraseBox}
              passphrase={passphrase}/>
          </div>
        </div>
        <footer className={styles.resultBoxFooter}>
          <CopyToClipboard
            className={`${styles.copyButtonWrapper}`}
            text={passphrase}>
            <PrimaryButton
              className={`${styles.copyButton}`}
              label={t('Copy them')}
              onClick={() => this.showCopySuccessToast()} />
          </CopyToClipboard>
        </footer>
      </div>
    );
  }
}

export default KeepPassphrase;
