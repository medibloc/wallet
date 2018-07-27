import React from 'react';
import styles from './login.css';
import networks from '../../../../common/src/constants/networks';
import Box from '../box';

/**
 * The container component containing login
 * and create account functionality
 */
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passphrase: '',
      address: '',
      network: networks.default.code,
    };
  }

  render() {
    return (this.props.account.loading ?
      <span></span> :
      <Box className={styles.wrapper}>
        <h2>{this.props.t('Create New Account')}</h2>
      </Box>
    );
  }
}

export default Login;
