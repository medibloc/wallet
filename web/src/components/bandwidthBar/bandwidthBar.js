import React from 'react';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import { MIN_BANDWIDTH_IN_MED } from '../../../../common/src/constants/bandwidth';
import BN from '../../../../common/src/utils/bn';
import { fromRawMed, subMed } from '../../../../common/src/utils/med';
import styles from './bandwidthBar.css';

class BandwidthBar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { account, t } = this.props;
    const bandwidth = fromRawMed(BN.max(0, subMed(account.vesting, account.bandwidth)));
    const need = BN.max(0, subMed(MIN_BANDWIDTH_IN_MED, bandwidth));
    const isLow = BN.lte(MIN_BANDWIDTH_IN_MED * 0.6, need);
    const isMid = !isLow && BN.lt(0, need);
    return <div className={styles.bandwidthBarWrapper}>
      <div className={styles.title}>
        { BN.isZero(need) ?
          <small>{t('You have enough bandwidth to send')}</small> :
          <small>{t('Need {{need}} MED staking more to send', { need })}</small>
        }
      </div>
      <ProgressBar
        className={`${isLow ? styles.progressBarLow : null} ${isMid ? styles.progressBarMid : null}`}
        max={MIN_BANDWIDTH_IN_MED}
        mode="determinate"
        theme={styles}
        type="linear"
        value={bandwidth} />
    </div>;
  }
}

export default BandwidthBar;
