import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

import babel from "@rollup/plugin-babel";

import { peerDependencies, version } from "./package.json";

import fs from "fs";
import path, { resolve } from "path";
import { fileURLToPath, URL } from "url";

const bannerTxt = `/*! Oruga v${version} | MIT License | github.com/oruga-ui/oruga */`;

const baseFolder = "./src/components/";

const components = fs
    .readdirSync(baseFolder)
    // filter only folder
    .filter((f) => fs.statSync(path.join(baseFolder, f)).isDirectory())
    // filter util components
    .filter((f) => !f.includes("utils"));

const entries = {
    index: resolve(__dirname, "./src/index.ts"),
    helpers: resolve(__dirname, "./src/utils/helpers.ts"),
    config: resolve(__dirname, "./src/utils/config.ts"),
    ...components.reduce((obj, name) => {
        obj[name] = resolve(__dirname, baseFolder + name);
        return obj;
    }, {} as any),
};

const browserTestPattern = "src/**/*.browser.test.{ts,js}";

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => ({
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
        minify: mode === "minify",
        lib:
            mode === "minify"
                ? // build minified version with index.ts entry
                  {
                      name: "Oruga",
                      entry: resolve(__dirname, "src/index.ts"),
                      formats: ["umd", "es"],
                      fileName: (format): string =>
                          format === "umd" ? "oruga.js" : "oruga.mjs",
                  }
                : // build rollup output verions for all entries
                  {
                      name: "Oruga",
                      entry: entries,
                  },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [...Object.keys(peerDependencies)],
            output:
                mode === "minify"
                    ? // Browser build minified version
                      {
                          banner: bannerTxt,
                          exports: "named",
                          // Provide global variables to use in the UMD build
                          // for externalized deps
                          globals: {
                              vue: "Vue",
                          },
                      }
                    : [
                          // ESM build
                          {
                              format: "esm",
                              dir: "dist/esm",
                              entryFileNames: "[name].mjs",
                              chunkFileNames: "[name]-[hash].mjs",
                              banner: bannerTxt,
                              globals: {
                                  vue: "Vue",
                              },
                          },
                          // SSR build
                          {
                              format: "cjs",
                              dir: "dist/cjs",
                              exports: "named",
                              banner: bannerTxt,
                              globals: {
                                  vue: "Vue",
                              },
                          },
                      ],
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
        workspace: [
            {
                extends: true,
                test: {
                    exclude: [browserTestPattern],
                },
            },
            {
                extends: true,
                test: {
                    include: [browserTestPattern],
                    name: "oruga-browser",
                    browser: {
                        enabled: true,
                        provider: "playwright",
                        instances: [
                            {
                                browser: "chromium",
                            },
                        ],
                    },
                },
            },
        ],
    },
}));
