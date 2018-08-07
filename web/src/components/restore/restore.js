import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import Enter from '../passphrase/enter/enter';
import MultiStep from '../multiStep';
import Password from '../passphrase/password/password';
import networks from '../../../../common/src/constants/networks';
import getNetwork from '../../../../common/src/utils/getNetwork';
import Box from '../box';
import styles from './restore.css';

class Restore extends React.Component {
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
      <MultiStep className={`${styles.restore}`}
        prevPage={() => this.backToLogin()}
        finalCallback={(...args) => this.onRegister(...args)}>
        <Enter title={'Enter'} t={t} />
        <Password title={'Password'} t={t} />
      </MultiStep>
    </Box>);
  }
}

export default withRouter(translate()(Restore));

