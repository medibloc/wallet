import React from 'react';
// import { FontIcon } from '../fontIcon';
import backButton from '../../assets/images/icons/backButton@2x.png';
import styles from './multiStep.css';

const MultiStepNav = ({ steps, showBackButton,
  current, prevStep, prevPage }) => {
  // Checks if all titles are defined and showNav is not false
  const validateTitles = () => {
    const titlesAreValid = steps.reduce((acc, step) =>
      (acc && typeof step.props.title === 'string' && step.props.title.length > 0)
      , true);
    return titlesAreValid;
  };

  const backButtonFn = () => {
    if (current === 0) {
      prevPage();
    } else {
      prevStep();
    }
  };

  return (validateTitles() ?
    <div className={styles.navigation}>
      {
        showBackButton ?
          <a onClick={backButtonFn} className={`${styles.backButton} multistep-back`}>
            <img className={styles.icon} src={backButton} />
          </a> : null
      }
      <span className={styles.backButtonShadow}></span>
    </div> : <div className={styles.hidden}></div>);
};

export default MultiStepNav;
