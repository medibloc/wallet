import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import Enter from '../../organisms/passphrase/enter/enter';
import MultiStep from '../../atoms/multiStep';
import Password from '../../organisms/passphrase/password/password';
import networks from '../../../constants/networks';
import Box from '../../atoms/box/index';
import logo from '../../../assets/images/MEDIBLOC.png';
import styles from './restore.css';
import routes from '../../../constants/routes';
import { PrimaryButton } from '../../atoms/toolbox/buttons/button';
import KeyFile from '../../organisms/passphrase/keyFile';
import PasswordForKeyfile from '../../organisms/passphrase/passwordForKeyfile';


class Restore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restoreCase: null,
    };
  }

  changeCase(i) {
    this.setState({ restoreCase: i });
  }


  onRegister({ address, encKey, encPassphrase, label }) {
    this.props.accountSaved({
      address,
      encKey,
      encPassphrase,
      label,
      networkCode: process.env.NETWORK_CODE || networks.default.code,
    });

    this.props.history.push(`${routes.login.path}`);
  }

  render() {
    const { t } = this.props;
    const { restoreCase } = this.state;

    return (
      <Box className={`${styles.wrapper}`}>
        <img src={logo} />
        {
          restoreCase === null && (
            <div className={`${styles.caseWrapper}`}>
              <header className={`${styles.header}`}>
                <h2>{t('Choose restore method')}</h2>
              </header>
              <PrimaryButton
                label={t('From mnemonic (24 words)')}
                className={`${styles.caseButton}`}
                onClick={() => this.changeCase(0)}
              />
              <PrimaryButton
                label={t('From keyfile')}
                className={`${styles.caseButton}`}
                onClick={() => this.changeCase(1)}
              />
            </div>
          )
        }
        {
          restoreCase === 0 && (
            <MultiStep className={`${styles.restore}`}
              prevPage={() => this.changeCase(null)}
              finalCallback={(...args) => this.onRegister(...args)}
              forceToAppear={true}>
              <Enter title={'Enter'} t={t} />
              <Password title={'Password'} t={t} />
            </MultiStep>
          )
        }
        {
          restoreCase === 1 && (
            <MultiStep className={`${styles.restore}`}
              prevPage={() => this.changeCase(null)}
              finalCallback={(...args) => this.onRegister(...args)}
              forceToAppear={true}>
              <KeyFile title={'KeyFile'} t={t} />
              <PasswordForKeyfile title={'Password'} t={t} />
            </MultiStep>
          )
        }
      </Box>
    );
  }
}

export default withRouter(translate()(Restore));

