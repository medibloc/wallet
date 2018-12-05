import React from 'react';
import { translate } from 'react-i18next';
import MultiStep from '../../atoms/multiStep';
import ResetPasswordStep from './resetPasswordStep';
import ResetSuccess from './resetSuccess';
import styles from './resetPassword.css';

class ResetPassword extends React.Component {
  render() {
    return (
      <MultiStep className={`${styles.resetPasswordWrapper}`}
        finalCallback={() => this.props.closePopUp()}>
        <ResetPasswordStep/>
        <ResetSuccess/>
      </MultiStep>
    );
  }
}

export default translate()(ResetPassword);
