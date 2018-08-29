import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { Input } from '../toolbox/inputs/input';
import { PrimaryButton } from '../toolbox/buttons/button';
import styles from './passwordSteps.css';
import TransferTabs from '../transferTabs';
import WBox from '../wbox';
import regex from '../../../../common/src/utils/regex';
import { extractAddress, getPrivKeyFromEncKey, getPubKey } from '../../../../common/src/utils/account';

class PasswordSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: {
        value: this.props.password || '',
      },
    };
    this.inputValidationRegexps = {
      password: regex.password,
    };
  }

  componentDidMount() {
    if (this.props.prevState) {
      const newState = {
        password: {
          value: this.props.prevState.password || this.state.password.value,
        },
      };
      this.setState(newState);
    }
  }

  decryptPassphrase() {
    console.log('decryptPassphrase called');
    try {
      const privKey = getPrivKeyFromEncKey(this.props.account.encKey, this.state.password.value);
      if (extractAddress(getPubKey(privKey)) === this.props.account.address) {
        return privKey;
      }
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  handleChange(name, value, error) {
    this.setState({
      [name]: {
        value,
        error: typeof error === 'string' ? error : this.validateInput(name, value),
      },
    });
  }

  validateInput(name, value) {
    if (!value) {
      return this.props.t('Required');
    } else if (!value.match(this.inputValidationRegexps[name])) {
      return this.props.t('Invalid password');
    }
    return undefined;
  }

  render() {
    const { setTabSend, t } = this.props;
    return (
      <WBox className={`${styles.passwordStepsWrapper}`}>
        <TransferTabs setTabSend={setTabSend} isActiveTabSend={true} />
        <div className={`${styles.bodyWrapper}`}>
          <div className={`${styles.transferInfo}`}>
            <div className={`${styles.transferInfoRow} ${styles.assetInfo}`}>
              <small className={`${styles.transferFields}`} key={'Asset-key'}>{t('Asset')}</small>
              <h6 className={`${styles.transferBody}`} key={'Asset-body'}>{this.props.amount} MED</h6>
            </div>
            <div className={`${styles.transferInfoRow} ${styles.recipientInfo}`}>
              <small className={`${styles.transferFields}`} key={'Recipient-key'}>{t('Recipient')}</small>
              <h6 className={`${styles.transferBody}`} key={'Recipient-body'}>{this.props.recipient}</h6>
            </div>
            <div className={`${styles.transferInfoRow} ${styles.descriptionInfo}`}>
              <small className={`${styles.transferFields}`} key={'Description-key'}>{t('Description')}</small>
              <h6 className={`${styles.transferBody}`} key={'Description-body'}>{this.props.description}</h6>
            </div>
          </div>
        </div>
        <footer className={`${styles.passwordStepsFooter}`}>
          <div className={`${styles.guideText}`}>
            <h6>{t('To confirm, please enter your password')}</h6>
          </div>
          <Input
            className={`${styles.passwordInput}`}
            onChange={(...args) => this.handleChange('password', ...args)}
            placeholder={`${t('password')}`}
            theme={styles}
            type={'password'}
            value={this.state.password.value}
          />
          <PrimaryButton
            label={t('Next')}
            onClick={() => {
              const privKey = this.decryptPassphrase();
              if (privKey !== null) {
                this.props.sent({
                  activePeer: this.props.peers.activePeer,
                  address: this.props.account.address,
                  amount: this.props.amount,
                  description: this.props.description,
                  nonce: parseInt(this.props.account.nonce, 10) + 1,
                  privKey,
                  to: this.props.recipient,
                });
                this.props.nextStep();
              } else {
                console.log('WRONG PASSWORD');
              }
            }} />
        </footer>
      </WBox>
    );
  }
}

export default withRouter(translate()(PasswordSteps));
