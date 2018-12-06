import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import BackupWalletPasswordStep from './backupWalletPasswordStep';

const mapStateToProps = state => ({
  account: state.account,
});

export default connect(mapStateToProps)(translate()(BackupWalletPasswordStep));
