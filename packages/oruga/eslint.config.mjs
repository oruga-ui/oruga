/* eslint-env node */

import vuePlugin from "eslint-plugin-vue";
// import vueA11yPlugin from "eslint-plugin-vuejs-accessibility";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import typescriptConfig from "@vue/eslint-config-typescript";
import prettierConfig from "@vue/eslint-config-prettier";

export default [
  // add more generic rulesets here
  ...vuePlugin.configs["flat/recommended"],
  // ...vueA11yPlugin.configs["flat/recommended"],
  ...typescriptConfig(),
  prettierPlugin,
  prettierConfig,

  // your modifications
  {
    ignores: ["**/.*", "**/dist/*", "**/coverage/*"],
    rules: {
      "@typescript-eslint/no-explicit-any": ["warn"],
      "@typescript-eslint/ban-ts-comment": ["warn"],
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
  },
];
