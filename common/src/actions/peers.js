import { client } from 'medjs';
import actionTypes from '../constants/actions';
import networks from '../constants/networks';

const peerSet = (data, config) => ({
  data: Object.assign({
    passphrase: data.passphrase,
    address: data.address,
    activePeer: client(config.nodes),
    noSavedAccounts: data.noSavedAccounts,
    options: { code: config.code },
  }),
  type: actionTypes.activePeerSet,
});

const pickMainnetNode = () => {
  const nodes = [
    'http://localhost:9921',
  ];
  return nodes;
};

const pickTestnetNode = () => {
  const nodes = [
    'http://localhost:9921',
  ];
  return nodes;
};

/**
 * Returns required action object to set
 * the given peer data as active peer
 * This should be called once in login page
 *
 * @param {Object} data - Active peer data and the passphrase of account
 * @returns {Object} Action object
 */
export const activePeerSet = data =>
  (dispatch) => {
    const config = data.network || {};

    if (config.code === networks.mainnet.code) {
      config.nodes = pickMainnetNode();
    }

    if (config.code === networks.mainnet.code) {
      config.nodes = pickTestnetNode();
    }

    if (config.custom) {
      config.nodes = ['http://localhost:9921'];
      dispatch(peerSet(data, config));
    } else {
      dispatch(peerSet(data, config));
    }
  };


/**
 * Returns required action object to partially
 * update the active peer
 *
 * @param {Object} data - Active peer data
 * @returns {Object} Action object
 */
export const activePeerUpdate = data => ({
  data,
  type: actionTypes.activePeerUpdate,
});
