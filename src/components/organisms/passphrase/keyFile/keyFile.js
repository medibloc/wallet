import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import Box from '../../../atoms/box/index';
import { PrimaryButton } from '../../../atoms/toolbox/buttons/button';
import styles from './keyFile.css';

class KeyFile extends React.Component {
  uploadKeyFile() {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = (e) => {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');

      reader.onload = (re) => {
        try {
          const keyFile = JSON.parse(re.target.result);
          this.props.nextStep({ keyFile });
        } catch (ee) {
          this.props.errorToastDisplayed({
            label: this.props.t('Invalid keyfile'),
          });
        }
      };
    };

    input.click();
  }

  render() {
    const { t } = this.props;

    return (
      <Box className={`${styles.enter}`}>
        <header>
          <h2>{t('Upload keyfile')}</h2>
        </header>
        <PrimaryButton
          label={t('Upload')}
          className={`${styles.nextButton}`}
          onClick={() => this.uploadKeyFile()}
        />
      </Box>
    );
  }
}

export default withRouter(translate()(KeyFile));
