import React from 'react';
import { translate } from 'react-i18next';

import Box from '../../atoms/box/index';
import { FontIcon } from '../../atoms/fontIcon/index';
import { PrimaryButton } from '../../atoms/toolbox/buttons/button';
import styles from './errorBoundary.css';
import EmptyState from '../../atoms/emptyState/index';

/* eslint-disable class-methods-use-this, no-unused-vars */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info });
  }

  reloadPage() {
    window.location.reload();
  }

  render() {
    const getMailReference = () => {
      const recipient = 'dev@medibloc.org';
      const subject = `User Reported Error - MediBloc Wallet - ${VERSION}`; // eslint-disable-line no-undef
      const body = `${this.state.error}:%0A${this.state.info.componentStack.replace(/\s{4}/g, '%0A')}`;
      return `mailto:${recipient}?&subject=${subject}&body=${body}`;
    };
    const emptyStateProps = {
      title: this.props.errorMessage,
      message: this.props.t('To recover you can'),
      className: styles.section,
    };
    const renderErrorSection = () => (
      <Box>
        <EmptyState {...emptyStateProps}>
          <div>
            <PrimaryButton
              theme={styles}
              label={this.props.t('Reload the page')}
              className='error-reload-btn'
              onClick={() => this.reloadPage() }/>
            <p className={styles.description}>{this.props.t('if the problem persists')}</p>
            <a target='_blank'
              className={styles.link}
              href={getMailReference()}
              rel='noopener noreferrer'>
              {this.props.t('Report the error via E-Mail')}&nbsp;<FontIcon>arrow-right</FontIcon>
            </a>
          </div>
        </EmptyState>
      </Box>
    );

    if (this.state.hasError) {
      return renderErrorSection();
    }
    return this.props.children;
  }
}

export default translate()(ErrorBoundary);
