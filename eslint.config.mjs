import eslint from "@eslint/js";
import { globalIgnores } from "eslint/config";
import { includeIgnoreFile } from "@eslint/compat";
import vuePlugin from "eslint-plugin-vue";
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
// import vueA11yPlugin from "eslint-plugin-vuejs-accessibility";
import stylistic from "@stylistic/eslint-plugin";

import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [
  // define specific ignore patterns
  globalIgnores([
    "*.d.ts",
    // prevent lint for generated files
    "CHANGELOG.md",
    "**/packages/oruga/src/components/types.ts",
    "**/theme-*.md",
  ]),

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

  // disable eslint and @typescript-eslint/eslint-plugin legacy rules
  stylistic.configs["disable-legacy"],

  // add formatter configs
  stylistic.configs.customize({
    quotes: "double",
    semi: true,
    jsx: false,
    quoteProps: "as-needed",
    arrowParens: true,
    braceStyle: "1tbs",
  }),

  // project specific modifications
  {
    plugins: {
      // add eslint stylistic
      "@stylistic": stylistic,
    },
    // custon rule modifications
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
      // Stylistic
      "@stylistic/multiline-ternary": ["error", "always-multiline"],
      "@stylistic/object-curly-newline": [
        "error",
        {
          ObjectExpression: {
            multiline: true,
            consistent: true,
          },
          ObjectPattern: { multiline: true },
        },
      ],
      "@stylistic/operator-linebreak": [
        "error",
        "after",
        {
          overrides: {
            "?": "before",
            ":": "before",
            "|": "before",
          },
        },
      ],
    },
  },
];
