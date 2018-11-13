import React from 'react';
import tooltip from 'react-toolbox/lib/tooltip';
import omit from 'lodash.omit';
import { themr } from 'react-css-themr';
import tooltippedDivTheme from './tooltippedDiv.css';

function Div(props) {
  const rest = omit(props,
    ['theme', 'tooltip', 'tooltipDelay', 'tooltipHideOnClick']);
  return (<div {...rest} />);
}

const Tooltip = tooltip(Div);

class TooltippedDiv extends React.Component {
  render() {
    if (this.props.tooltip) {
      return (<Tooltip
        {...this.props}
        theme={this.props.theme}
      />);
    }
    return <Div {...this.props} />;
  }
}

export default themr('TooltippedDiv', tooltippedDivTheme)(TooltippedDiv);
