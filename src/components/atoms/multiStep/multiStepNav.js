import React from 'react';
import backButton from '../../../assets/images/icons/backButton.png';
import styles from './multiStep.css';

const MultiStepNav = ({ hideBackButton, steps, showBackButton,
  current, prevStep, prevPage, forceToAppear }) => {
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

  return (validateTitles() && (forceToAppear || (!hideBackButton && showBackButton)) ?
    <div className={styles.navigation}>
      <a onClick={backButtonFn} className={`${styles.backButton} multistep-back`}>
        <img className={styles.icon} src={backButton} />
      </a>
      <span className={styles.backButtonShadow} />
    </div> : <div className={styles.hidden} />);
};

export default MultiStepNav;
