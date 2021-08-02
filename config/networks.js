const networks = {
  testnet: { // network name translation t('Mainnet');
    name: 'Testnet',
    chainId: 'hygieia-5',
    code: 1,
    mServerURL: 'https://testnet-explorer-server.medibloc.org',
    mClientURL: 'https://testnet-explorer.medibloc.org',
    nodes: ['http://52.78.196.16:26657'],
  },
};

module.exports = networks;
