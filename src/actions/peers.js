import { client } from 'medjs';
import mServer from '../utils/mServer/index';
import getNetwork from '../utils/getNetwork';
import actionTypes from '../constants/actions';

const peerSet = (data, config) => ({
  data: Object.assign({
    address: data.address,
    activePeer: client(config.nodes),
    chainId: config.chainId,
    encKey: data.encKey,
    mServer: mServer(config.mServerURL),
    networkCode: config.code,
    noSavedAccounts: data.noSavedAccounts,
  }),
  type: actionTypes.activePeerSet,
});

/**
 * Returns required action object to set
 * the given network code
 * This should be called once in login page
 *
 * @param {Object} data - network code
 * @returns {Object} Action object
 */
export const activePeerSet = data =>
  (dispatch) => {
    const networkCode = data.networkCode || 1; // testnet
    const config = getNetwork(networkCode);

    dispatch(peerSet(data, config));
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