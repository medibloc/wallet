import React from 'react';
import { PrimaryButton, SecondaryButton } from '../../../atoms/toolbox/buttons/button';
import styles from './voteFooterMenu.css';

const VoteFooterMenu = ({ onClosePopUp, openPasswordStep, t }) => (
  <div className={`${styles.headerWrapper}`} id="candidatesHeader">
    <div className={`${styles.header}`}>
      {/* <span>{t('Number of times left today: {{retryNum}}',{ retryNum: 2 })}</span> */}
    </div>
    <div className={`${styles.buttonWrapper}`}>
      <SecondaryButton
        className={`${styles.cancelButton}`}
        label={t('Cancel')}
        onClick={() => onClosePopUp()}/>
      <PrimaryButton
        className={`${styles.saveButton}`}
        label={t('Save Changes')}
        onClick={() => openPasswordStep()}/>
    </div>
  </div>);

export default VoteFooterMenu;
