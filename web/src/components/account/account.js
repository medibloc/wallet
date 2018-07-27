import React from 'react';
import { FontIcon } from '../fontIcon';
import styles from './account.css';
import networks from '../../../../common/src/constants/networks';

/**
 * Contains some of the important and basic information about the account
 *
 * @param {object} props - include properties of component
 */

const Account = ({ peers, t }) => {
  const status = (peers.status && peers.status.online) ?
    <FontIcon className='online' value='checkmark' /> :
    <FontIcon className='offline' value='error' />;

  return (peers.data && peers.options.code !== networks.mainnet.code ?
    <section className={styles.peer}>
      <div className={`${styles.title} inner primary peer-network`}>{t(peers.data.options)} <span id="accountStatus" className={`${styles.status} status`}>{status}</span>
      </div>
    </section> :
    null
  );
};

/*
  <span className={`${styles.current} inner secondary peer`}>
    {peers.data.currentPeer}
    <span>:{peers.data.port}</span>
  </span>
 */
export default Account;
