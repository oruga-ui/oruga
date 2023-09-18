/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:vue/vue3-recommended",
    "@vue/typescript/recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  plugins: ["prettier"],
  rules: {
    "vue/padding-line-between-blocks": ["error", "always"],
    "vue/multi-word-component-names": ["off"],
    "vue/block-order": ["error", { order: ["script", "template", "style"] }],
    "vue/block-lang": ["error", { script: { lang: "ts" } }],
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
