import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './startPage.css';
import Box from '../box';
import logo from '../../assets/images/MEDIBLOC.png';
import { ArrowBlackButton, ArrowBlueButton } from '../toolbox/buttons/button';
import routes from '../../constants/routes';

/**
 * The container component containing start page
 */
class StartPage extends React.Component {
  render() {
    const { history, savedAccounts, t } = this.props;

    return (
      (savedAccounts && savedAccounts.accounts && savedAccounts.accounts.length > 0) ?
        <Redirect to={'/login'} /> :
        <Fragment>
          <Box className={`${styles.wrapper}`}>
            <img src={logo} />
            <div className={`${styles.startPageWrapper}`}>
              <div className={`${styles.titleWrapper}`}>
                {t('WELCOME TO MEDIBLOC TESTNET WALLET')}
              </div>
              <section className={`${styles.buttonWrapper}`}>
                <ArrowBlueButton
                  className={`${styles.restoreButton}`}
                  label={'Restore an account'}
                  onClick={() => history.push(`${routes.restore.path}`)}/>
                <ArrowBlackButton
                  label={'Create wallet ID'}
                  className={`${styles.registerButton} ${styles.hasMarginTop}`}
                  onClick={() => history.push(`${routes.register.path}`)}/>
              </section>
            </div>
          </Box>
        </Fragment>
    );
  }
}

export default StartPage;
