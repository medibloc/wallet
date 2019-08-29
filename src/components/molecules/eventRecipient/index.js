import React from 'react';
import { Input } from '../../atoms/toolbox/inputs/input';
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
      </Input>
    );
  }
}

export default EventRecipient;

