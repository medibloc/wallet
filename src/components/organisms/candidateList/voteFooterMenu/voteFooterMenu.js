import React from 'react';
import { MAX_VOTE_NUM } from '../../../../constants/candidates';
import { PrimaryButton, SecondaryButton } from '../../../atoms/toolbox/buttons/button';
import styles from './voteFooterMenu.css';

const VoteFooterMenu = ({ onClosePopUp, openPasswordStep, t, votingNum }) => (
  <div className={`${styles.voteFooterMenu}`}>
    <div className={`${styles.votingNumWrapper}`}>
      <div className={`${styles.currentNumWrapper}`}>
        <h6>
          <span>{t('You are voting for')}{t(' ')}</span>
          <span className={`${styles.currentNum}`}>{t('{{votingNum}} BP', { votingNum })}</span>
        </h6>
      </div>
      <div className={`${styles.totalNumWrapper}`}>
        <h6>{t('You can vote for {{MAX_VOTE_NUM}} BP in total', { MAX_VOTE_NUM })}</h6>
      </div>
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
