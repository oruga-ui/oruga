import eslint from "@eslint/js";
import { globalIgnores, includeIgnoreFile } from "eslint/config";
import {
  configureVueProject,
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";
// import pluginVueA11y from "eslint-plugin-vuejs-accessibility";
// import pluginVitest from "@vitest/eslint-plugin";
import skipFormattingConfig from "@vue/eslint-config-prettier/skip-formatting";
import pluginCompat from "eslint-plugin-compat";

import { fileURLToPath } from "node:url";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

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

  // add js configs
  eslint.configs.recommended,

  // add browser compatibility configs
  pluginCompat.configs["flat/recommended"],

  // add vue with ts configs
  ...pluginVue.configs["flat/recommended"],
  vueTsConfigs.recommendedTypeChecked, // strictTypeChecked

  // add vue a11y configs
  // ...pluginVueA11y.configs["flat/recommended"],

  // add vitest configs
  // {
  //   ...pluginVitest.configs.recommended,
  //   files: ["src/**/__tests__/*"],
  // },

  // add vue prettier lint configs
  // deactivate prettier lint checks as recommended at https://github.com/vuejs/eslint-config-prettier?tab=readme-ov-file#use-separate-commands-for-linting-and-formatting
  // instead, we do formatting as a separate prettier task
  skipFormattingConfig,

  // project specific modifications
  {
    name: "overrides",
    rules: {
      // TypeScript
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-base-to-string": "off",
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
      "vue/no-dupe-keys": "off",
      "vue/block-order": ["error", { order: ["script", "template", "style"] }],
      "vue/block-lang": ["error", { script: { lang: "ts" } }],
      "vue/block-tag-newline": "error",
      "vue/component-api-style": ["error", ["script-setup"]],
      "vue/define-emits-declaration": ["error", "type-literal"],
      "vue/define-props-declaration": ["error", "type-based"],
      "vue/define-macros-order": [
        "error",
        {
          order: ["defineOptions", "defineProps", "defineEmits", "defineSlots"],
          defineExposeLast: true,
        },
      ],
      "vue/html-button-has-type": [
        "error",
        {
          button: true,
          submit: false,
          reset: false,
        },
      ],
      "vue/html-comment-content-spacing": "error",
      "vue/html-self-closing": [
        "warn",
        {
          html: { void: "always" },
        },
      ],
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
      "vue/no-undef-directives": "error",
      "vue/no-undef-properties": "error",
      "vue/prefer-use-template-ref": "error",
      "vue/require-macro-variable-name": [
        "error",
        {
          defineProps: "props",
          defineEmits: "emits",
          defineSlots: "slots",
          useSlots: "slots",
          useAttrs: "attrs",
        },
      ],
      "vue/require-prop-comment": "warn",
    },
  },
]);
