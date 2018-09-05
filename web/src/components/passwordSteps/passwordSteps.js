import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
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
    try {
      const privKey = getPrivKeyFromEncKey(this.props.account.encKey, this.state.password.value);
      if (extractAddress(getPubKey(privKey)) === this.props.account.address) {
        return privKey;
      }
      return null;
    } catch (e) {
      this.setState({
        password: {
          ...this.state.password,
          error: this.props.t('Wrong Password'),
        },
      });
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
            <div className={`${grid.row} ${styles.assetInfo}`}>
              <small className={`${styles.transferFields} ${grid['col-sm-4']}`}>{t('Asset')}</small>
              <h6 className={`${styles.transferBody} ${grid['col-sm-8']}`}>{this.props.amount} MED</h6>
            </div>
            <div className={`${grid.row} ${styles.recipientInfo}`}>
              <small className={`${styles.transferFields} ${grid['col-sm-4']}`}>{t('Recipient')}</small>
              <h6 className={`${styles.transferBody} ${grid['col-sm-8']}`}>{this.props.recipient}</h6>
            </div>
            <div className={`${grid.row} ${styles.descriptionInfo}`}>
              <small className={`${styles.transferFields} ${grid['col-sm-4']}`}>{t('Description')}</small>
              <h6 className={`${styles.transferBody} ${grid['col-sm-8']}`}>{this.props.description}</h6>
            </div>
          </div>
          <footer className={`${styles.passwordStepsFooter}`}>
            <div className={`${styles.guideText}`}>
              <h6>{t('To confirm, please enter your password')}</h6>
            </div>
            <div className={`${styles.nextStepWrapper}`}>
              <Input
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
                    const nonce = Number(this.props.account.nonce) + 1;
                    // this.props.vested({
                    //   activePeer: this.props.peers.activePeer,
                    //   address: this.props.account.address,
                    //   amount: 100,
                    //   description: this.props.description,
                    //   nonce: Number(this.props.account.nonce) + 1,
                    //   privKey,
                    // });
                    this.props.sent({
                      activePeer: this.props.peers.activePeer,
                      address: this.props.account.address,
                      amount: this.props.amount,
                      description: this.props.description,
                      nonce,
                      privKey,
                      to: this.props.recipient,
                    });
                    this.props.nextStep();
                  } else {
                    console.log('WRONG PASSWORD');
                  }
                }} />
            </div>
          </footer>
        </div>
      </WBox>
    );
  }
}

export default withRouter(translate()(PasswordSteps));
