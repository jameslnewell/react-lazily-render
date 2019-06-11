module.exports = {
  setupFiles: ['./src/_.test.js'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/', //ignore the node_modules
    '<rootDir>/src/_\\.test\\.js$', //ignore the test setup file
    '<rootDir>/dist', //ignore the dist directory
  ],
  verbose: true,
  testURL: "http://localhost/",
}