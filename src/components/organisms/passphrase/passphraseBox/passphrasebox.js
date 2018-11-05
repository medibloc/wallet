import { translate } from 'react-i18next';
import chunk from 'lodash.chunk';
import React from 'react';
import styles from './passphrasebox.css';

const PassphraseBox = ({ className, missing, passphrase, words }) => (
  <div className={`${styles.passphraseBox} ${className}`}>
    {
      chunk(words || passphrase.split(' '), 4).map((arr, i1) => (
        <div className={`${styles.row}`} key={`${arr}-${i1}`}>
          {arr.map((word, i2) => {
            const i = (i1 * 4) + i2;
            return (
              (missing && missing.includes(i)) ?
                <span className={(i === missing[0]) ?
                  `${styles.boxFocus}` : null} key={`${word}-${i2}`}>
                  <div className={`${styles.number}`}>
                    <small data-pseude-content={i + 1} />
                  </div>
                  <div className={(i === missing[0]) ?
                    `${styles.wordFocus}` : `${styles.word}`}>
                    <h6/>
                  </div>
                </span> :
                <span key={`${word}-${i2}`}>
                  <div className={`${styles.number}`}>
                    <small data-pseude-content={i + 1} />
                  </div>
                  <div className={`${styles.word}`}>
                    <h6>{word}{' '}</h6>
                  </div>
                </span>
            );
          })}
        </div>
      ))
    }
  </div>
);

export default translate()(PassphraseBox);
