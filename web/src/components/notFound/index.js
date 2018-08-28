import React from 'react';
import { Redirect } from 'react-router-dom';
import { translate } from 'react-i18next';
import Box from '../box';
import styles from './notFound.css';

const NotFound = ({ t }) => (<section>
  <Box>
    <div className={styles.emptyTransactions}>
      {window.location.pathname.includes('index.html') && <Redirect to="/" />}
      <h2 className='empty-message'>{t('Page not found.')}</h2>
      <p>{t('Try using menu for navigation.')}</p>
    </div>
  </Box>
</section>);

export default translate()(NotFound);
