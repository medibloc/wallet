import React from 'react';
import { Redirect } from 'react-router-dom';
import styles from './startPage.css';
import Box from '../box';
import { SecondaryLightButton } from '../toolbox/buttons/button';
import routes from '../../constants/routes';

/**
 * The container component containing start page
 */
class StartPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { history, savedAccounts } = this.props;

    return (
      (savedAccounts && savedAccounts.accounts && savedAccounts.accounts.length > 0) ?
        <Redirect to={'/login'} /> :
        <Box className={`${styles.wrapper}`}>
          <img src="../../assets/images/MEDIBLOC.png" />
          <div className={`${styles.startPageWrapper}`}>
            <section className={`${styles.startPage}`}>
              <SecondaryLightButton
                className={`${styles.button}`}
                label={'Sign in'}
                onClick={() => history.push(`${routes.restore.path}`)}/>
              <SecondaryLightButton
                label={'Create wallet ID'}
                className={`${styles.button} ${styles.hasMarginTop}`}
                onClick={() => history.push(`${routes.register.path}`)}/>
            </section>
          </div>
        </Box>
    );
  }
}

export default StartPage;
