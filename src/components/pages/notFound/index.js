import React from 'react';
import { translate } from 'react-i18next';
import Box from '../../atoms/box/index';
import styles from './notFound.css';

const NotFound = ({ t }) => (<section>
  <Box>
    <div className={styles.emptyTransactions}>
      <h2 className='empty-message'>{t('Page not found.')}</h2>
      <p>{t('Please try to restart the wallet.')}</p>
    </div>
  </Box>
</section>);

export default translate()(NotFound);
