import React from 'react';
import { translate } from 'react-i18next';
import txTypes from '../../../../common/src/constants/transactionTypes';
import styles from './transactions.css';

const TransactionType = (props) => {
  const { t } = props;
  let type;
  console.log(props.type);
  switch (props.type) {
    case txTypes.send:
      type = t('Send');
      break;
    case txTypes.addRecord:
      type = t('Add Record');
      break;
    case txTypes.vest:
      type = t('Vest');
      break;
    case txTypes.withdrawVesting:
      type = t('Withdraw Vesting');
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
    default:
      type = false;
      break;
  }
  return type ? <span className={styles.smallButton}>{type}</span> : null;
};

export default translate()(TransactionType);