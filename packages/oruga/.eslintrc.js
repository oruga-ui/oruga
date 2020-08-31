module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prefer-rest-params': 'off',
    '@typescript-eslint/no-empty-function': ["error", { "allow": ["arrowFunctions", "functions", "methods"] } ],
    '@typescript-eslint/no-this-alias': 'off'
  },
  overrides: [
    {
      files: ["*.spec.js"],
      rules: {
        'require-atomic-updates': 'off'
      }
    },
    {
      files: ["*.md"],
      rules: {
        'semi': ['error', 'never'],
      }
    },
  ]
}
