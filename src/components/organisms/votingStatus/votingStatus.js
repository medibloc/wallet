import React from 'react';
import MedAmount from '../../atoms/medAmount';
import WBox from '../../atoms/wbox/index';
import styles from './votingStatus.css';

class VotingStatus extends React.Component {
  render() {
    const { account, t, voted } = this.props;
    return <WBox className={styles.wrapper}>
      <div className={styles.title}>
        <h5>{t('My votes')}</h5>
      </div>
      <div className={styles.voteNumWrapper}>
        <h6>
          <span className={styles.votedNum}>
            {t('{{votedNum}} vote{{plural}}', {
              votedNum: voted.length,
              plural: voted.length > 1 ? 's' : null,
            })}{t(' ')}
          </span>
          <span className={styles.remainedNum}>
            {t('({{remainedNum}} left)', { remainedNum: 15 - voted.length })}
          </span>
        </h6>
      </div>
      <div className={styles.votingPowerWrapper}>
        <h6>
          <span className={styles.votingPowerTitle}>{t('Voting power: ')}</span>
          <MedAmount roundTo={2}
            val={account.vesting}/>
        </h6>
      </div>
    </WBox>;
  }
}

export default VotingStatus;
