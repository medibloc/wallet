import React from 'react';
import routes from '../../../constants/routes';
import { WarningButton } from '../../atoms/toolbox/buttons/button';
import styles from './formatWallet.css';

class Fee extends React.Component {
  reset() {
    if (window.confirm('This will remove all data.\nAre you sure to reset all?')) {
      this.props.resetAll();
      this.props.history.push(`${routes.startPage.path}`);
    }
  }

  handleClick() {
    this.reset();
  }

  render() {
    const { t } = this.props;

    return (
      <div className={`${styles.formatWalletWrapper}`}>
        <div className={`${styles.bodyWrapper}`}>
          <div className={`${styles.emptyWrapper}`} />
          <footer className={`${styles.formatWalletFooter}`}>
            <small>{t('Format wallet will remove all accounts data in the wallet')}</small>
            <WarningButton
              className={`vest-complete-button ${styles.nextButton}`}
              label={t('Format wallet')}
              onClick={() => this.handleClick()}/>
          </footer>
        </div>
      </div>
    );
  }
}

export default Fee;
