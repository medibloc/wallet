import { client } from 'medjs';
import actionTypes from '../constants/actions';

const peerSet = (data, config) => ({
  data: Object.assign({
    address: data.address,
    activePeer: client(config.nodes),
    encKey: data.encKey,
    options: { code: config.code },
  }),
  type: actionTypes.activePeerSet,
});

const pickTestnetNode = () => ([
  'http://13.124.201.175:9921', 'http://localhost:9921',
]);

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

    config.nodes = pickTestnetNode();

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
