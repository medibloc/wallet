import React from 'react';
import InlineSVG from 'svg-inline-react';
import { Input } from '../toolbox/inputs/input';

import eventAddress from '../../assets/images/icons/eventAddress.svg';
import styles from './eventRecipient.css';

class EventRecipient extends React.Component {
  render() {
    return (
      <Input
        autoFocus={this.props.autoFocus}
        parentclassname={`${this.props.parentclassname} ${styles.eventRecipient}`}
        error={this.props.error}
        placeholder={this.props.placeholder}
        label={this.props.label}
        title={this.props.title}
        theme={styles}
        value={this.props.value}
        onChange={this.props.onChange} >
        <div className={`${styles.eventAddressWrapper}`}>
          <div className={`${styles.eventAddress}`}>
            <InlineSVG
              onClick={() => this.props.toggleEventAddress()}
              src={eventAddress}/>
          </div>
        </div>
      </Input>
    );
  }
}

export default EventRecipient;

