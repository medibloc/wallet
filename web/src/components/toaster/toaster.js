import React, { Component } from 'react';
import Snackbar from 'react-toolbox/lib/snackbar';
import styles from './toaster.css';

class Toaster extends Component {
  constructor() {
    super();
    this.state = {
      hidden: {},
    };
  }

  hideToast(toast) {
    setTimeout(() => {
      this.props.hideToast(toast);
      this.setState({ hidden: { ...this.state.hidden, [toast.index]: false } });
    }, 100);
    this.setState({ hidden: { ...this.state.hidden, [toast.index]: true } });
  }

  render() {
    return (<span>
      {this.props.toasts.map(toast => (
        <Snackbar
          active={!!toast.label && !this.state.hidden[toast.index]}
          key={toast.index}
          label={toast.label}
          timeout={3000}
          className={`toast ${styles.toast} ${styles[toast.type]} ${styles[`index-${toast.index}`]}`}
          onTimeout={() => this.hideToast(toast)}
        />
      ))}
    </span>);
  }
}

export default Toaster;
