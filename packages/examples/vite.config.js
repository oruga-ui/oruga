import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

import { resolve } from "path";
import { fileURLToPath } from "url";

import { peerDependencies } from "./package.json";

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
    root: __dirname,
    plugins: [
        vue(),
        tsconfigPaths(), 
        dts({ outDir: "./dist/types" }),
    ],
    resolve: {
        alias: {
            // add '@oruga-ui/oruga-next' alias to sry entry point
            "@oruga-ui/oruga-next": fileURLToPath(
                new URL("../oruga/src/index.ts", import.meta.url),
            ),
            // add '@' alias to oruga src
            "@": fileURLToPath(new URL("../oruga/src", import.meta.url)),
        },
    },
    build: {
        emptyOutDir: false,
        sourcemap: true,
        lib: {
            // build minified version with index.ts entry
            name: "Oruga Examples",
            entry: resolve(__dirname, "src/index.ts"),
            formats: ["umd", "es"],
            fileName: (format) =>
                format === "umd" ? "examples.js" : "examples.mjs",
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [...Object.keys(peerDependencies)],
            output: {
                // Browser build minified version
                exports: "named",
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
});
