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
    case txTypes.genesis: // TODO @ggomma consider genesis transaction
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
    case txTypes.createValidator:
      type = i18n.t('Create Validator');
      break;
    case txTypes.editValidator:
      type = i18n.t('Edit Validator');
      break;
    case txTypes.delegate:
      type = i18n.t('Delegate');
      break;
    case txTypes.undelegate:
      type = i18n.t('Undelegate');
      break;
    case txTypes.redelegate:
      type = i18n.t('Redelegate');
      break;
    case txTypes.unjail:
      type = i18n.t('Unjail');
      break;
    case txTypes.submitProposal:
      type = i18n.t('Propose');
      break;
    case txTypes.deposit:
      type = i18n.t('Deposit');
      break;
    case txTypes.vote:
      type = i18n.t('Vote');
      break;
    case txTypes.textProposal:
      type = i18n.t('Proposal');
      break;
    case txTypes.swUpgradeProposal:
      type = i18n.t('Propose');
      break;
    case txTypes.withdrawDelegationReward:
      type = i18n.t('Reward');
      break;
    case txTypes.withdrawValidatorCommission:
      type = i18n.t('Commission');
      break;
    case txTypes.modifyWithdrawAddress:
      type = i18n.t('Modify');
      break;
    case txTypes.verifyInvariant:
      type = i18n.t('Verify');
      break;
    case txTypes.multiSend:
      type = i18n.t('Transfer');
      break;
    case txTypes.createTopic:
      type = i18n.t('Topic');
      break;
    case txTypes.addWriter:
      type = i18n.t('Writer');
      break;
    case txTypes.addRecord:
      type = i18n.t('Record');
      break;
    case txTypes.deleteWriter:
      type = i18n.t('Writer');
      break;
    default:
      break;
  }
  return type;
};
