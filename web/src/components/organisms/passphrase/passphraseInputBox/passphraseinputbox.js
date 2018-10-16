import { chunk } from 'lodash';
import { translate } from 'react-i18next';
import React from 'react';
import { PassphraseInput } from '../../../atoms/toolbox/inputs/input';
import styles from './passphraseinputbox.css';
import { isValidPassphrase,
  getPassphraseValidationErrors } from '../../../../../../common/src/utils/passphrase';
import keyCodes from '../../../../constants/keyCodes';

class PassphraseInputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputType: 'text',
      partialPassphraseError: [],
      focus: -1,
    };
  }

  setFocusedField(field) {
    this.setState({ focus: field });
  }

  handleValueChange(index, value) {
    let insertedValue = value.trim().replace(/\W+/g, ' ');
    const insertedValueAsArray = insertedValue.split(' ');
    let passphrase = this.props.value.split(' ');

    if (insertedValueAsArray.length > 1) {
      for (let i = 0; i < 12; i++) {
        if (insertedValueAsArray[i]) {
          passphrase[i] = insertedValueAsArray[i];
          this.setState({ focus: i });
        }
      }
      insertedValue = insertedValueAsArray[index];
    }

    passphrase[index] = insertedValue;
    passphrase = passphrase.join(' ');

    let error;

    this.setState({ partialPassphraseError: [] });
    if (!passphrase) {
      error = this.props.t('Required');
    } else if (!isValidPassphrase(passphrase)) {
      error = this.getPassphraseValidationError(passphrase);
    }
    this.props.onChange(passphrase, error);
  }

  // eslint-disable-next-line class-methods-use-this
  getPassphraseValidationError(passphrase) {
    const { partialPassphraseError, validationError } = getPassphraseValidationErrors(passphrase);
    this.setState({ partialPassphraseError });

    return validationError;
  }

  keyAction({ event, value, index }) {
    if (event.which === keyCodes.space || event.which === keyCodes.arrowRight) {
      event.preventDefault();
      this.setState({ focus: index + 1 });
    }

    if ((event.which === keyCodes.delete && !value) || event.which === keyCodes.arrowLeft) {
      this.setState({ focus: index - 1 });
    }
  }

  setFocused() {
    if (this.props.onFocus) this.props.onFocus();
    this.setState({ isFocused: true });
  }

  focusAndPaste(value) {
    this.setFocused();
    this.handleValueChange(0, value);
  }
  // (this.state.focus === i ? `${styles.focus}` : null)
  render() {
    const value = this.props.value.split(' ');
    return (
      <div className={`${styles.passphraseInputBoxWrapper}`}>
        <div className={`${styles.passphraseInputBox} ${this.props.className}`}>
          {chunk([...Array(12)], 4).map((arr, i1) =>
            <div className={`${styles.row}`} key={`${arr}-${i1}`}>
              {arr.map((word, i2) => {
                const i = (i1 * 4) + i2;
                return (
                  <span key={`${word}-${i2}`}>
                    <div className={`${this.state.focus === i ? styles.focusNumber : styles.number}`}>
                      <small>{i + 1}</small>
                    </div>
                    <PassphraseInput
                      autoFocus={this.state.focus === i}
                      className={`${this.props.className} ${styles.partial}
                        ${this.state.partialPassphraseError[i] ? styles.error : ''}`}
                      value={value[i] || ''}
                      type={this.state.inputType}
                      theme={this.props.theme}
                      autoComplete='off'
                      onFocus={(e) => {
                        const val = e.target.value;
                        e.target.value = '';
                        e.target.value = val;

                        this.setFocusedField(i);
                      }}
                      onBlur={() => this.setFocusedField(null)}
                      onChange={(val) => {
                        this.handleValueChange(i, val);
                      }}
                      onKeyDown={(event) => {
                        this.keyAction({ event, value: value[i], index: i });
                      }}
                      index={i}
                    />
                  </span>
                );
              })}
            </div>,
          )}
        </div>
        <div className={styles.errorMessageWrapper}>
          <span className={styles.errorMessage}>{this.props.error}</span>
        </div>
      </div>
    );
  }
}

export default translate()(PassphraseInputBox);
