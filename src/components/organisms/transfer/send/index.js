import React, { Fragment } from 'react';
import { translate } from 'react-i18next';

import WBox from '../../../atoms/wbox/index';
import MultiStep from '../../../atoms/multiStep/index';
import ResultBox from './resultBox/index';
import SendWritable from './sendWritable/index';
import Request from '../request/index';
import PasswordSteps from './passwordSteps/index';
import styles from './send.css';

class Send extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActiveTabSend: true,
    };
  }

  refreshPage() {
    this.props.history.push(this.props.location.pathname);
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
              finalCallback={(...args) => this.refreshPage(...args)}>
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
