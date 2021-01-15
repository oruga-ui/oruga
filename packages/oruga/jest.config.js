module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  roots: [
    '<rootDir>/src'
  ],
  testMatch: [
    '<rootDir>/src/components/**/*.spec.[jt]s?(x)',
    '<rootDir>/src/utils/*.spec.[jt]s?(x)'
  ],
  moduleFileExtensions: [
      'js',
      'vue'
  ],
  transform: {
      '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
      '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  moduleNameMapper: {
      '^@components/(.*)$': '<rootDir>/src/components/$1',
      '^@utils/(.*)$': '<rootDir>/src/utils/$1'
  },
  snapshotSerializers: [
      '<rootDir>/node_modules/jest-serializer-vue'
  ],
  setupFiles: [
      '<rootDir>/__mocks__/matchMediaMock.js'
  ],
  coverageDirectory: './coverage/',
  collectCoverage: true,
  testURL: 'http://localhost/'
}
