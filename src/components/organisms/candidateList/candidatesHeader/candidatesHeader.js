import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import styles from './candidatesHeader.css';

const CandidatesHeader = ({ t }) => (
  <div className={`${grid.row}  ${styles.headerWrapper}`} id="candidatesHeader">
    <div className={`${styles.text} ${styles.middleText} ${grid['col-sm-1']} ${styles.header} candidates-header`}>
      {t('Rank')}
    </div>
    <div className={`${styles.text} ${styles.leftText} ${grid['col-sm-2']} ${styles.header} candidates-header`}>
      {t('Account')}
    </div>
    <div className={`${styles.text} ${styles.leftText} ${grid['col-sm-1']} ${styles.header} candidates-header`}>
      {t('Status')}
    </div>
    <div className={`${styles.text} ${styles.leftText} ${grid['col-sm-1']} ${styles.header} candidates-header`}>
      {t('Weight')}
    </div>
    <div className={`${styles.text} ${styles.leftText} ${grid['col-sm-2']} ${styles.header} candidates-header`}>
      {t('Votes')}
    </div>
    <div className={`${styles.text} ${styles.middleText} ${grid['col-sm-3']} ${styles.header} candidates-header`}>
    </div>
    <div className={`${styles.text} ${styles.middleText} ${grid['col-sm-2']} ${styles.header} candidates-header`}>
      {t('Voting status')}
    </div>
  </div>);

export default CandidatesHeader;
