import React from 'react';
import AutoVestingStep from './autoVestingStep';
import MultiStep from '../../atoms/multiStep/index';
import NotEnoughMed from '../notEnoughMed';
import VotePasswordStep from '../votePasswordStep';
import BN from '../../../utils/bn';
import { addMed, subMed, fromRawMed } from '../../../utils/med';
import { BANDWIDTH_USED_TX, MIN_VESTING_TO_VOTE } from '../../../constants/bandwidth';
import styles from './vote.css';

class Vote extends React.Component {
  constructor(props) {
    super(props);
    const account = props.account;
    if (BN.lt(account.vesting, MIN_VESTING_TO_VOTE)) { // check balance
      if (BN.lt(addMed(account.balance, account.vesting),
        addMed(MIN_VESTING_TO_VOTE))) { // not enough med
        this.state = {
          notEnoughMed: true,
          showAutoVesting: false,
          vestingAmount: 0,
        };
      } else {
        const diff = subMed(MIN_VESTING_TO_VOTE, account.vesting);
        const avail = subMed(account.vesting, account.bandwidth);
        const vestingAmount = BN.lt(addMed(diff, avail), BANDWIDTH_USED_TX) ?
          BANDWIDTH_USED_TX : diff;
        if (BN.lt(account.balance, vestingAmount)) { // not enough med
          this.state = {
            notEnoughMed: true,
            showAutoVesting: false,
            vestingAmount: 0,
          };
        }
        this.state = { // need more vesting
          notEnoughMed: false,
          showAutoVesting: true,
          vestingAmount: fromRawMed(vestingAmount),
        };
      }
    } else { // check bandwidth
      const avail = subMed(account.vesting, account.bandwidth);
      if (BN.lt(avail, BANDWIDTH_USED_TX)) { // need more vesting
        this.state = {
          notEnoughMed: false,
          showAutoVesting: true,
          vestingAmount: fromRawMed(subMed(MIN_VESTING_TO_VOTE, avail)),
        };
      } else { // no need vesting
        this.state = {
          notEnoughMed: false,
          showAutoVesting: false,
          vestingAmount: 0,
        };
      }
    }
  }

  refreshPage() {
    this.props.history.push(this.props.location.pathname);
  }

  render() {
    if (this.state.notEnoughMed) {
      return (<NotEnoughMed closePopUp={() => this.props.closePopUp()}/>);
    }

    return (
      <MultiStep
        key='vote'
        className={styles.wrapper}
        finalCallback={(...args) => this.refreshPage(...args)}>
        <AutoVestingStep
          closePopUp={() => this.props.closePopUp()}
          showAutoVesting={this.state.showAutoVesting}
          vestingAmount={this.state.vestingAmount}/>
        <VotePasswordStep
          {...this.props}/>
      </MultiStep>
    );
  }
}

export default Vote;
