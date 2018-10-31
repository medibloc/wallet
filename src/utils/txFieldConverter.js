import i18n from '../i18n';
import txTypes from '../constants/transactionTypes';

export const txColorConverter = (txType, isReceived) => {
  let color;
  switch (txType) {
    case txTypes.send:
      color = isReceived ? 'received' : 'send';
      break;
    case txTypes.addRecord:
      break;
    case txTypes.vest:
      color = 'staking';
      break;
    case txTypes.withdrawVesting:
      color = 'unstaking';
      break;
    case txTypes.becomeCandidate:
      break;
    case txTypes.quitCandidacy:
      break;
    case txTypes.vote:
      break;
    case txTypes.addCertification:
      break;
    case txTypes.revokeCertification:
      break;
    case txTypes.genesis:
      color = isReceived ? 'received' : 'send';
      break;
    case txTypes.genesisVest:
      color = 'staking';
      break;
    default:
      break;
  }
  return color;
};

export const txTypeConverter = (txType, isReceived) => {
  let type;
  switch (txType) {
    case txTypes.send:
      if (isReceived === true) {
        type = i18n.t('Received');
      } else if (isReceived === false) {
        type = i18n.t('Send');
      } else {
        type = i18n.t('Transfer');
      }
      break;
    case txTypes.addRecord:
      type = i18n.t('Add Record');
      break;
    case txTypes.vest:
      type = i18n.t('Staking');
      break;
    case txTypes.withdrawVesting:
      type = i18n.t('Unstaking');
      break;
    case txTypes.becomeCandidate:
      type = i18n.t('Become Candidate');
      break;
    case txTypes.quitCandidacy:
      type = i18n.t('Quit Candidacy');
      break;
    case txTypes.vote:
      type = i18n.t('Vote');
      break;
    case txTypes.addCertification:
      type = i18n.t('Add Certification');
      break;
    case txTypes.revokeCertification:
      type = i18n.t('Revoke Certification');
      break;
    case txTypes.genesis:
      if (isReceived === true) {
        type = i18n.t('Received');
      } else if (isReceived === false) {
        type = i18n.t('Send');
      } else {
        type = i18n.t('Transfer');
      }
      break;
    case txTypes.genesisVest:
      type = i18n.t('Staking');
      break;
    default:
      break;
  }
  return type;
};
