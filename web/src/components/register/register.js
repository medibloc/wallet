import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import MultiStep from '../multiStep';
import Confirm from '../passphrase/confirm/confirm';
import Create from '../passphrase/create/create';
import Password from '../passphrase/password/password';
import Safekeeping from '../passphrase/safekeeping/safekeeping';
import networks from '../../../../common/src/constants/networks';
import getNetwork from '../../../../common/src/utils/getNetwork';
import Box from '../box';
import styles from './register.css';

class Register extends React.Component {
  backToLogin() {
    this.props.history.push('/');
  }

  onRegister({ address, encKey, label, passphrase }) {
    const network = Object.assign({}, getNetwork(networks.default.code));

    this.props.accountSaved({
      address,
      encKey,
      label,
      network,
      passphrase,
    });

    this.props.history.push('/login');
  }

  render() {
    const { t } = this.props;
    return (<Box className={`${styles.wrapper}`}>
      <img src="../../assets/images/MEDIBLOC.png" />
      <MultiStep className={`${styles.register}`}
        prevPage={this.backToLogin.bind(this)}
        finalCallback={this.onRegister.bind(this)}>
        <Create title={'Create'} t={t} />
        <Safekeeping title={'Safekeeping'} t={t} />
        <Confirm title={'Confirm'} t={t} />
        <Password title={'Password'} t={t} />
      </MultiStep>
    </Box>);
  }
}

export default withRouter(translate()(Register));

