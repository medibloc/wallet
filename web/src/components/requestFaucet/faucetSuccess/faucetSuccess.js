import React, { Fragment } from 'react';
import { translate } from 'react-i18next';
import styles from './faucetSuccess.css';
import { SecondaryButton } from '../../toolbox/buttons/button';
import WBox from '../../wbox/index';

class FaucetSuccess extends React.Component {
  render() {
    const { closePopUp, t } = this.props;
    return (
      <Fragment>
        <div className={styles.wrapper}>
          <WBox className={styles.faucetNoticeWrapper}>
            <div className={styles.headerWrapper}>
              <div className={styles.notice}>
                <h1>{t('Great!')}</h1>
              </div>
            </div>
            <div className={styles.bodyWrapper}>
              <h5>{t('Please check your inbox and confirm your email address. You will receive test MED shortly upon confirmation.')}</h5>
            </div>
            <footer className={styles.sendFooter}>
              <div className={styles.buttonWrapper}>
                <SecondaryButton
                  className={'close-faucet-button'}
                  label={t('OK')}
                  onClick={() => closePopUp()}/>
              </div>
            </footer>
          </WBox>
        </div>
      </Fragment>
    );
  }
}

export default translate()(FaucetSuccess);
