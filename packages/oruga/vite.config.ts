/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { playwright } from "@vitest/browser-playwright";

import { resolve } from "path";
import { fileURLToPath, URL } from "url";

import { peerDependencies, version } from "./package.json";

const bannerTxt = `/*! Oruga v${version} | MIT License | github.com/oruga-ui/oruga */`;

// https://vitejs.dev/config/
export default defineConfig({
    root: __dirname,
    plugins: [
        vue(),
        dts({
            tsconfigPath: "./tsconfig.app.json",
            entryRoot: "./src",
            outDir: "./dist/types",
            bundledPackages: ["vue-component-type-helpers"],
            copyDtsFiles: true,
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
        emptyOutDir: true,
        sourcemap: true,
        lib: {
            name: "Oruga",
            entry: resolve(__dirname, "src/index.ts"),
            formats: ["es"],
            fileName: "index",
        },
        rolldownOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: Object.keys(peerDependencies),
            output: {
                banner: bannerTxt,
                exports: "named",
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
    test: {
        coverage: {
            provider: "v8",
            // Include covered and uncovered files matching this pattern:
            include: ["src/**/*.{vue,ts}"],
            exclude: ["src/**/examples/*.{vue,ts}", "src/**/index.ts"],
        },
        projects: [
            {
                extends: true,
                test: {
                    name: "unit",
                    environment: "jsdom",
                    setupFiles: [
                        resolve(__dirname, "./src/__tests__/vitest.setup.ts"),
                    ],
                    // exclude browser tests
                    exclude: ["src/**/*.browser.test.{ts,js}"],
                },
            },
            {
                extends: true,
                test: {
                    name: "browser",
                    setupFiles: [
                        "vitest-browser-vue",
                        resolve(
                            __dirname,
                            "./src/__tests__/vitest.browser.setup.ts",
                        ),
                    ],
                    // only run browser tests
                    include: ["src/**/*.browser.test.{ts,js}"],
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: playwright(),
                        instances: [{ browser: "chromium" }],
                    },
                },
            },
        ],
    },
});
