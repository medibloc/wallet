import React from 'react';
import Countdown from 'react-countdown-now';
import AccountVisual from '../accountVisual';
import Box from '../box';
import CountDownTemplate from './countDownTemplate';
import CopyToClipboard from '../copyToClipboard';
import MedAmount from '../medAmount';
import logo from '../../assets/images/main-menu-icons/homeCopy.png';
import PrivateWrapper from '../privateWrapper';
import styles from './header.css';
import CustomCountDown from './customCountDown';

class Header extends React.Component {
  render() {
    return (
      <header className={`${styles.wrapper} mainHeader`}>
        <div className={`${styles.loginInfo}`}>
          <div>
            <div style={{ display: 'inline-block', float: 'left' }}>
              <img src={logo} className={`${styles.logo}`}/>
            </div>
            <div style={{ display: 'inline-block' }}>
              <PrivateWrapper>
                <div className={`account ${styles.account}`}>
                  <div className={styles.information} align="right">
                    <div className={styles.total}>
                      <MedAmount val={parseInt(this.props.account.balance, 10) +
                        parseInt(this.props.account.vesting, 10) +
                        parseInt(this.props.account.unstaking, 10)}/>
                      <small>MED</small>
                    </div>
                    <CopyToClipboard
                      value={this.props.account.address}
                      className={`${styles.address} account-information-address`}
                      copyClassName={styles.copy}/>
                    {!this.props.autoLog && this.props.account.passphrase ?
                      <div className={styles.unlocked}>{this.props.t('Unlocked')}</div> : <div/>}
                    {this.props.autoLog ? <div className={styles.timer}>
                      {((this.props.account.expireTime &&
                          this.props.account.expireTime !== 0) &&
                          this.props.account.passphrase) ?
                        <div>
                          <Countdown
                            date={this.props.account.expireTime}
                            renderer={CountDownTemplate}
                            onComplete={() => {
                              this.props.removeSavedAccountPassphrase();
                            }
                            }
                          ><CustomCountDown
                              resetTimer={this.props.resetTimer}
                              autoLog={this.props.autoLog}
                              t={this.props.t}
                            />
                          </Countdown>
                        </div> : <div/>}
                    </div>
                      : <div/>
                    }
                  </div>
                  <Box className={styles.avatar}>
                    <AccountVisual
                      address={this.props.account.address}
                      size={72}
                    />
                  </Box>
                </div>
              </PrivateWrapper>
            </div>
          </div>
        </div>
      </header>
    );
  }
}


export default Header;
