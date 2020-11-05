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
    'prefer-rest-params': 'off',
    'vue/no-v-for-template-key-on-child': 'off',
    'vue/valid-v-for': 'off',
    'vue/require-v-for-key': 'off',
    'vue/no-v-for-template-key': 'off',
    'vue/no-template-key': 'off',
    'vue/comment-directive': 'off',
    'vue/custom-event-name-casing': 'off'
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
