import React from 'react';
import { themr } from 'react-css-themr';
import { Input as TBInput } from 'react-toolbox/lib/input';
import inputPrimaryTheme from './css/primaryInput.css';
import inputPassphraseTheme from './css/passphraseInput.css';

class ToolBoxPrimaryInput extends React.Component {
  render() {
    return (
      <div className={`${inputPrimaryTheme.inputWrapper} ${this.props.parentclassname}`}>
        <h6>{this.props.title}</h6>
        <TBInput
          {...this.props}
          theme={this.props.theme}
        />
      </div>
    );
  }
}

class ToolBoxPassphraseInput extends React.Component {
  render() {
    return (
      <TBInput
        {...this.props}
        theme={this.props.theme}
      />
    );
  }
}

const Input = themr('input', inputPrimaryTheme)(ToolBoxPrimaryInput);
const PassphraseInput = themr('passphraseInput', inputPassphraseTheme)(ToolBoxPassphraseInput);

export { Input, PassphraseInput };
export default Input;
