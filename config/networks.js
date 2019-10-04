const networks = {
  mainnet: { // network name translation t('Mainnet');
    name: 'Mainnet',
    chainId: 'panacea-1',
    code: 0,
    mServerURL: 'https://explorer-server.medibloc.org',
    mClientURL: 'https://explroer.medibloc.org',
    nodes: ['http://13.209.177.91:1318'],
  },
  testnet: { // network name translation t('Testnet');
    name: 'Testnet',
    testnet: true,
    chainId: 'hygieia-1',
    code: 1,
    faucetURL: 'https://testnet-explorer.medibloc.org',
    mServerURL: 'https://testnet-explorer-server.medibloc.org',
    mClientURL: 'https://testnet-explorer.medibloc.org',
    nodes: ['http://52.78.196.16:1318'],
  },
};

module.exports = networks;
