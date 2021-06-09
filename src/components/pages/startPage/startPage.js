import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './startPage.css';
import Box from '../../atoms/box/index';
import bg from '../../../assets/images/main_bg.png';
import { ArrowBlackButton, ArrowBlueButton } from '../../atoms/toolbox/buttons/button';
import routes from '../../../constants/routes';

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
          <Box className={`${styles.wrapper}`}
            style={{ backgroundImage: `url(${bg})` }}>
            <div className={`${styles.startPageWrapper}`}>
              <img src="/assets/images/medibloc.svg" />
              <div className={`${styles.contentWrapper}`}>
                <div className={`${styles.titleWrapper}`}>
                  {t('WELCOME TO MEDIBLOC WALLET')}
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
            </div>
          </Box>
        </Fragment>
    );
  }
}

export default StartPage;
