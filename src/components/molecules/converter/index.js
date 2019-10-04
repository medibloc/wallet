import React, { Fragment } from 'react';
import { Input } from '../../atoms/toolbox/inputs/input';

import styles from './converter.css';

class Converter extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     MED: {
  //       USD: 0,
  //     },
  //     // 0 index is active one
  //     currencies: ['USD', 'WON'],
  //   };
  // }

  // componentDidMount() {
  //   const usdPrice = this.props.price;
  //   this.setState({ MED: { USD: usdPrice } });
  // }

  /*
   * It swaping clicked currency with active currency on index 0
   */
  // selectActive(currency) {
  //   const currencyIndex = this.state.currencies.indexOf(currency);
  //   if (currencyIndex !== 0) {
  //     const currencies = this.state.currencies;
  //
  //     currencies.push(currencies.shift(currencies[currencyIndex]));
  //     this.setState({ currencies });
  //   }
  // }

  render() {
    // const { MED, currencies } = this.state;
    // const price = this.props.error ?
    //   (0).toFixed(2) : (this.props.value * MED[currencies[0]]).toFixed(2);
    //
    // const currenciesObjects = currencies.map((currency, key) =>
    //   (<div
    //     key={`${currency}-${key}`}
    //     className={`${styles.convertElem} converted-price`}
    //     // eslint-disable-next-line
    //     onClick={() => { this.selectActive(currency); }}>{currency}</div>)
    // );
    // putting <div>|</div> inbetween array objects
    // const intersperse = currenciesObjects
    //   .reduce((a, v, key) => [...a, v, <div key={key}>|</div>], []) // eslint-disable-line
    //   .slice(0, -1);
    return (
      <Fragment>
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
        </Input>
        <div className={styles.feeWrapper}>
          Tx Fee : { this.props.fee } MED
        </div>
      </Fragment>
    );
  }
}

export default Converter;

