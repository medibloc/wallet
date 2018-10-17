module.exports = {
  modulePaths: ['src/components'],
  testMatch: [
    // app

    // '<rootDir>/app/src/menu.test.js',
    // '<rootDir>/app/src/modules/updateModal.test.js',
    // '<rootDir>/app/src/modules/autoUpdater.test.js',
    // '<rootDir>/app/src/modules/win.test.js',
    // '<rootDir>/app/src/modules/localeHandler.test.js',

    // src

    '<rootDir>/src/utils/account.test.js',
    '<rootDir>/src/utils/generateUniqueId.test.js',
    // '<rootDir>/src/utils/ipcLocale.test.js',
    // '<rootDir>/src/utils/localJSONStorage.test.js',
    // '<rootDir>/src/utils/login.test.js',
    '<rootDir>/src/utils/med.test.js',
    // '<rootDir>/src/utils/passphrase.test.js',
    '<rootDir>/src/utils/polyfills.test.js',
    '<rootDir>/src/utils/similarWord.test.js',
  ],
  verbose: true,
  moduleFileExtensions: ['js', 'node'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
  },
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/jest',
  collectCoverageFrom: [
    'src/**/*.js',
    'app/src/**/*.js',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  coverageThreshold: {
    global: {
      branches: 2,
      functions: 2,
      lines: 2,
      statements: 2,
    },
  },
  setupFiles: [
    '<rootDir>/config/setupJest.js',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testURL: 'http://localhost',
  globals: {
    PRODUCTION: true,
    TEST: true,
  },
};
