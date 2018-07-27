import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import MultiStep from '../multiStep';
import Create from '../passphrase/create/create';
import Password from '../passphrase/password/password';
import networks from '../../../../common/src/constants/networks';
import getNetwork from '../../../../common/src/utils/getNetwork';
import Box from '../box';
// import { PrimaryButton } from '../toolbox/buttons/button';
// import IconButton from '../toolbox/buttons/iconButton';
// import Input from '../toolbox/inputs/input';
// import CheckBox from '../toolbox/checkbox/checkbox';
import styles from './register.css';
// import AccountVisual from '../accountVisual';
import { generatePassphrase } from './../../../../common/src/utils/passphrase';
import { extractAddress } from '../../../../common/src/utils/account';
// import { extractAddress } from '../../../../common/src/utils/account';
// import routes from '../../constants/routes';

class Register extends React.Component {
  constructor() {
    super();
    const passphrase = generatePassphrase();
    this.state = {
      passphrase,
      address: extractAddress(passphrase),
    };
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    document.body.classList.add('contentFocused');
  }

  // componentDidUpdate() {
  //   if (this.props.account.passphrase !== undefined) {
  //     this.props.history.push(`${routes.dashboard.path}`);
  //   }
  // }

  // eslint-disable-next-line class-methods-use-this
  componentWillUnmount() {
    document.body.classList.remove('contentFocused');
  }

  onRegister(passphrase) {
    const network = Object.assign({}, getNetwork(networks.default.code));

    // set active peer
    this.props.activePeerSet({
      passphrase,
      network,
    });
  }

  backToLogin() {
    this.props.history.push('/');
  }

  render() {
    const { t } = this.props;
    return (<Box className={`${styles.wrapper}`}>
      <img src="../../assets/images/MEDIBLOC.png" />
      <MultiStep className={`${styles.register}`}
        prevPage={this.backToLogin.bind(this)}
        finalCallback={this.onRegister.bind(this)}>
        <Create title={'Create'} t={t} />
        <Password title={'Password'} t={t} />
      </MultiStep>
    </Box>);
  }
}

export default withRouter(translate()(Register));

