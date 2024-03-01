/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  plugins: ["prettier"],
  rules: {
    "@typescript-eslint/no-explicit-any": ["warn"],
    "vue/padding-line-between-blocks": ["error", "always"],
    "vue/multi-word-component-names": ["off"],
    "comma-dangle": ["error", "always-multiline"],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all",
        endOfLine: "auto",
        bracketSameLine: true,
      },
    ],
  },
};
