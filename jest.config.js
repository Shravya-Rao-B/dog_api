module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv:['./jest.setup.js'],
    moduleNameMapper: {
        "axios": "axios/dist/node/axios.cjs",
        "\\.(css|scss)$": "identity-obj-proxy"
      }
}