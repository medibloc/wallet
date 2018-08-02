import { chunk } from 'lodash';
import React from 'react';
import styles from './passphrasebox.css';

const PassphraseBox = ({ className, missing, passphrase, words }) => (
  <div className={`${styles.passphraseBox} ${className}`}>
    {
      chunk(words || passphrase.split(' '), 4).map((arr, i1) => (
        <div className={`${styles.row}`} key={i1}>
          {arr.map((word, i2) => {
            const index = (i1 * 4) + i2;
            return (
              (missing && missing.includes(index)) ?
                <span className={(index === missing[0]) ?
                  `${styles.boxFocus}` : null} key={i2}>
                  <div className={`${styles.number}`}>
                    <small>{index + 1}</small>
                  </div>
                  <div className={(index === missing[0]) ?
                    `${styles.wordFocus}` : `${styles.word}`}>
                    <h6/>
                  </div>
                </span> :
                <span key={i2}>
                  <div className={`${styles.number}`}>
                    <small>{index + 1}</small>
                  </div>
                  <div className={`${styles.word}`}>
                    <h6>{word}</h6>
                  </div>
                </span>
            );
          })}
        </div>
      ))
    }
  </div>
);

export default PassphraseBox;
