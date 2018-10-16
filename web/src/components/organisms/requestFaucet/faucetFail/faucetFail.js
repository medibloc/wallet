import React, { Fragment } from 'react';
import { translate } from 'react-i18next';
import styles from './faucetFail.css';
import { SecondaryButton } from '../../../atoms/toolbox/buttons/button';
import WBox from '../../../atoms/wbox/index';

class FaucetFail extends React.Component {
  render() {
    const { closePopUp, t } = this.props;
    return (
      <Fragment>
        <div className={styles.wrapper}>
          <WBox className={styles.faucetNoticeWrapper}>
            <div className={styles.headerWrapper}>
              <div className={styles.notice}>
                <h1>{t('Oops!')}</h1>
              </div>
            </div>
            <div className={styles.bodyWrapper}>
              <h5>{t('You have already received the test MED. Please use different account or email.')}</h5>
            </div>
            <footer className={styles.sendFooter}>
              <div className={styles.buttonWrapper}>
                <SecondaryButton
                  className={`${styles.okButton} 'close-faucet-button'`}
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

export default translate()(FaucetFail);
