import React from 'react';
import { fromRawMed } from '../../../../common/src/utils/med';
import { PrimaryButton, SecondaryButton } from './../toolbox/buttons/button';
// import AccountVisual from '../accountVisual';
import Converter from '../converter';
import TransferTabs from '../transferTabs';
import { Input } from '../toolbox/inputs/input';
import styles from './sendWritable.css';
import regex from './../../../../common/src/utils/regex';
// import inputTheme from './input.css';

class SendWritable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipient: {
        value: this.props.address || '',
      },
      amount: {
        value: this.props.amount || '',
      },
      description: {
        value: this.props.description || '',
      },
    };
    this.inputValidationRegexps = {
      recipient: regex.address,
      amount: regex.amount,
    };
  }

  componentDidMount() {
    if (this.props.prevState) {
      const newState = {
        recipient: {
          value: this.props.prevState.recipient || this.state.recipient.value,
        },
        amount: {
          value: this.props.prevState.amount || this.state.amount.value,
        },
        description: {
          description: this.props.prevState.description || this.state.description.value,
        },
      };
      this.setState(newState);
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
    if (name === 'description') {
      if (value.length > 10) {
        return this.props.t('Max length exceeded');
      }
      return undefined;
    }
    if (!value) {
      return this.props.t('Required');
    } else if (!value.match(this.inputValidationRegexps[name])) {
      return name === 'amount' ? this.props.t('Invalid amount') : this.props.t('Invalid address');
    } else if (name === 'amount' && value > parseFloat(this.getMaxAmount())) {
      return this.props.t('Not enough MED');
    } else if (name === 'amount' && value === '0') {
      return this.props.t('Zero not allowed');
    }
    return undefined;
  }

  // showAccountVisual() {
  //   return this.state.recipient.value.length && !this.state.recipient.error;
  // }

  getMaxAmount() {
    return fromRawMed(Math.max(0, this.props.account.balance));
  }

  render() {
    const { setTabSend, t } = this.props;

    return (
      <div className={`${styles.sendWrapper}`}>
        <TransferTabs setTabSend={setTabSend} isActiveTabSend={true}/>
        <div className={`${styles.bodyWrapper}`}>
          <form className={styles.form}>
            <Converter
              error={this.state.amount.error}
              placeholder={t('Amount to send')}
              onChange={(...args) => this.handleChange('amount', ...args)}
              parentclassname={`${styles.amount}`}
              t={t}
              theme={styles}
              title={t('Asset')}
              value={this.state.amount.value}
            />
            <Input
              autoFocus={this.props.autoFocus}
              error={this.state.recipient.error}
              placeholder={t('Paste or enter an address')}
              onChange={(...args) => this.handleChange('recipient', ...args)}
              parentclassname={`${styles.recipient}`}
              theme={styles}
              title={t('Recipient')}
              value={this.state.recipient.value}
            />
            <Input
              autoFocus={this.props.autoFocus}
              error={this.state.description.error}
              placeholder={t('Write an optional messages')}
              onChange={(...args) => this.handleChange('description', ...args)}
              parentclassname={`${styles.description}`}
              theme={styles}
              title={t('Description')}
              value={this.state.description.value}
            />
          </form>
          <footer className={`${styles.sendFooter}`}>
            <SecondaryButton
              className={`send-next-button ${styles.faucetButton}`}
              label={t('Get test MED')}
              onClick={() => console.log('Go to the faucet url')} />
            <PrimaryButton
              className={`send-next-button ${styles.nextButton}`}
              disabled={(!!this.state.recipient.error ||
                      !this.state.recipient.value ||
                      !!this.state.amount.error ||
                      !this.state.amount.value ||
                      !!this.state.description.error)}
              label={t('Next')}
              onClick={() => this.props.nextStep({
                amount: this.state.amount.value,
                description: this.state.description.value,
                recipient: this.state.recipient.value,
              })}/>
          </footer>
        </div>
      </div>
    );
  }
}

export default SendWritable;
