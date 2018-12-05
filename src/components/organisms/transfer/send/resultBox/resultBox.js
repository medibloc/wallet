import React from 'react';
import InlineSVG from 'svg-inline-react';
import { PrimaryButton } from '../../../../atoms/toolbox/buttons/button';
import TransferTabs from '../../transferTabs/index';
import WBox from '../../../../atoms/wbox/index';
import styles from './resultBox.css';
import transferred from '../../../../../assets/images/icons/transferred.svg';

class ResultBox extends React.Component {
  render() {
    const { finalCallback, reset, setTabSend, t } = this.props;
    return (
      <WBox className={`${styles.resultBox}`}>
        <TransferTabs setTabSend={setTabSend} isActiveTabSend={true} />
        <div className={styles.bodyWrapper}>
          <div className={styles.resultBody}>
            <h5 className={styles.title}>
              {t('Your transfer was successfully completed!')}
            </h5>
            <div className={styles.iconOuterWrapper}>
              <div className={styles.iconWrapper}>
                <InlineSVG src={transferred} />
              </div>
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
        </div>
      </WBox>
    );
  }
}

export default ResultBox;
