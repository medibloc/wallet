import React from 'react';
import { translate } from 'react-i18next';
import WBox from '../../atoms/wbox/index';
import styles from './notSupportFeature.css';

const NotSupportFeature = ({ t }) => (<section>
  <WBox className={styles.wrapper}>
    <WBox className={styles.notSupportFeature}>
      <h2>{t('Not Supported')}</h2>
      <h4>{t('The MediBloc Web Wallet has been deprecated. Please see 3rd-party wallet apps instead.')}</h4>
    </WBox>
  </WBox>
</section>);

export default translate()(NotSupportFeature);
