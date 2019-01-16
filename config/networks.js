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
    faucetURL: 'https://testnet-explorer.medibloc.org',
    mServerURL: 'https://testnet-explorer.medibloc.org',
    nodes: ['https://testnet-node.medibloc.org/'],
  },
  testnet_stg: { // network name translation t('Testnet-Stg');
    name: 'Testnet-Stg',
    testnet: true,
    chainId: 181228,
    code: 2,
    faucetURL: 'https://stg-testnet-explorer.medibloc.org',
    mServerURL: 'https://stg-testnet-explorer.medibloc.org',
    nodes: ['https://stg-testnet-node.medibloc.org/'],
  },
};

module.exports = networks;
