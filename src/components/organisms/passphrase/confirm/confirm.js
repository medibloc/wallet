import React from 'react';
import fillWordsList from 'bip39/wordlists/english.json';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import Box from '../../../atoms/box/index';
import Choice from './choice';
import PassphraseBox from '../passphraseBox/passphrasebox';
import { PrimaryButton } from '../../../atoms/toolbox/buttons/button';
import styles from './confirm.css';
import { extractAddressFromMnemonic } from '../../../../utils/account';

class Confirm extends React.Component {
  constructor() {
    super();
    const totalStep = 2;
    this.state = {
      answers: new Array(totalStep),
      isConfirmed: false,
      formStatus: 'clean',
      missing: [],
      numberOfOptions: 4,
      showError: false,
      totalStep,
      words: [],
    };
  }

  componentDidMount() {
    // this.props.randomIndex is used in unit teasing
    this.resetForm.call(this);
    this.address = this.getAddress();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  updateState(answers) {
    switch (this.formStatus(answers)) {
      case 'continue': {
        const newmissing = this.state.missing;
        newmissing.shift();
        this.setState({
          answers,
          formStatus: 'continue',
          missing: newmissing,
        });
        break;
      }
      case 'valid': {
        this.setState({
          answers,
          formStatus: 'valid',
          missing: [],
        });
        this.confirmed();
        break;
      }
      case 'invalid': {
        this.setState({ formStatus: 'invalid', answers });
        this.timeout = setTimeout(() => {
          this.resetForm.call(this);
        }, 800);
        break;
      }
      default: {
        this.setState({ answers });
      }
    }
  }

  onSubmitAnswer(e) {
    const { answers, missing, totalStep } = this.state;
    const index = totalStep - missing.length;
    const newAnswers = [...answers];
    newAnswers[index] = {
      value: e.nativeEvent.target.value,
      validity: e.nativeEvent.target.value === this.state.words[missing[0]],
    };

    this.updateState(newAnswers);
  }

  // eslint-disable-next-line class-methods-use-this
  formStatus(answers) {
    if (!answers.reduce((acc, current) => (acc && current !== undefined), true) &&
      answers.reduce((acc, current) =>
        (acc && ((current === undefined) || (current && current.validity))), true)) {
      return 'continue';
    }
    if (answers.reduce((acc, current) => (acc && current && current.validity), true)) {
      return 'valid';
    }
    return 'invalid';
  }

  confirmed() {
    setTimeout(() => {
      this.setState({ isConfirmed: true });
    }, 100);
  }

  resetForm() {
    const words = this.props.mnemonic.match(/\w+/g);

    /**
     * Returns a random index which doesn't exist in list
     *
     * @param {Array} list - The list of existing random Indexes
     * @returns {Number} random index between 0 and length of words
     */
    const randomIndex = (list) => {
      let index;
      do {
        index = Math.floor(Math.random() * words.length);
      }
      while (list.includes(index));
      return index;
    };

    /**
     * Returns a number of random indexes within 0 and the length of words
     * @param {Number} qty - the number of random indexes required
     * @returns {Array} the list of random indexes
     */
    const chooseRandomWords = (qty) => {
      const missing = [];

      for (let i = 0; i < qty; i++) {
        missing.push(randomIndex(missing));
      }

      return missing.sort((a, b) => a > b);
    };

    const missing = chooseRandomWords(2).sort((a, b) => a - b);
    const wordOptions = this.assembleWordOptions(words, missing);

    this.setState({
      answers: new Array(this.state.totalStep),
      formStatus: 'clean',
      missing,
      wordOptions,
      words,
    });
  }

  assembleWordOptions(passphraseWords, missingWords) {
    const getRandomWord = () => {
      let rand;

      do {
        rand = Math.floor(Math.random() * 2048);
      }
      while (passphraseWords.includes(fillWordsList[rand]));

      return fillWordsList[rand];
    };

    const mixWithMissingWords = (options) => {
      options.forEach((list, listIndex) => {
        const rand = Math.floor(Math.random() * 0.99 * list.length);
        list[rand] = passphraseWords[missingWords[listIndex]];
      });

      return options;
    };

    const wordOptions = [];
    for (let i = 0; i < missingWords.length; i++) {
      wordOptions[i] = [];
      for (let j = 0; j < this.state.numberOfOptions; j++) {
        wordOptions[i][j] = getRandomWord();
      }
    }

    return mixWithMissingWords(wordOptions);
  }

  getAddress() {
    return extractAddressFromMnemonic(this.props.mnemonic);
  }

  render() {
    const { t, nextStep, mnemonic } = this.props;
    const { isConfirmed, formStatus,
      missing, totalStep, wordOptions, words } = this.state;
    const errorTitleVisibility = (formStatus === 'invalid') ? styles.visible : '';

    return (<Box className={`${styles.confirm}`}>
      <header>
        <h2>{t('Select the missing words to confirm')}</h2>
      </header>
      <PassphraseBox
        className={`${styles.passphrase}`}
        missing={missing}
        words={words} />
      <Choice
        step={(totalStep - missing.length) + 1}
        totalStep={totalStep}
        wordOptions={wordOptions}
        onSubmitAnswer={e => this.onSubmitAnswer(e)} />
      <PrimaryButton
        label={t('Confirm')}
        disabled={!isConfirmed}
        className={`${styles.nextButton}`}
        onClick={() => nextStep({ mnemonic })}/>
      <div className={`${styles.errorTitle}`}>
        <h6 className={`${errorTitleVisibility}`}>
        </h6>
      </div>
    </Box>);
  }
}

export default withRouter(translate()(Confirm));
