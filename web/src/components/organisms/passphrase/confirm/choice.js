import React from 'react';
import { ChoiceButton } from '../../../atoms/toolbox/buttons/button';
import styles from './choice.css';

const Choice = ({ step, totalStep, wordOptions, onSubmitAnswer }) => (
  wordOptions && (step <= totalStep) ?
    <div className={`${styles.choice}`}>
      {
        wordOptions[step - 1].map(word =>
          <ChoiceButton
            label={word}
            className={`${styles.word}`}
            key={`${word}-${step}`}
            value={word}
            onClick={onSubmitAnswer} />)
      }
    </div> : <div className={`${styles.choice}`} />);

export default Choice;
