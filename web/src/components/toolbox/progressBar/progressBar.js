import React from 'react';
import { themr } from 'react-css-themr';
import ToolBoxProgressBar from 'react-toolbox/lib/progress_bar';
// import circularProgressBarTheme from './css/circularProgressBar.css';
import progressBarTheme from './css/progressBar.css';

// class TBCircularProgressBar extends React.Component {
//   render() {
//     return (
//       <ToolBoxProgressBar
//         {...this.props}
//         mode={'indeterminate'}
//         multicolor
//         theme={this.props.theme}
//         type={'circular'}
//       />
//     );
//   }
// }

class TBProgressBar extends React.Component {
  render() {
    return (
      <ToolBoxProgressBar
        {...this.props}
        theme={this.props.theme}
      />
    );
  }
}

// const CircularProgressBar = themr('circularProgressBarTheme',
//   circularProgressBarTheme)(TBCircularProgressBar);
const ProgressBar = themr('progressBar', progressBarTheme)(TBProgressBar);

export {
  // CircularProgressBar,
  ProgressBar,
};
export default ProgressBar;
