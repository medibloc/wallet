import React from 'react';
import { translate } from 'react-i18next';
import MultiStep from '../../atoms/multiStep';
import BackupWalletPasswordStep from './backupWalletPasswordStep';
import KeepKeyFile from './keepKeyFile';
import styles from './backupWallet.css';

class BackupWallet extends React.Component {
  // TODO: change order
  render() {
    return (
      <MultiStep className={`${styles.resetPasswordWrapper}`}
        finalCallback={() => this.props.closePopUp()}>
        <BackupWalletPasswordStep/>
        <KeepKeyFile/>
      </MultiStep>
    );
  }
}

export default translate()(BackupWallet);
