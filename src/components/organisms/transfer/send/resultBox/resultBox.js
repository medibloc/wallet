import React from 'react';
import InlineSVG from 'svg-inline-react';
import { PrimaryButton } from '../../../../atoms/toolbox/buttons/button';
import TransferTabs from '../../transferTabs/index';
import WBox from '../../../../atoms/wbox/index';
import styles from './resultBox.css';
import transferred from '../../../../../assets/images/icons/transferred.svg';
import rejected from '../../../../../assets/images/icons/rejected.svg';

const parseJsonFromString = msg => JSON.parse(msg.slice(msg.indexOf('{'), msg.lastIndexOf('}') + 1));

class ResultBox extends React.Component {
  render() {
    const { finalCallback, reset, setTabSend, t, process } = this.props;
    let error = null;
    try {
      error = parseJsonFromString(process.error).message;
    } catch (e) {} // eslint-disable-line no-empty

    if (!error) {
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

    return (
      <WBox className={`${styles.resultBox}`}>
        <TransferTabs setTabSend={setTabSend} isActiveTabSend={true} />
        <div className={styles.bodyWrapper}>
          <div className={styles.resultBody}>
            <h5 className={styles.title}>
              {t('Your transfer is rejected')}
            </h5>
            <p className={styles.title}>
              { error }
            </p>
            <div className={styles.iconOuterWrapper}>
              <div className={styles.iconWrapper}>
                <InlineSVG src={rejected} />
              </div>
            </div>
          </div>
          <footer className={styles.resultBoxFooter}>
            <PrimaryButton
              className={`okay-button ${styles.backButton}`}
              label={t('Back')}
              onClick={() => {
                this.props.resetProcess();
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
