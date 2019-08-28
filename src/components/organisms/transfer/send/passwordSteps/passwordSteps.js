import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import actionTypes from '../../../../../constants/actions';
import { Input } from '../../../../atoms/toolbox/inputs/input';
import { PrimaryButton } from '../../../../atoms/toolbox/buttons/button';
import styles from './passwordSteps.css';
import TransferTabs from '../../transferTabs/index';
import WBox from '../../../../atoms/wbox/index';
import regex from '../../../../../utils/regex';

class PasswordSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: false,
      password: {
        value: this.props.password || '',
      },
      passwordCorrected: false,
      passwordFailed: false,
      requestSucceeded: false,
      requestFailed: false,
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

  componentDidUpdate(prevProps) {
    if (this.state.sent && !this.props.account.passwordVerifying &&
      prevProps.account.passwordVerifying) {
      if (this.props.account.passwordValidity) {
        this.setState({ passwordCorrected: true });
      } else {
        this.setState({ passwordFailed: true });
      }
    }

    // TODO: check failed transaction
    if (this.state.sent && (!this.props.loading ||
        !(this.props.loading.includes(actionTypes.requestTransferTransaction) ||
        this.props.loading.includes(actionTypes.requestVestAndSendTransaction))) &&
      (prevProps.loading && prevProps.loading.length > 0 &&
        (prevProps.loading.includes(actionTypes.requestTransferTransaction) ||
        prevProps.loading.includes(actionTypes.requestVestAndSendTransaction)))) {
      this.setState({ requestSuccess: true });
    }

    if (this.state.passwordFailed) {
      this.initRequestState();
      this.setState({
        password: {
          ...this.state.password,
          error: this.props.t('Wrong Password'),
        },
      });
      this.showWrongPasswordToast();
    }

    if (this.state.passwordCorrected && this.state.requestSuccess) {
      this.props.nextStep();
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

  handleClick() {
    this.setState({ sent: true });

    this.props.sent({
      account: this.props.account,
      activePeer: this.props.peers.activePeer,
      amount: this.props.amount,
      chainId: this.props.peers.chainId,
      description: this.props.description,
      password: this.state.password.value,
      to: this.props.recipient,
      fee: this.props.fee,
    });
  }

  initRequestState() {
    this.setState({
      sent: false,
      passwordVerified: false,
      passwordFailed: false,
      requestSuccess: false,
      requestFailed: false,
    });
  }

  showWrongPasswordToast() {
    this.props.errorToastDisplayed({
      label: this.props.t('Wrong password.'),
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
      <Fragment>
        <WBox className={`${styles.passwordStepsWrapper}`}>
          <TransferTabs setTabSend={setTabSend} isActiveTabSend={true} />
          <div className={`${styles.bodyWrapper}`}>
            <div className={`${styles.transferInfo}`}>
              <div className={`${grid.row} ${styles.assetInfo}`}>
                <small className={`${styles.transferFields} ${grid['col-sm-4']}`}>{t('Asset')}</small>
                <h6 className={`${styles.transferBody} ${grid['col-sm-8']}`}>{this.props.amount} MED</h6>
              </div>
              <div className={`${grid.row} ${styles.feeInfo}`}>
                <small className={`${styles.transferFields} ${grid['col-sm-4']}`}>{t('Fee')}</small>
                <h6 className={`${styles.transferBody} ${grid['col-sm-8']}`}>{this.props.fee} MED</h6>
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
                  disabled={
                    !this.state.password.value ||
                    (this.props.loading && this.props.loading.length > 0) ||
                    this.state.sent
                  }
                  label={t('Next')}
                  onClick={() => this.handleClick()} />
              </div>
            </footer>
          </div>
        </WBox>
      </Fragment>
    );
  }
}

export default withRouter(translate()(PasswordSteps));
