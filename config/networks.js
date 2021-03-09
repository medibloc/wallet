const networks = {
  mainnet: { // network name translation t('Mainnet');
    name: 'Mainnet',
    chainId: 'panacea-1',
    code: 0,
    mServerURL: 'https://explorer-server.medibloc.org',
    mClientURL: 'https://explorer.medibloc.org',
    nodes: ['https://wallet-lcd.gopanacea.org'],
  },
  testnet: { // network name translation t('Testnet');
    name: 'Testnet',
    testnet: true,
    chainId: 'hygieia-3',
    code: 1,
    faucetURL: 'https://testnet-explorer.medibloc.org',
    mServerURL: 'https://testnet-explorer-server.medibloc.org',
    mClientURL: 'https://testnet-explorer.medibloc.org',
    nodes: ['https://testnet-wallet-lcd.gopanacea.org'],
  },
};

module.exports = networks;
