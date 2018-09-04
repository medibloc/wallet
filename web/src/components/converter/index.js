import React from 'react';
// import liskServiceApi from '../../utils/api/liskService';
import { Input } from '../toolbox/inputs/input';

import styles from './converter.css';

class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MED: {
        USD: '0',
        WON: '0',
      },
      // 0 index is active one
      currencies: ['USD', 'WON'],
    };
    // this.updateData();
  }

  componentDidMount() {
    // TODO: get from getPriceTicker
    this.setState({ MED: { USD: '0.01', WON: '10' } });
  }

  // updateData() {
  //   liskServiceApi.getPriceTicker().then((response) => {
  //     this.setState({ ...response });
  //   }).catch((error) => {
  //     this.setState({ error });
  //   });
  // }
  /*
   * It swaping clicked currency with active currency on index 0
   */
  selectActive(currency) {
    const currencyIndex = this.state.currencies.indexOf(currency);
    if (currencyIndex !== 0) {
      const currencies = this.state.currencies;

      currencies.push(currencies.shift(currencies[currencyIndex]));
      this.setState({ currencies });
    }
  }

  render() {
    const { MED, currencies } = this.state;
    const price = this.props.error ?
      (0).toFixed(2) : (this.props.value * MED[currencies[0]]).toFixed(2);

    const currenciesObjects = currencies.map((currency, key) =>
      (<div
        key={`${currency}-${key}`}
        className={`${styles.convertElem} converted-price`}
        // eslint-disable-next-line
        onClick={() => { this.selectActive(currency); }}>{currency}</div>)
    );
    // putting <div>|</div> inbetween array objects
    const intersperse = currenciesObjects
      .reduce((a, v, key) => [...a, v, <div key={key}>|</div>], []) // eslint-disable-line
      .slice(0, -1);
    return (
      <Input
        autoFocus={this.props.autoFocus}
        parentclassname={this.props.parentclassname}
        error={this.props.error}
        placeholder={this.props.placeholder}
        label={this.props.label}
        title={this.props.title}
        theme={styles}
        value={this.props.value}
        onChange={this.props.onChange} >
        <div className={styles.convertorWrapper}>
          {this.props.value !== '' && this.state.MED[currencies[0]] ?
            <div className={this.props.error ? `${styles.convertorErr} convertorErr` : `${styles.convertor} convertor`}>
              <div className={`${styles.convertElem} converted-price`}>~ {price}</div>
              {intersperse}
            </div>
            : <div />
          }
        </div>
      </Input>
    );
  }
}

export default Converter;

