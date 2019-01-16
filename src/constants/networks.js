import networks from '../../config/networks';

networks.default = networks[window.localStorage && window.localStorage.getItem('defaultNetwork')] || networks.testnet;
module.exports = networks;
