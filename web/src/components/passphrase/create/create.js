import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { PrimaryButton } from '../../toolbox/buttons/button';
import { Input } from '../../toolbox/inputs/input';
import styles from './create.css';
import AccountVisual from '../../accountVisual';
import Footer from '../../register/footer/footer';
import Refresh from '../../../assets/images/icons/baselineRefresh24Px@2x.png';
import { generatePassphrase } from './../../../../../common/src/utils/passphrase';
import { extractAddress } from '../../../../../common/src/utils/account';

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
    this.setState({
      passphrase,
      address: extractAddress(passphrase),
    });
  }

  render() {
    const { history, t, nextStep } = this.props;
    return (
      <section className={`${styles.createWrapper}`}>
        <header>
          <h2>{t('Create New Account')}</h2>
        </header>
        <div className={`${styles.accountVisual}`}>
          <AccountVisual
            address={this.state.address}
            size={120} sizeS={120} />
          <img
            className={`${styles.refreshButton}`}
            src={Refresh}
            onClick={() => this.refreshAddress()}
          />
        </div>
        <small> {t('This avatar is unique. You cannot change it later.')} </small>
        <Input type='text'
          parentclassname={`${styles.accountAddress}`}
          title={t('Account address')}
          value={this.state.address.substring(0, 11) + '*'.repeat(44) +
            this.state.address.substring(54, 65)}
          disabled={true} />
        <PrimaryButton label={t('Continue')}
          className={`${styles.continueButton}`}
          onClick={() => nextStep({
            passphrase: this.state.passphrase,
          })}/>
        <Footer
          history={history}
          t={t}
          type={'register'} />
      </section>
    );
  }
}

export default withRouter(translate()(Create));

