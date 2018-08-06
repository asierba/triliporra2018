module.exports = {
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "transform": {
    "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  "setupFiles": [
    "raf/polyfill"
  ],
  "testRegex": "/test/web/.*\\.spec\\.(ts|tsx|js)$",
  "setupTestFrameworkScriptFile": "<rootDir>test/web/setupTests.ts",
  "moduleNameMapper": {
    "\\.(css|less)$": "<rootDir>/test/web/mocks/styleMock.js"
  }
}
