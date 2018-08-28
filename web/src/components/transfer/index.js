import React, { Fragment } from 'react';
import { translate } from 'react-i18next';
import Send from '../send';
import WBox from '../wbox';
import styles from './transfer.css';

class Transfer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };
  }

  render() {
    const { t } = this.props;

    return (
      <Fragment>
        <WBox className={styles.wrapper}>
          <div className={styles.headerWrapper}>
            <h4>{t('Transfer')}</h4>
          </div>
          <div className={styles.bodyWrapper}>
            <Send {...this.props} />
          </div>
        </WBox>
      </Fragment>
    );
  }
}

export default translate()(Transfer);
