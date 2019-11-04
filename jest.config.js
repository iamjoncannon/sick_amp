module.exports = {
    // "testEnvironment" : "node",
    // "setupFiles": ["jest-localstorage-mock"],
  "setupFilesAfterEnv" : [
        "<rootDir>/test/jest.setup.js"
      ],
  "moduleNameMapper": {
      "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
    }
}