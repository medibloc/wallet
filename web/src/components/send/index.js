import React, { Fragment } from 'react';
import { translate } from 'react-i18next';

import WBox from '../wbox';
import MultiStep from '../multiStep';
import ResultBox from '../resultBox';
import SendWritable from '../sendWritable';
import Request from '../request';
import PasswordSteps from '../passwordSteps';
import routes from '../../constants/routes';
import styles from './send.css';

class Send extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActiveTabSend: true,
    };
  }

  refreshDashboard() {
    this.props.history.push(`${routes.dashboard.path}`);
  }

  setActiveTabSend(isActiveTabSend) {
    this.setState({ isActiveTabSend });
  }

  render() {
    return (
      <Fragment>
        <WBox className={`send-box ${styles.send}`}>
          {this.state.isActiveTabSend
            ?
            <MultiStep
              key='send'
              className={styles.wrapper}
              finalCallback={(...args) => this.refreshDashboard(...args)}>
              <SendWritable
                address={''}
                amount={0}
                autoFocus={this.props.autoFocus}
                setTabSend={(...args) => this.setActiveTabSend(...args)}/>
              <PasswordSteps
                setTabSend={(...args) => this.setActiveTabSend(...args)}/>
              <ResultBox
                setTabSend={(...args) => this.setActiveTabSend(...args)}
                history={this.props.history}/>
            </MultiStep>
            :
            <Request
              className={styles.wrapper}
              {...this.props}
              setTabSend={(...args) => this.setActiveTabSend(...args)}
            />
          }
        </WBox>
      </Fragment>
    );
  }
}

export default translate()(Send);
