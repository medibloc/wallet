import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Box from '../../box';
import { PrimaryButton, SecondaryButton } from '../../toolbox/buttons/button';
import PassphraseBox from '../passphraseBox/passphrasebox';
import styles from './safekeeping.css';

class Safekeeping extends React.Component {
  render() {
    const { t, nextStep, passphrase, showCopySuccessToast } = this.props;

    return (<Box className={`${styles.safekeeping}`}>
      <header>
        <h2>{t('Save backup phrase')}</h2>
      </header>
      <div className={`${styles.comment1}`}>
        <h6>{t('Please write down your backup phrase and store it in a secure place.') + t(' ') +
          t('The backup phrase will be used in case this app is accidentally deleted.')}</h6>
      </div>
      <div className={`${styles.comment2}`}>
        <h6>{t('Please carefully write down these 12 words')}</h6>
        <CopyToClipboard
          className={`${styles.copyButtonWrapper}`}
          text={passphrase}>
          <SecondaryButton
            label={`${t('Copy them')}`}
            onClick={() => showCopySuccessToast({
              label: t('Backup phrase copied.'),
            })} />
        </CopyToClipboard>
      </div>
      <PassphraseBox
        className={`${styles.passphrase}`}
        passphrase={passphrase} />
      <PrimaryButton
        label={t('I\'ve written it down')}
        className={`${styles.nextButton}`}
        onClick={() => nextStep({
          passphrase,
        })}/>
      <div className={`${styles.comment3}`}>
        <h6>{t('You will confirm this phrase on the next screen.')}</h6>
      </div>
    </Box>);
  }
}

export default withRouter(translate()(Safekeeping));
