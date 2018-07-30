import { chunk } from 'lodash';
import React from 'react';
import styles from './passphrasebox.css';

const PassphraseBox = ({ className, passphrase }) => (
  <div className={`${styles.passphraseBox} ${className}`}>
    {
      chunk(passphrase.split(' '), 4).map((arr, i1) => (
        <div className={`${styles.row}`} key={i1}>
          {arr.map((word, i2) => (
            <span key={i2}>
              <div className={`${styles.number}`}>
                <small>{(i1 * 4) + i2 + 1}</small>
              </div>
              <div className={`${styles.word}`}>
                <h6>{word}</h6>
              </div>
            </span>
          ))}
        </div>
      ))
    }
  </div>
);

export default PassphraseBox;
