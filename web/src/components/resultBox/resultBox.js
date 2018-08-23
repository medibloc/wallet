import React from 'react';
import InlineSVG from 'svg-inline-react';
import { PrimaryButton } from '../toolbox/buttons/button';
import TransferTabs from '../transferTabs';
import WBox from '../wbox';
import styles from './resultBox.css';
import done from '../../assets/images/icons/done.svg';

class ResultBox extends React.Component {
  render() {
    const { finalCallback, reset, setTabSend, t } = this.props;
    return (
      <WBox className={`${styles.resultBox}`}>
        <TransferTabs setTabSend={setTabSend} isActiveTabSend={true} />
        <div className={styles.bodyWrapper}>
          <h5 className={styles.title}>
            {t('Your transfer was successfully completed!')}
          </h5>
          <div className={styles.iconWrapper}>
            <InlineSVG className={styles.icon} src={done} />
          </div>
        </div>
        <footer className={styles.resultBoxFooter}>
          <PrimaryButton
            className={`okay-button ${styles.doneButton}`}
            label={t('Done')}
            onClick={() => {
              // istanbul ignore else
              if (typeof finalCallback === 'function') {
                finalCallback();
              }
              reset();
            }} />
        </footer>
      </WBox>
    );
  }
}

export default ResultBox;
