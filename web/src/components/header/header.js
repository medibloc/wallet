import React from 'react';
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown-now';
import { FontIcon } from '../fontIcon';
import AccountVisual from '../accountVisual';
import CountDownTemplate from './countDownTemplate';
import CopyToClipboard from '../copyToClipboard';
import MedAmount from '../medAmount';
import Account from '../account';
import logo from '../../assets/images/main-menu-icons/homeCopy@2x.png';
import PrivateWrapper from '../privateWrapper';
import { ActionButton } from './../toolbox/buttons/button';
import styles from './header.css';
import CustomCountDown from './customCountDown';
import routes from './../../constants/routes';

class Header extends React.Component {
  shouldShowActionButton() {
    const { pathname } = this.props.location;
    return !this.props.isAuthenticated
      && !this.props.account.loading
      // && pathname !== routes.login.path
      && ![routes.register.path] // , routes.addAccount.path
        .some(el => pathname.includes(el));
  }

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
                    <div className={styles.balance}>
                      <text> Balance:  </text>
                      <MedAmount val={this.props.account.balance}/>
                      <small> MED</small>
                    </div>
                    <div className={styles.balance}>
                      <text> Vesting:  </text>
                      <MedAmount val={this.props.account.vesting}/>
                      <small> MED</small>
                    </div>
                    <CopyToClipboard
                      value={this.props.account.address}
                      className={`${styles.address} account-information-address`}
                      copyClassName={styles.copy}/>
                    {!this.props.autoLog && this.props.account.passphrase ?
                      <div className={styles.unlocked}>{this.props.t('Unlocked')}</div> : <div></div>}
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
                        </div> : <div></div>}
                    </div>
                      : <div></div>
                    }
                  </div>
                  <Link to={''} className={styles.avatar}>
                    <AccountVisual
                      address={this.props.account.address}
                      size={69} sizeS={40}
                    />
                  </Link>
                  <div className={styles.menu}>
                    <figure className={styles.iconCircle}>
                      <Link to={''} className={`${styles.link} saved-accounts`}>
                        <FontIcon value='more'/>
                      </Link>
                    </figure>
                  </div>
                </div>
              </PrivateWrapper>
              { this.shouldShowActionButton() &&
                <Link className={styles.login} to='/'>
                  <ActionButton className={styles.button}>{this.props.t('Sign in')}</ActionButton>
                  <span className={styles.link}>
                    {this.props.t('Sign in')} <FontIcon value='arrow-right'/>
                  </span>
                </Link>
              }
            </div>
          </div>
        </div>
        <div className={`${styles.searchBar}`}>
          {this.props.account.loading ?
            null :
            <Account peers={this.props.peers} t={this.props.t}/>}
        </div>
      </header>
    );
  }
}


export default Header;
