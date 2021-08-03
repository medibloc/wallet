import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import MultiStep from '../../atoms/multiStep/index';
import Confirm from '../../organisms/passphrase/confirm/confirm';
import Create from '../../organisms/passphrase/create/create';
import Password from '../../organisms/passphrase/password/password';
import Safekeeping from '../../organisms/passphrase/safekeeping/safekeeping';
import network from '../../../constants/network';
import Box from '../../atoms/box/index';
import styles from './register.css';
import routes from '../../../constants/routes';

class Register extends React.Component {
  backToLogin() {
    this.props.history.push('/');
  }

  onRegister({ address, encKey, label }) {
    this.props.accountSaved({
      address,
      encKey,
      label,
      networkCode: process.env.NETWORK_CODE || network.code,
    });

    this.props.history.push(`${routes.login.path}`);
  }

  showCopySuccessToast() {
    this.props.successToastDisplayed({
      label: this.props.t('Backup phrase copied.'),
    });
  }

  render() {
    const { t } = this.props;
    return (<Box className={`${styles.wrapper}`}>
      <img src="/assets/images/medibloc.svg" />
      <MultiStep className={`${styles.register}`}
        prevPage={() => this.backToLogin()}
        finalCallback={(...args) => this.onRegister(...args)}>
        <Create title={'Create'} t={t} />
        <Safekeeping showCopySuccessToast={() => this.showCopySuccessToast()}
          title={'Safekeeping'} t={t} />
        <Confirm title={'Confirm'} t={t} />
        <Password title={'Password'} t={t} />
      </MultiStep>
    </Box>);
  }
}

export default withRouter(translate()(Register));

