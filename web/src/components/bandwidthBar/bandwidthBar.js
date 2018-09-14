import React from 'react';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import { fromRawMed, isZero, lt, lte, subMed } from '../../../../common/src/utils/med';
import styles from './bandwidthBar.css';

class BandwidthBar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { account, t } = this.props;
    const minBandwidth = 1;
    const bandwidth = fromRawMed(account.bandwidth);
    const need = lte(1, bandwidth) ? 0 : subMed(1, bandwidth);
    const isLow = lte(minBandwidth * 0.6, need);
    const isMid = !isLow && lt(0, need);
    console.log(isLow, isMid);
    return <div className={styles.bandwidthBarWrapper}>
      <div className={styles.title}>
        { isZero(need) ?
          <small>{t('You have a sufficient bandwidth to send a transaction')}</small> :
          <small>{t('Need {{need}} MED staking more to send', { need })}</small>
        }
      </div>
      <ProgressBar
        className={`${isLow ? styles.progressBarLow : null} ${isMid ? styles.progressBarMid : null}`}
        max={minBandwidth}
        mode="determinate"
        theme={styles}
        type="linear"
        value={bandwidth} />
    </div>;
  }
}

export default BandwidthBar;
