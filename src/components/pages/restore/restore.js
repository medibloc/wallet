import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import Enter from '../../organisms/passphrase/enter/enter';
import MultiStep from '../../atoms/multiStep/index';
import Password from '../../organisms/passphrase/password/password';
import networks from '../../../constants/networks';
import Box from '../../atoms/box/index';
import logo from '../../../assets/images/MEDIBLOC.png';
import styles from './restore.css';
import routes from '../../../constants/routes';

class Restore extends React.Component {
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

  render() {
    const { t } = this.props;
    return (<Box className={`${styles.wrapper}`}>
      <img src={logo} />
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

