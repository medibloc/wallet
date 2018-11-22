import React from 'react';
import InlineSVG from 'svg-inline-react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import { divMed, mulMed } from '../../../../utils/med';
import CandidateBadge from './candidateBadge';
import MedAmount from '../../../atoms/medAmount';
import VoteCheckbox from '../../../../assets/images/icons/inactive.svg';
import styles from './candidateRow.css';

class CandidateRow extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  // shouldComponentUpdate(nextProps) {
  //   return nextProps.value.id !== this.props.value.id;
  // }

  render() {
    const { candidate, isVoted, toggleVoting, rank, t, totalVotes } = this.props;
    // const showBPInfo = !onClick ? (() => {}) : () => this.props.onClick(this.props);
    return (
      <div className={`${grid.row} ${styles.rows} transactions-row`}>
        <div className={`${styles.alignCenter} ${grid['col-sm-1']} transactions-cell`}>
          <div>
            <CandidateBadge rank={rank} />
          </div>
        </div>
        <div className={`${styles.text} ${styles.leftText} ${grid['col-sm-2']} transactions-cell`}>
          <div>
            <span> {candidate.alias} </span>
          </div>
        </div>
        <div className={`${styles.text} ${styles.leftText} ${grid['col-sm-1']} transactions-cell`}>
          <div className={`${styles.active}`}>
            <span> {t('active')} </span>
          </div>
        </div>
        <div className={`${styles.text} ${styles.leftText} ${grid['col-sm-1']} transactions-cell`}>
          <div>
            <span> {`${divMed(mulMed(candidate.votePower, 100), totalVotes)}`}{'%'} </span>
          </div>
        </div>
        <div className={`${styles.text} ${styles.leftText} ${grid['col-sm-2']} transactions-cell`}>
          <div>
            <MedAmount roundTo={0}
              val={candidate.votePower}/>
          </div>
        </div>
        <div className={`${styles.text} ${styles.middleText} ${grid['col-sm-3']} transactions-cell`}>
        </div>
        <div className={`${styles.alignCenter} ${grid['col-sm-2']} transactions-cell`}>
          <div className={`${styles.voteCheckboxWrapper} ${isVoted ? styles.voted : styles.notVoted}`}
            onClick={toggleVoting}>
            <InlineSVG
              src={VoteCheckbox}/>
          </div>
        </div>
      </div>
    );
  }
}

export default CandidateRow;
