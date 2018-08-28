import React, { Fragment } from 'react';
import { translate } from 'react-i18next';
import WBox from '../wbox';
import styles from './resetPassword.css';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
    };
  }

  render() {
    const { t } = this.props;
    console.log(t(''));
    return (
      <Fragment>
        <WBox className={styles.resetPassword}/>
      </Fragment>
    );
  }
}

export default translate()(ResetPassword);
