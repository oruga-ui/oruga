import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";
import istanbul from "vite-plugin-istanbul";
import dts from "vite-plugin-dts";

import babel from "@rollup/plugin-babel";

import { peerDependencies, version } from "./package.json";

import fs from "fs";
import path, { resolve } from "path";
import { fileURLToPath } from "url";

const bannerTxt = `/*! Oruga v${version} | MIT License | github.com/oruga-ui/oruga */`;

const baseFolder = "./src/components/";

const components = fs
    .readdirSync(baseFolder)
    .filter((f) => fs.statSync(path.join(baseFolder, f)).isDirectory());

const entries = {
    index: resolve(__dirname, "./src/index.ts"),
    helpers: resolve(__dirname, "./src/utils/helpers.ts"),
    config: resolve(__dirname, "./src/utils/config.ts"),
    ...components.reduce((obj, name) => {
        obj[name] = resolve(__dirname, baseFolder + name);
        return obj;
    }, {}),
};

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => ({
    root: __dirname,
    resolve: {
        alias: {
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
                      fileName: (format) =>
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
    plugins: [
        tsconfigPaths(),
        vue(),
        dts({ outDir: "./dist/types" }),
        istanbul({
            include: "src/*",
            exclude: ["node_modules", "cypress/", "**/tests/*"],
            extension: [".ts", ".vue"],
            cypress: true,
        }),
    ],
}));
