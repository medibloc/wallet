import React from 'react';
import { PrimaryButton } from '../../../atoms/toolbox/buttons/button';
import styles from './keepKeyFile.css';

class KeepKeyFile extends React.Component {
  showCopySuccessToast() {
    this.props.successToastDisplayed({
      label: this.props.t('Backup phrase copied.'),
    });
  }

  render() {
    const { finalCallback, t } = this.props;

    return (
      <div className={styles.keepKeyFile}>
        <div className={styles.resultBody}>
          <div className={styles.titleWrapper}>
            <h6>{t('Please keep this file safe.')}</h6>
          </div>
        </div>
        <footer className={styles.resultBoxFooter}>
          <PrimaryButton
            className={`${styles.closeButton}`}
            label={t('Close')}
            onClick={() => finalCallback()} />
        </footer>
      </div>
    );
  }
}

export default KeepKeyFile;
