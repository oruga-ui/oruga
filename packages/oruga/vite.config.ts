/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

import babel from "@rollup/plugin-babel";

import { peerDependencies, version } from "./package.json";

import { resolve } from "path";
import { fileURLToPath, URL } from "url";

const bannerTxt = `/*! Oruga v${version} | MIT License | github.com/oruga-ui/oruga */`;

const browserTestPattern = "src/**/*.browser.test.{ts,js}";

// https://vitejs.dev/config/
export default defineConfig({
    root: __dirname,
    plugins: [
        tsconfigPaths(),
        vue(),
        dts({
            tsconfigPath: "./tsconfig.app.json",
            entryRoot: "./src",
            outDir: "./dist/types",
            bundledPackages: ["vue-component-type-helpers"],
        }),
    ],
    resolve: {
        alias: {
            // add '@oruga-ui/oruga-next' alias to sry entry point
            "@oruga-ui/oruga-next": fileURLToPath(
                new URL("./src/index.ts", import.meta.url),
            ),
            // add docs prefix
            "@docs": fileURLToPath(
                new URL("../docs/src/types.ts", import.meta.url),
            ),
            // add '@' alias to src
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    server: {
        open: true,
        port: 3000,
    },
    build: {
        emptyOutDir: false,
        sourcemap: true,
        lib: {
            name: "Oruga",
            entry: resolve(__dirname, "src/index.ts"),
            fileName: "index",
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [...Object.keys(peerDependencies)],
            output: {
                banner: bannerTxt,
                exports: "named",
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: "Vue",
                },
            },
            // rollup plugins
            plugins: [
                babel({
                    babelHelpers: "bundled",
                }),
            ],
        },
    },
    test: {
        setupFiles: [resolve("./src/__tests__/vitest.setup.ts")],
        environment: "jsdom",
        coverage: {
            provider: "istanbul",
        },
        projects: [
            {
                extends: true,
                test: {
                    name: "unit",
                    // exclude browser tests
                    exclude: [browserTestPattern],
                },
            },
            {
                extends: true,
                test: {
                    name: "browser",
                    // only run browser tests
                    include: [browserTestPattern],
                    browser: {
                        enabled: true,
                        provider: "playwright",
                        instances: [{ browser: "chromium" }],
                    },
                },
            },
        ],
    },
});
