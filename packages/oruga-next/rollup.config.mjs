import { defineConfig } from "rollup";
import vue from "rollup-plugin-vue";
import esbuild from "rollup-plugin-esbuild";
import node from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import alias from "@rollup/plugin-alias";

import fs, { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const pack = JSON.parse(readFileSync("./package.json"));

const bannerTxt = `/*! Oruga v${pack.version} | MIT License | github.com/oruga-ui/oruga */`;

const baseFolder = "./src/components/";

const components = fs
  .readdirSync(baseFolder)
  .filter((f) => fs.statSync(path.join(baseFolder, f)).isDirectory());

const entries = {
  index: "./src/index.ts",
  helpers: "./src/utils/helpers.ts",
  config: "./src/utils/config.ts",
  ...components.reduce((obj, name) => {
    obj[name] = baseFolder + name;
    return obj;
  }, {}),
};

const definePlugins = (minify = false, ssr = false) => [
  node({
    extensions: [".vue", ".ts"],
  }),
  alias({
    entries: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  }),
  vue({
    template: {
      isProduction: true,
      compilerOptions: {
        whitespace: "condense",
      },
      optimizeSSR: ssr,
    },
  }),
  esbuild({
    minify,
    // Add extra loaders
    loaders: {
      // Add .json files support
      // require @rollup/plugin-commonjs
      ".json": "json",
    },
  }),
  babel({
    babelHelpers: "bundled",
  }),
  cjs(),
];

// ESM build to be used with webpack/rollup.
const esmConfig = defineConfig({
  input: entries,
  external: ["vue"],
  output: {
    format: "esm",
    dir: `dist/esm`,
    entryFileNames: "[name].mjs",
    chunkFileNames: "[name]-[hash].mjs",
  },
  plugins: definePlugins(),
});

// SSR build
const cjsConfig = defineConfig({
  input: entries,
  external: ["vue"],
  output: {
    format: "cjs",
    dir: "dist/cjs",
    exports: "named",
  },
  plugins: definePlugins(false, true),
});

// Browser builds
const umdIndexConfig = defineConfig({
  input: "src/index.ts",
  external: ["vue"],
  output: {
    format: "umd",
    name: "Oruga",
    file: "dist/oruga.js",
    exports: "named",
    banner: bannerTxt,
    globals: {
      vue: "Vue",
    },
  },
  plugins: definePlugins(),
});

const umdIndexMinifiedConfig = defineConfig({
  input: "src/index.ts",
  external: ["vue"],
  output: {
    format: "umd",
    name: "Oruga",
    file: "dist/oruga.min.js",
    exports: "named",
    banner: bannerTxt,
    globals: {
      vue: "Vue",
    },
  },
  plugins: definePlugins(true),
});

const esmIndexConfig = defineConfig({
  input: "src/index.ts",
  external: ["vue"],
  output: {
    format: "esm",
    file: "dist/oruga.mjs",
    banner: bannerTxt,
  },
  plugins: definePlugins(),
});

const esmIndexMinifiedConfig = defineConfig({
  input: "src/index.ts",
  external: ["vue"],
  output: {
    format: "esm",
    file: "dist/oruga.min.mjs",
    banner: bannerTxt,
  },
  plugins: definePlugins(true),
});

export default [
  esmConfig,
  cjsConfig,
  umdIndexConfig,
  umdIndexMinifiedConfig,
  esmIndexConfig,
  esmIndexMinifiedConfig,
];
