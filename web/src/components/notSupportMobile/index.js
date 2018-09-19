import React from 'react';
import { translate } from 'react-i18next';
import WBox from '../wbox';
import { SecondaryButton } from '../toolbox/buttons/button';
import styles from './notSupportMobile.css';

const NotSupportMobile = ({ t }) => (<section>
  <WBox className={styles.wrapper}>
    <WBox className={styles.notSupportMobile}>
      <h2>{t('Oops!')}</h2>
      <h4>{t('Please access in PC environment to use the wallet. Thank you.')}</h4>
      <SecondaryButton
        className={styles.goBackButton}
        label={t('Go Back')}
        onClick={() => { window.history.back(); }}/>
    </WBox>
  </WBox>
</section>);

export default translate()(NotSupportMobile);
