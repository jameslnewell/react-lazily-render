module.exports = {
  setupFiles: ['./src/_.test.js'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/', //ignore the node_modules
    '<rootDir>/src/_\\.test\\.js$', //ignore the test setup file
  ],
  verbose: true,
  testURL: "http://localhost/",
}