import React from 'react';
import { IconButton as ToolBoxIconButton } from 'react-toolbox/lib/button';

// this component is unnecessary and it need to be deleted
class IconButton extends React.Component {
  render() {
    return <ToolBoxIconButton
      {...this.props}
      ripple={false}
      theme={this.props.theme} />;
  }
}

export default IconButton;
