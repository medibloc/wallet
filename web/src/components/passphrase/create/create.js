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
import Footer from '../../register/footer/footer';
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

  refreshAddress() {
    const passphrase = generatePassphrase();
    console.log(passphrase);
    this.setState({
      passphrase,
      address: extractAddress(passphrase),
    });
  }

  render() {
    const { t, nextStep } = this.props;
    return (
      <section className={`${styles.createWrapper}`}>
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
        <small> {t('This avatar is unique. You cannot change it later.')} </small>
        <Input type='text'
          parentclassname={`${styles.accountAddress}`}
          title={t('Account address')}
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
        <Footer t={t} />
      </section>
    );
  }
}

export default withRouter(translate()(Create));

