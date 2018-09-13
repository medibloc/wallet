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
                <h1>{t('Good!')}</h1>
              </div>
            </div>
            <div className={styles.bodyWrapper}>
              <h5>{t('We have sent an email to your email address. In order to get test MED, please click the confirmation button.')}</h5>
            </div>
            <footer className={styles.sendFooter}>
              <div className={styles.buttonWrapper}>
                <SecondaryButton
                  className={'close-faucet-button'}
                  label={t('Okay')}
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
