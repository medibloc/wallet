import React from 'react';
import { translate } from 'react-i18next';
import txTypes from '../../../../constants/transactionTypes';
import styles from './transactionType.css';

const TransactionType = (props) => {
  const { t } = props;
  let color;
  let type;
  switch (props.type) {
    case txTypes.send:
      color = props.isReceived ? 'received' : 'send';
      type = props.isReceived ? t('Received') : t('Send');
      break;
    case txTypes.addRecord:
      type = t('Add Record');
      break;
    case txTypes.vest:
      color = 'staking';
      type = t('Staking');
      break;
    case txTypes.withdrawVesting:
      color = 'unstaking';
      type = t('Unstaking');
      break;
    case txTypes.becomeCandidate:
      type = t('Become Candidate');
      break;
    case txTypes.quitCandidacy:
      type = t('Quit Candidacy');
      break;
    case txTypes.vote:
      type = t('Vote');
      break;
    case txTypes.addCertification:
      type = t('Add Certification');
      break;
    case txTypes.revokeCertification:
      type = t('Revoke Certification');
      break;
    case txTypes.genesis:
      color = props.isReceived ? 'received' : 'send';
      type = props.isReceived ? t('Received') : t('Send');
      break;
    case txTypes.genesisVest:
      color = 'staking';
      type = t('Staking');
      break;
    default:
      type = false;
      break;
  }
  return type ? <span className={`${styles.smallButton} ${styles[color]}`}>{type}</span> : null;
};

export default translate()(TransactionType);
