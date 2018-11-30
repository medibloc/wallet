import React from 'react';
import AutoVesting from '../../autoVesting';

class AutoVestingStep extends React.Component {
  render() {
    if (!this.props.showAutoVesting) {
      this.props.nextStep({
        autoVesting: false,
      });
    }

    return (
      <AutoVesting
        closePopUp={() => this.props.closePopUp()}
        nextStep={() => this.props.nextStep({
          autoVesting: true,
          vestingAmount: this.props.vestingAmount,
        })}
        vestingAmount={this.props.vestingAmount}/>
    );
  }
}

export default AutoVestingStep;
