import eslint from "@eslint/js";
import { globalIgnores } from "eslint/config";
import { includeIgnoreFile } from "@eslint/compat";
import compat from "eslint-plugin-compat";
import vuePlugin from "eslint-plugin-vue";
import {
  configureVueProject,
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
// import vueA11yPlugin from "eslint-plugin-vuejs-accessibility";
import skipFormattingConfig from "@vue/eslint-config-prettier/skip-formatting";

import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

configureVueProject({
  rootDir: import.meta.dirname, // monorepo root
  includeDotFolders: true,
});

export default defineConfigWithVueTs([
  // define specific ignore patterns
  globalIgnores([
    "*.d.ts",
    // prevent lint for generated files
    "CHANGELOG.md",
    "**/packages/oruga/src/config.d.ts",
    "**/packages/oruga/src/globals.d.ts",
    "**/theme-*.md",
  ]),

  // include .gitignore ignore patterns
  includeIgnoreFile(gitignorePath),

  // add browser compatibility configs
  compat.configs["flat/recommended"],

  // add js configs
  eslint.configs.recommended,

  // add vue with ts configs
  vuePlugin.configs["flat/recommended"],
  vueTsConfigs.recommendedTypeChecked,

  // add vue a11y configs
  // ...vueA11yPlugin.configs["flat/recommended"],

  // add vue prettier lint configs
  // deactivate prettier lint checks as recommended at https://github.com/vuejs/eslint-config-prettier?tab=readme-ov-file#use-separate-commands-for-linting-and-formatting
  // instead, we do formatting as a separate prettier task
  skipFormattingConfig,

  // project modifications
  {
    name: "overrides",
    rules: {
      // TypeScript
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-redundant-type-constituents": "warn",
      "@typescript-eslint/no-unnecessary-type-assertion": [
        "warn",
        { typesToIgnore: ["ModelValue", "T"] },
      ],
      "@typescript-eslint/restrict-template-expressions": "off",

      // Vue
      "vue/padding-line-between-blocks": ["error", "always"],
      "vue/multi-word-component-names": "off",
      "vue/no-empty-component-block": "error",
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
]);
