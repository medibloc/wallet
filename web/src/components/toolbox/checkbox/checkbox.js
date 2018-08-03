import React from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';
import { themr } from 'react-css-themr';
import checkboxTheme from './checkbox.css';

// const TBCheckBox = props => <Checkbox
//   {...props}
//   theme={props.theme}
//   innerRef={(ref) => {
//     if (ref !== null && props.shouldfocus) {
//       ref.focus();
//     }
//   }}
// />;

class TBCheckBox extends React.Component {
  constructor() {
    super();

    this.state = {
      check: true,
    };
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  render() {
    return (
      <Checkbox
        {...this.props}
        theme={this.props.theme}
        checked={this.state.check}
        onChange={() => this.handleChange('check')}
      />
    );
  }
}

export default themr('TBCheckbox', checkboxTheme)(TBCheckBox);
