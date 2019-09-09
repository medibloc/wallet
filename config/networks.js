const networks = {
  mainnet: { // network name translation t('Mainnet');
    name: 'Mainnet',
    chainId: 'panacea-1',
    code: 0,
    mServerURL: 'http://explorer-server.medibloc.org',
    mClientURL: 'http://explroer.medibloc.org',
    nodes: ['http://13.209.177.91:1318'],
  },
  testnet: { // network name translation t('Testnet');
    name: 'Testnet',
    testnet: true,
    chainId: 'hygieia-1',
    code: 1,
    faucetURL: 'https://testnet-explorer.medibloc.org',
    mServerURL: 'http://testnet-explorer-server.medibloc.org',
    mClientURL: 'http://testnet-explorer.medibloc.org',
    nodes: ['http://52.78.196.16:1318'],
  },
  testnet_stg: { // network name translation t('Testnet-Stg');
    name: 'Testnet-Stg',
    testnet: true,
    chainId: 181228,
    code: 181228,
    faucetURL: 'https://stg-testnet-faucet.medibloc.org',
    mServerURL: 'https://stg-testnet-explorer.medibloc.org',
    nodes: ['https://stg-testnet-node.medibloc.org/'],
  },
  custom: {
    name: 'custom',
    chainId: 'test',
    code: 999999,
    mServerURL: 'http://localhost:3000',
    mClientURL: 'http://localhost:3000',
    nodes: ['http://localhost:1318'],
  },
};

module.exports = networks;
