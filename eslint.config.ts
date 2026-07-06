import eslint from "@eslint/js";
import { globalIgnores, includeIgnoreFile } from "eslint/config";
import {
    configureVueProject,
    defineConfigWithVueTs,
    vueTsConfigs,
} from "@vue/eslint-config-typescript";
import skipFormattingPlugin from "@vue/eslint-config-prettier/skip-formatting";
import pluginVue from "eslint-plugin-vue";
import pluginCompat from "eslint-plugin-compat";
// import pluginVueA11y from "eslint-plugin-vuejs-accessibility";
// import pluginVitest from "@vitest/eslint-plugin";
// import pluginJsdoc from "eslint-plugin-jsdoc";

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

    // add js configs
    eslint.configs.recommended,

    // add vue with ts configs
    ...pluginVue.configs["flat/recommended"],
    vueTsConfigs.recommendedTypeChecked,

    // add vue a11y configs
    // ...pluginVueA11y.configs["flat/recommended"],

    // add jsdoc configs
    // pluginJsdoc.configs["flat/recommended-typescript-error"],
    // pluginJsdoc.configs["flat/logical-typescript-error"],
    // pluginJsdoc.configs["flat/stylistic-typescript-error"],

    // add vue prettier lint configs
    // deactivate prettier lint checks as recommended at https://github.com/vuejs/eslint-config-prettier?tab=readme-ov-file#use-separate-commands-for-linting-and-formatting
    // instead, we do formatting as a separate prettier task
    skipFormattingPlugin,

    // project specific modifications
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

            // JSDoc
            // "jsdoc/text-escaping": ["off"],
            // "jsdoc/lines-before-block": ["off"],
            // "jsdoc/escape-inline-tags": [
            //     "error",
            //     { allowedInlineTags: ["use"] },
            // ],
            // "jsdoc/require-hyphen-before-param-description": [
            //     "error",
            //     "always",
            // ],

            // Vue
            "vue/block-order": ["error", { order: ["script", "template"] }],
            "vue/block-lang": ["error", { script: { lang: "ts" } }],
            "vue/block-tag-newline": "error",
            "vue/component-api-style": ["error", ["script-setup"]],
            "vue/component-name-in-template-casing": ["error", "kebab-case"],
            "vue/define-emits-declaration": ["error", "type-literal"],
            "vue/define-macros-order": [
                "error",
                {
                    order: [
                        "defineOptions",
                        "defineProps",
                        "defineEmits",
                        "defineSlots",
                    ],
                    defineExposeLast: false,
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
            "vue/html-self-closing": ["warn", { html: { void: "always" } }],
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
            "vue/multi-word-component-names": "off",
            "vue/no-empty-component-block": "error",
            "vue/no-duplicate-attr-inheritance": "error",
            "vue/no-undef-directives": "error",
            "vue/no-undef-properties": "error",
            "vue/no-ref-object-reactivity-loss": "error",
            "vue/padding-line-between-blocks": ["error", "always"],
            "vue/prefer-use-template-ref": "error",
            "vue/require-explicit-slots": "error",
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

            // Vue a11y
        },
    },
]);
