import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
// import Box from '../../box';
import { PrimaryButton } from '../../toolbox/buttons/button';
import IconButton from '../../toolbox/buttons/iconButton';
import Input from '../../toolbox/inputs/input';
import CheckBox from '../../toolbox/checkbox/checkbox';
import styles from './create.css';
import AccountVisual from '../../accountVisual';
// import Reload from '../../../assets/images/icons/reload.svg';
import { generatePassphrase } from './../../../../../common/src/utils/passphrase';
import { extractAddress } from '../../../../../common/src/utils/account';
// import { extractAddress } from '../../../../common/src/utils/account';
// import routes from '../../constants/routes';

class Create extends React.Component {
  constructor() {
    super();
    const passphrase = generatePassphrase();
    this.state = {
      passphrase,
      address: extractAddress(passphrase),
    };
  }

  // componentDidUpdate() {
  //   if (this.props.account.passphrase !== undefined) {
  //     this.props.history.push(`${routes.dashboard.path}`);
  //   }
  // }

  // onRegister(passphrase) {
  //   const network = Object.assign({}, getNetwork(networks.default.code));
  //
  //   // set active peer
  //   this.props.activePeerSet({
  //     passphrase,
  //     network,
  //   });
  // }

  refreshAddress() {
    const passphrase = generatePassphrase();
    console.log(passphrase);
    this.setState({
      passphrase,
      address: extractAddress(passphrase),
    });
  }

  // backToLogin() {
  //   this.props.history.push('/');
  // }

  render() {
    const { t, nextStep } = this.props;
    return (
      <section className={`${styles.create}`}>
        <header>
          <h2>{t('Create New Account')}</h2>
        </header>
        <div className={`${styles.accountVisual}`}>
          <AccountVisual
            address={this.state.address}
            size={120} sizeS={120} />
          <IconButton
            className={`${styles.refreshButton}`}
            onClick={this.refreshAddress.bind(this)}
            icon='R'>
          </IconButton>
        </div>
        <h6> {t('This avatar is unique. You cannot change it later.')} </h6>
        <Input type='text'
          className={`${styles.accountAddress}`}
          label={t('Account address')}
          value={this.state.address}
          disabled={true} />
        <CheckBox
          label={'Keep the account on this computer'}
          className={`${styles.saveAccountCheckbox}`} />
        <PrimaryButton label={t('Continue')}
          className={`${styles.continueButton}`}
          onClick={() => nextStep({
            passphrase: this.state.passphrase,
          })}/>
        <h6> {t('or')} </h6>
        <h6> {t('Sign in')} | {t('Restore an account from a backup')} </h6>
      </section>
    );
  }
}

export default withRouter(translate()(Create));

