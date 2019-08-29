import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { PrimaryButton } from '../../../atoms/toolbox/buttons/button';
import { Input } from '../../../atoms/toolbox/inputs/input';
import styles from './create.css';
import AccountVisual from '../../../atoms/accountVisual/index';
import Footer from '../../../pages/register/footer/footer';
import Refresh from '../../../../assets/images/icons/baselineRefresh.png';
import { generateMnemonic } from '../../../../utils/passphrase';
import { extractAddressFromMnemonic } from '../../../../utils/account';

class Create extends React.Component {
  constructor(props) {
    super(props);
    const mnemonic = props.passphrase ?
      props.mnemonic : generateMnemonic();
    this.state = {
      mnemonic,
      address: extractAddressFromMnemonic(mnemonic),
    };
  }

  refreshAddress() {
    const mnemonic = generateMnemonic();
    this.setState({
      mnemonic,
      address: extractAddressFromMnemonic(mnemonic),
    });
  }

  render() {
    const { history, t, nextStep } = this.props;
    const { address, mnemonic } = this.state;
    if (!address) this.refreshAddress();

    return (
      <section className={`${styles.createWrapper}`}>
        <header>
          <h2>{t('Create New Account')}</h2>
        </header>
        <div className={`${styles.accountVisual}`}>
          <AccountVisual
            address={address || ''}
            size={120} sizeS={120} />
          <img
            className={`${styles.refreshButton}`}
            src={Refresh}
            onClick={() => this.refreshAddress()}
          />
        </div>
        <small>{t('Your avatar is automatically generated from your account address.')}</small>
        <small>{t('Click the refresh button if you wish to use a different one.')}</small>
        <Input type='text'
          parentclassname={`${styles.accountAddress}`}
          title={t('Account address')}
          value={address ? address.substring(0, 14) + '*'.repeat(address.length - 15) : ''}
          disabled={true} />
        <PrimaryButton label={t('Continue')}
          className={`${styles.continueButton}`}
          onClick={() => nextStep({ mnemonic })}/>
        <Footer
          history={history}
          t={t}
          type={'register'} />
      </section>
    );
  }
}

export default withRouter(translate()(Create));

