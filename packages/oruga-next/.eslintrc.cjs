/* eslint-env node */
module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    jest: true,
  },
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:vue/vue3-recommended",
    "plugin:vuejs-accessibility/recommended",
    "@vue/typescript/recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  plugins: ["prettier", "vuejs-accessibility"],
  rules: {
    "@typescript-eslint/no-explicit-any": ["warn"],
    "@typescript-eslint/ban-types": ["warn"],
    "@typescript-eslint/explicit-function-return-type": ["warn"],
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
