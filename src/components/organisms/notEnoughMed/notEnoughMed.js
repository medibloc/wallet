import React, { Fragment } from 'react';
import InlineSVG from 'svg-inline-react';
import { translate } from 'react-i18next';
import attention from '../../../assets/images/icons/attention.svg';
import CloseButton from '../../../assets/images/icons/buttonX.svg';
import { MIN_VESTING_TO_VOTE_IN_MED } from '../../../constants/bandwidth';
import styles from './notEnoughMed.css';
import WBox from '../../atoms/wbox/index';

class NotEnoughMed extends React.Component {
  render() {
    const { closePopUp, t } = this.props;
    return (
      <Fragment>
        <div className={styles.relative}>
          <div className={styles.wrapper}>
            <div className={styles.popupWrapper}>
              <div className={styles.closeWrapper}>
                <div className={styles.closeButtonWrapper}>
                  <InlineSVG
                    className={styles.closeButton}
                    onClick={() => closePopUp()}
                    src={CloseButton} />
                </div>
              </div>
              <WBox className={styles.notEnoughWrapper}>
                <div className={styles.headerWrapper}>
                  <InlineSVG className={styles.attentionImg} src={attention} />
                </div>
                <div className={styles.bodyWrapper}>
                  <div className={styles.notice}>
                    <h5>{t('You need to staking {{minVestingToVote}} MED for vote.',
                      { minVestingToVote: MIN_VESTING_TO_VOTE_IN_MED })}{t(' ')}
                    {t('Please request test MED through the faucet.')}</h5>
                  </div>
                </div>
              </WBox>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default translate()(NotEnoughMed);
