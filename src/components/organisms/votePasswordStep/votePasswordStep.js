import React, { Fragment } from 'react';
import InlineSVG from 'svg-inline-react';
import actionTypes from '../../../constants/actions';
import CloseButton from '../../../assets/images/icons/buttonX.svg';
import { Input } from '../../atoms/toolbox/inputs/input';
import { PrimaryButton } from '../../atoms/toolbox/buttons/button';
import WBox from '../../atoms/wbox/index';
import styles from './votePasswordStep.css';
import regex from '../../../utils/regex';

class VotePasswordStep extends React.Component {
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
      !(this.props.loading.includes(actionTypes.requestVoteTransaction))) &&
      (prevProps.loading && prevProps.loading.length > 0 &&
        (prevProps.loading.includes(actionTypes.requestVoteTransaction)))) {
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
      this.props.closePopUp();
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
    const nonce = Number(this.props.account.nonce) + 1;
    this.setState({ sent: true });
    setTimeout(() => {
      // if (this.props.autoVesting && this.props.vestingAmount) {
      //   this.props.vestedAndVoted({
      //     account: this.props.account,
      //     activePeer: this.props.peers.activePeer,
      //     chainId: this.props.peers.chainId,
      //     description: this.props.description,
      //     nonce,
      //     password: this.state.password.value,
      //     to: this.props.recipient,
      //     transferAmount: this.props.amount,
      //     vestingAmount: this.props.vestingAmount,
      //   });
      // } else {
      this.props.voted({
        account: this.props.account,
        activePeer: this.props.peers.activePeer,
        candidates: this.props.votingList,
        chainId: this.props.peers.chainId,
        nonce,
        password: this.state.password.value,
      });
      // }
    }, 500);
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
    const { closePopUp, t } = this.props;

    return (
      <Fragment>
        <div className={styles.relative}>
          <div className={styles.wrapper}>
            <div className={styles.popupWrapper}>
              <div className={styles.closeWrapper}>
                <div className={styles.closeButtonWrapper}>
                  <InlineSVG
                    className={styles.closeButton}
                    onClick={() => closePopUp()}
                    src={CloseButton} />
                </div>
              </div>
              <WBox className={styles.passwordStepWrapper}>
                <div className={`${styles.guideText}`}>
                  <h6>{t('To confirm, please enter your password')}</h6>
                </div>
                <div className={`${styles.nextStepWrapper}`}>
                  <Input
                    onChange={(...args) => this.handleChange('password', ...args)}
                    placeholder={`${t('Enter your password')}`}
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
              </WBox>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default VotePasswordStep;
