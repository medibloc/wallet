import React from 'react';
import InlineSVG from 'svg-inline-react';
import { SecondaryButton } from '../../../atoms/toolbox/buttons/button';
import styles from './resetSuccess.css';
import done from '../../../../assets/images/icons/done.svg';

class ResetSuccess extends React.Component {
  render() {
    const { finalCallback, reset, t } = this.props;
    return (
      <div className={styles.resetSuccess}>
        <div className={styles.resultBody}>
          <div className={styles.iconOuterWrapper}>
            <div className={styles.iconWrapper}>
              <InlineSVG src={done} />
            </div>
          </div>
          <div className={styles.titleWrapper}>
            <h6>{t('Your password has been successfully changed.')}</h6>
          </div>
        </div>
        <footer className={styles.resultBoxFooter}>
          <SecondaryButton
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
    );
  }
}

export default ResetSuccess;
