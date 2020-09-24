module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prefer-rest-params': 'off'
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
