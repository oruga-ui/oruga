import eslint from "@eslint/js";
import { globalIgnores } from "eslint/config";
import { includeIgnoreFile } from "@eslint/compat";
import vuePlugin from "eslint-plugin-vue";
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
// import vueA11yPlugin from "eslint-plugin-vuejs-accessibility";
import prettierConfig from "@vue/eslint-config-prettier";

import { fileURLToPath } from "node:url";
import path from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [
  // define specific ignore patterns
  globalIgnores(["*.d.ts"]),

  // include .gitignore ignore patterns
  includeIgnoreFile(gitignorePath),

  // add js configs
  eslint.configs.recommended,

  // add vue with ts configs
  ...defineConfigWithVueTs(
    vuePlugin.configs["flat/recommended"],
    vueTsConfigs.recommended,
  ),

  // add vue a11y configs
  // ...vueA11yPlugin.configs["flat/recommended"],

  // add prettier configs
  prettierConfig,

  // your modifications
  {
    rules: {
      // TypeScript
      "@typescript-eslint/no-explicit-any": ["warn"],
      "@typescript-eslint/ban-ts-comment": ["warn"],
      "@typescript-eslint/explicit-function-return-type": ["warn"],
      // Vue
      "vue/padding-line-between-blocks": ["error", "always"],
      "vue/multi-word-component-names": ["off"],
      "vue/block-order": ["error", { order: ["script", "template", "style"] }],
      "vue/block-lang": ["error", { script: { lang: "ts" } }],
      "vue/html-closing-bracket-newline": [
        "error",
        {
          singleline: "never",
          multiline: "never",
          selfClosingTag: {
            singleline: "never",
            multiline: "never",
          },
        },
      ],
    },
  },
];
