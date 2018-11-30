import React from 'react';
import Countdown from 'react-countdown-now';
import AccountVisual from '../../atoms/accountVisual/index';
import Box from '../../atoms/box/index';
import CountDownTemplate from './countDownTemplate';
import CopyToClipboard from '../../atoms/copyToClipboard/index';
import MedAmount from '../../atoms/medAmount/index';
import PrivateWrapper from '../../atoms/privateWrapper/index';
import styles from './header.css';
import CustomCountDown from './customCountDown';
import { addMed } from '../../../utils/med';

class Header extends React.Component {
  render() {
    const { account } = this.props;
    return (
      <header className={`${styles.wrapper} mainHeader`}>
        <div className={`${styles.loginInfo}`}>
          <div>
            <div style={{ display: 'inline-block' }}>
              <PrivateWrapper>
                <div className={`account ${styles.account}`}>
                  <div className={styles.information} align="right">
                    <div className={styles.total}>
                      <MedAmount roundTo={2}
                        val={addMed(addMed(account.balance, account.vesting), account.unstaking)} />
                      <h5>MED</h5>
                    </div>
                    <CopyToClipboard
                      value={account.address}
                      className={`${styles.address} account-information-address`}
                      copyClassName={styles.copy}/>
                    {!this.props.autoLog && account.passphrase ?
                      <div className={styles.unlocked}>{this.props.t('Unlocked')}</div> : <div/>}
                    {this.props.autoLog ? <div className={styles.timer}>
                      {((account.expireTime &&
                          account.expireTime !== 0) &&
                          account.passphrase) ?
                        <div>
                          <Countdown
                            date={account.expireTime}
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
                      address={account.address}
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