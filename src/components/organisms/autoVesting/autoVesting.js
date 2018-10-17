import React, { Fragment } from 'react';
import InlineSVG from 'svg-inline-react';
import { translate } from 'react-i18next';
import attention from '../../../assets/images/icons/attention.svg';
import styles from './autoVesting.css';
import { PrimaryButton, SecondaryButton } from '../../atoms/toolbox/buttons/button';
import WBox from '../../atoms/wbox/index';

class AutoVesting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vestingAmount: this.props.vestingAmount || 2,
    };
  }

  render() {
    const { closePopUp, nextStep, t } = this.props;
    return (
      <Fragment>
        <div className={styles.relative}>
          <div className={styles.wrapper}>
            <WBox className={styles.autoVestingWrapper}>
              <div className={styles.headerWrapper}>
                <InlineSVG className={styles.attentionImg} src={attention} />
              </div>
              <div className={styles.bodyWrapper}>
                <div className={styles.notice}>
                  <h5>{t('You need to stake additional {{vestingAmount}} MED to proceed.',
                    { vestingAmount: this.state.vestingAmount }) + t(' ') +
                    t('Would you like to proceed with automatic staking?')}</h5>
                </div>
                <div className={styles.vestingAmount}>
                  <h6>{t('Vesting Amount: {{vestingAmount}} MED',
                    { vestingAmount: this.state.vestingAmount })}</h6>
                </div>
              </div>
              <footer className={styles.sendFooter}>
                <div className={styles.buttonWrapper}>
                  <SecondaryButton
                    className={styles.closeButton}
                    label={t('Cancel')}
                    onClick={() => closePopUp()}/>
                  <PrimaryButton
                    className={styles.okButton}
                    label={t('OK')}
                    onClick={() => nextStep()}/>
                </div>
              </footer>
            </WBox>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default translate()(AutoVesting);
