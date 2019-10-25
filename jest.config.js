module.exports = {
    // "testEnvironment" : "node",
    "setupFiles": ["jest-localstorage-mock"],
    "setupFilesAfterEnv" : [
        "<rootDir>/test/jest.setup.js"
      ]
}