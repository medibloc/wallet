import React from 'react';
import { themr } from 'react-css-themr';
import { Button as ToolBoxButton } from 'react-toolbox/lib/button';
import InlineSVG from 'svg-inline-react';
import arrowBlackButtonTheme from './css/arrowBlackButton.css';
import arrowBlueButtonTheme from './css/arrowBlueButton.css';
import choiceButtonTheme from './css/choiceButton.css';
import primaryButtonTheme from './css/primaryButton.css';
import secondaryButtonTheme from './css/secondaryButton.css';
import secondaryBlueButtonTheme from './css/secondaryBlueButton.css';
import secondaryLightButtonTheme from './css/secondaryLightButton.css';
import whiteArrow from '../../../../assets/images/icons/whiteArrow.svg';

class TBArrowBlackButton extends React.Component {
  render() {
    return (<ToolBoxButton
      {...this.props}
      ripple={false}
      theme={this.props.theme}>
      <div className={`${arrowBlackButtonTheme.arrowWrapper}`}>
        <InlineSVG className={`${arrowBlackButtonTheme.arrow}`} src={whiteArrow}/>
      </div>
    </ToolBoxButton>);
  }
}

class TBArrowBlueButton extends React.Component {
  render() {
    return (<ToolBoxButton
      {...this.props}
      ripple={false}
      theme={this.props.theme}>
      <div className={`${arrowBlueButtonTheme.arrowWrapper}`}>
        <InlineSVG className={`${arrowBlueButtonTheme.arrow}`} src={whiteArrow}/>
      </div>
    </ToolBoxButton>);
  }
}

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

class TBSecondaryButton extends React.Component {
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

const ArrowBlackButton = themr('arrowBlackButton', arrowBlackButtonTheme)(TBArrowBlackButton);
const ArrowBlueButton = themr('arrowBlueButton', arrowBlueButtonTheme)(TBArrowBlueButton);
const Button = themr('button', secondaryBlueButtonTheme)(TBSecondaryBlueButton);
const ChoiceButton = themr('choiceButton', choiceButtonTheme)(TBChoiceButton);
const PrimaryButton = themr('importantButton', primaryButtonTheme)(TBPrimaryButton);
const SecondaryButton = themr('secondaryButton', secondaryButtonTheme)(TBSecondaryButton);
const SecondaryLightButton = themr('lightButton', secondaryLightButtonTheme)(TBSecondaryLightButton);

export { ArrowBlackButton, ArrowBlueButton, Button,
  ChoiceButton, PrimaryButton, SecondaryButton, SecondaryLightButton };
export default Button;
