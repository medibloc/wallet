const networks = {
  mainnet: { // network name translation t('Mainnet');
    name: 'Mainnet',
    code: 0,
    nodes: ['http://localhost:9921'],
  },
  testnet: { // network name translation t('Testnet');
    name: 'Testnet',
    testnet: true,
    chainId: 181112,
    code: 1,
    mServerURL: 'https://testnet-explorer.medibloc.org',
    nodes: ['https://testnet-node.medibloc.org/'],
  },
  customNode: { // network name translation t('Custom Node');
    name: 'Custom Node',
    custom: true,
    code: 2,
    nodes: ['http://localhost:9921'],
  },
};

networks.default = networks[window.localStorage && window.localStorage.getItem('defaultNetwork')] || networks.testnet;
module.exports = networks;
