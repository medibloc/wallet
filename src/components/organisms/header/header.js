import React from 'react';
import AccountVisual from '../../atoms/accountVisual/index';
import Box from '../../atoms/box/index';
import CopyToClipboard from '../../atoms/copyToClipboard/index';
import MedAmount from '../../atoms/medAmount/index';
import PrivateWrapper from '../../atoms/privateWrapper/index';
import styles from './header.css';
import { mulMed } from '../../../utils/med';
import parseBalance from '../../../utils/balanceParser';

class Header extends React.Component {
  render() {
    const { account } = this.props;
    const balances = parseBalance(account);

    return (
      <header className={`${styles.wrapper} mainHeader`}>
        <div className={`${styles.loginInfo}`}>
          <div>
            <div style={{ display: 'inline-block' }}>
              <PrivateWrapper>
                <div className={`account ${styles.account}`}>
                  <div className={styles.information} align="right">
                    <div className={styles.total}>
                      <MedAmount roundTo={6}
                        val={mulMed(balances.total, 10 ** 6)} />
                      <h5>MED</h5>
                    </div>
                    <CopyToClipboard
                      value={account.address}
                      className={`${styles.address} account-information-address`}
                      copyClassName={styles.copy}/>
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
