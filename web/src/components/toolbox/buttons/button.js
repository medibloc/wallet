import React from 'react';
import { themr } from 'react-css-themr';
import { Button as ToolBoxButton } from 'react-toolbox/lib/button';
import choiceButtonTheme from './css/choiceButton.css';
import primaryButtonTheme from './css/primaryButton.css';
import secondaryBlueButtonTheme from './css/secondaryBlueButton.css';
import secondaryLightButtonTheme from './css/secondaryLightButton.css';

class TBChoiceButton extends React.Component {
  render() {
    return <ToolBoxButton
      {...this.props}
      ripple={false}
      theme={this.props.theme}/>;
  }
}

class TBPrimaryButton extends React.Component {
  render() {
    return <ToolBoxButton
      {...this.props}
      ripple={false}
      theme={this.props.theme}/>;
  }
}

class TBSecondaryBlueButton extends React.Component {
  render() {
    return <ToolBoxButton
      {...this.props}
      ripple={false}
      theme={this.props.theme}/>;
  }
}

class TBSecondaryLightButton extends React.Component {
  render() {
    return <ToolBoxButton
      {...this.props}
      ripple={false}
      theme={this.props.theme}/>;
  }
}

const Button = themr('button', secondaryBlueButtonTheme)(TBSecondaryBlueButton);
const ChoiceButton = themr('choiceButton', choiceButtonTheme)(TBChoiceButton);
const PrimaryButton = themr('importantButton', primaryButtonTheme)(TBPrimaryButton);
const SecondaryLightButton = themr('lightButton', secondaryLightButtonTheme)(TBSecondaryLightButton);

export { Button, ChoiceButton, PrimaryButton, SecondaryLightButton };
export default Button;
