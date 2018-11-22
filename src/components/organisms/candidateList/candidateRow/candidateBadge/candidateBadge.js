import React from 'react';
import InlineSVG from 'svg-inline-react';
import Badge from '../../../../../assets/images/icons/candidateBadge.svg';
import styles from './candidateBadge.css';

const CandidateBadge = ({ rank }) => (
  <div className={`${styles.candidateBadgeWrapper}`}>
    <div className={`${styles.candidateBadge}`}>
      { rank < 100 ?
        <InlineSVG className={`${styles.badge} ${rank < 22 ? styles.top : null}`}
          src={Badge} /> : null
      }
      <div className={`${styles.rankWrapper}`}>
        <span>{rank}</span>
      </div>
    </div>
  </div>);

export default CandidateBadge;
