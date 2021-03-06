import React from 'react';
import moment from 'moment';
import Tooltip from 'react-toolbox/lib/tooltip';
import theme from 'react-toolbox/lib/tooltip/theme.css';
import { translate } from 'react-i18next';
import i18n from '../../../i18n';

/**
 * Remove an array of keys from object
 * @param {object} obj - an object that we want to remove some properties from that
 * @param {array} arr - list of name of properties that we want to remove them
 * @return {object} list - an object that hasn't any of items in arr
 */
const _remove = (obj, arr) => {
  let list = []; // eslint-disable-line
  const temp = Object.keys(obj)
    .filter(key => !arr.includes(key));
  temp.forEach((item) => {
    list[item] = obj[item];
  });
  return list;
};

const Div = (props) => {
  const rest = _remove(props, ['theme', 'tooltip', 'tooltipDelay', 'tooltipHideOnClick']);
  return (<div {...rest} />);
};

/**
 * This wrapper add theme style and default delay, and disable tooltip when `tooltip` is empty.
 * @param props
 */
export const TooltipWrapper = (props) => {
  const Tip = Tooltip(Div); // eslint-disable-line
  if (props.tooltip) {
    return (<Tip
      tooltipPosition="top"
      tooltipDelay={350}
      {...props}
      theme={Object.assign({}, theme, props.theme || {})} />);
  }
  return <Div {...props} />;
};

export const Time = translate()((props) => {
  moment.locale(i18n.language);
  const time = moment(new Date(parseInt(props.label, 10)));
  return <span>{time.fromNow(true)}</span>;
});

export const DateFromTimestamp = translate()((props) => {
  moment.locale(i18n.language);
  const day = moment(new Date(parseInt(props.time, 10)));
  const now = moment(new Date());
  const diff = Math.floor((now - day) / 60000);
  if (diff < 0) return (<span/>);
  else if (diff < 60) return (<span>{`${diff} Min ago`}</span>);
  else if (diff < 1440) return (<span>{`${Math.floor(diff / 60)} Hr ago`}</span>);
  return (<span>{day.format('ll')}</span>);
});

export const TimeFromNow = translate()((props) => {
  moment.locale(i18n.language);
  const day = moment(new Date(parseInt(props.time, 10)));
  return (<span>{moment(day).fromNow()}</span>);
});

export const DateAndTimeFromTimestamp = translate()((props) => {
  moment.locale(i18n.language);
  const day = moment(new Date(parseInt(props.time, 10)));
  return (<span>{day.format('lll')}</span>);
});

export const TimeFromTimestamp = translate()((props) => {
  moment.locale(i18n.language);
  const day = moment(new Date(parseInt(props.time, 10)));
  return (<span>{day.format('LTS')}</span>);
});

export const TooltipTime = translate()((props) => {
  moment.locale(i18n.language);
  const time = moment(new Date(parseInt(props.label, 10)));
  return (<TooltipWrapper tooltip={time.format('LL LTS')} >
    <Time label={props.label} lang={props.lang}></Time>
  </TooltipWrapper>);
});
