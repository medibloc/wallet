import React, { Fragment } from 'react';
import { fromRawMed, lte, toRawMed, subMed } from '../../../../../utils/med';
import { PrimaryButton } from '../../../../atoms/toolbox/buttons/button';
import Converter from '../../../../molecules/converter/index';
import EventRecipient from '../../../../molecules/eventRecipient/index';
import TransferTabs from '../../transferTabs/index';
import { Input } from '../../../../atoms/toolbox/inputs/input';
import styles from './sendWritable.css';
import regex from '../../../../../utils/regex';
import parseBalance from '../../../../../utils/balanceParser';
import { isAddress } from '../../../../../utils/account';

class SendWritable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: '0',
      fee: this.props.fee || '10',
      recipient: {
        value: this.props.address || '',
      },
      amount: {
        value: this.props.amount || '',
      },
      memo: {
        value: this.props.memo || '',
      },
      showAutoVesting: false,
      vestingAmount: this.props.vestingAmount || 0,
    };
    this.inputValidationRegexps = {
      recipient: regex.address,
      amount: regex.amount,
    };
  }

  componentDidMount() {
    const { base } = parseBalance(this.props.account);
    this.setState({ balance: base });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.account.address !== this.props.account.address) {
      const { base } = parseBalance(this.props.account);
      this.setState({ balance: base });
    }
    if (prevProps.fee !== this.props.fee) {
      this.setState({ fee: this.props.fee });
    }
  }

  calcVestingAmount(value) {
    return Math.min(Math.max(1,
      fromRawMed(subMed(this.props.account.balance, toRawMed(value))),
    ), 10);
  }

  handleChange(name, value, error) {
    this.setState({
      [name]: {
        value,
        error: typeof error === 'string' ? error : this.validateInput(name, value),
      },
      vestingAmount: (name === 'amount') ? this.calcVestingAmount(value) : this.state.vestingAmount,
    });
  }

  // need 2 bandwidth for tx + 1 bandwidth for buffer
  isEnoughAmount(value) {
    return lte(toRawMed(value), toRawMed(subMed(this.state.balance, this.state.fee)));
  }

  nextStepWithParam() {
    this.props.nextStep({
      amount: this.state.amount.value,
      memo: this.state.memo.value,
      recipient: this.state.recipient.value,
      fee: this.state.fee,
    });
  }

  toggleEventAddress() {
    const address = '0249a4b6e933581a50b90275017bab823835c925702b47a350deb60309087e132b';
    this.setState({
      recipient: {
        value: (this.state.recipient.value === address) ? '' : address,
      },
    });
  }

  validateInput(name, value) {
    if (name === 'memo') {
      if (value.length > 100) {
        return this.props.t('Max length exceeded');
      }
      return '';
    }
    if (!value) {
      return this.props.t('Required');
    } else if (name === 'amount' && !value.match(this.inputValidationRegexps[name])) {
      return this.props.t('Invalid amount');
    } else if (name === 'amount' && !this.isEnoughAmount(value)) {
      return this.props.t('Not enough MED(includes fee)');
    } else if (name === 'amount' && value === '0') {
      return this.props.t('Zero not allowed');
    } else if (name === 'recipient' && !isAddress(value)) {
      return this.props.t('Invalid address');
    }
    return '';
  }

  render() {
    const { setTabSend, t } = this.props;

    return (
      <Fragment>
        <div className={`${styles.sendWrapper}`}>
          <TransferTabs setTabSend={setTabSend} isActiveTabSend={true}/>
          <div className={`${styles.bodyWrapper}`}>
            <form className={styles.form}>
              <Converter
                autoFocus={this.props.autoFocus}
                error={this.state.amount.error}
                placeholder={t('Amount to send')}
                onChange={(...args) => this.handleChange('amount', ...args)}
                parentclassname={`${styles.amount}`}
                t={t}
                theme={styles}
                title={t('MED')}
                value={this.state.amount.value}
                fee={this.state.fee}
                price={this.props.price}
              />
              <EventRecipient
                error={this.state.recipient.error}
                toggleEventAddress={() => this.toggleEventAddress()}
                placeholder={t('Paste or enter an address')}
                onChange={(...args) => this.handleChange('recipient', ...args)}
                parentclassname={`${styles.recipient}`}
                t={t}
                theme={styles}
                title={t('Recipient')}
                value={this.state.recipient.value}
              />
              <Input
                error={this.state.memo.error}
                placeholder={t('Write a memo (optional)')}
                onChange={(...args) => this.handleChange('memo', ...args)}
                parentclassname={`${styles.memo}`}
                theme={styles}
                title={t('Memo')}
                value={this.state.memo.value}
              />
            </form>
            <footer className={`${styles.sendFooter}`}>
              <PrimaryButton
                className={`send-next-button ${styles.nextButton}`}
                disabled={(!!this.state.recipient.error ||
                        !this.state.recipient.value ||
                        !!this.state.amount.error ||
                        !this.state.amount.value ||
                        !!this.state.memo.error)}
                label={t('Next')}
                onClick={() => {
                  if (this.state.memo.value ||
                      window.confirm('Some cryptocurrency exchanges require a memo. ' +
                        'In that case, the transfer may not reach the recipient successfully, if you don\'t enter a memo. ' +
                        'Please check with your exchange to see which memo you need to enter.' +
                        '\n\nAre you sure to continue without a memo?')
                  ) {
                    this.nextStepWithParam(false);
                  }
                }}
              />
            </footer>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SendWritable;
