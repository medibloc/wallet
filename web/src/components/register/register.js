import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import MultiStep from '../multiStep';
import Confirm from '../passphrase/confirm/confirm';
import Create from '../passphrase/create/create';
import Password from '../passphrase/password/password';
import Safekeeping from '../passphrase/safekeeping/safekeeping';
import networks from '../../../../common/src/constants/networks';
import Box from '../box';
import logo from '../../assets/images/MEDIBLOC.png';
import styles from './register.css';
import routes from '../../constants/routes';

class Register extends React.Component {
  backToLogin() {
    this.props.history.push('/');
  }

  onRegister({ address, encKey, label }) {
    this.props.accountSaved({
      address,
      encKey,
      label,
      networkCode: networks.default.code,
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
      <img src={logo} />
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

