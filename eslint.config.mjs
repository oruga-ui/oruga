import eslint from "@eslint/js";
import { globalIgnores } from "eslint/config";
import { includeIgnoreFile } from "@eslint/compat";
import vuePlugin from "eslint-plugin-vue";
import {
  configureVueProject,
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

configureVueProject({
  rootDir: import.meta.dirname, // monorepo root
  // available after https://github.com/vuejs/eslint-config-typescript/pull/278 is released
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

  // override ts config for .vitepress with explizit tsconfig
  // can be removed when https://github.com/vuejs/eslint-config-typescript/pull/278 is released
  {
    name: "vitepress-overrides",
    files: ["**/.*/**/*.{ts,vue}"],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        projectService: {
          defaultProject: "./packages/docs/tsconfig.json",
          loadTypeScriptPlugins: true,
        },
      },
    },
  },

  // add js configs
  eslint.configs.recommended,

  // add vue with ts configs
  vuePlugin.configs["flat/recommended"],
  // TODO: revert to recommended after some issues got fixed
  vueTsConfigs.strictTypeChecked,

  // add vue a11y configs
  // ...vueA11yPlugin.configs["flat/recommended"],

  // add prettier configs
  prettierConfig,

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
      "@typescript-eslint/restrict-template-expressions": "off",

      "@typescript-eslint/no-deprecated": "warn",
      // "@typescript-eslint/no-dynamic-delete": "error",
      // "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
      // "@typescript-eslint/no-invalid-void-type": "error",
      // "@typescript-eslint/no-misused-spread": "error",
      // "@typescript-eslint/no-mixed-enums": "error",
      // "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
      // "@typescript-eslint/no-non-null-assertion": "error",
      // "@typescript-eslint/no-unnecessary-condition": "error",
      // "@typescript-eslint/no-unnecessary-template-expression": "error",
      // "@typescript-eslint/no-useless-default-assignment": "error",
      // "@typescript-eslint/prefer-literal-enum-member": "error",

      "@typescript-eslint/unified-signatures": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-unnecessary-type-parameters": "off",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",

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
