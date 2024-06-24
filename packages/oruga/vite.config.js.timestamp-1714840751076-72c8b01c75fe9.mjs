// vite.config.js
import { defineConfig } from "file:///C:/Users/HP/Desktop/Developement/Open%20source/oruga/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/HP/Desktop/Developement/Open%20source/oruga/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import tsconfigPaths from "file:///C:/Users/HP/Desktop/Developement/Open%20source/oruga/node_modules/vite-tsconfig-paths/dist/index.mjs";
import dts from "file:///C:/Users/HP/Desktop/Developement/Open%20source/oruga/node_modules/vite-plugin-dts/dist/index.mjs";
import babel from "file:///C:/Users/HP/Desktop/Developement/Open%20source/oruga/node_modules/@rollup/plugin-babel/dist/es/index.js";

// package.json
var version = "0.8.8";
var peerDependencies = {
  vue: "^3.0.0"
};

// vite.config.js
import fs from "fs";
import path, { resolve } from "path";
import { fileURLToPath } from "url";
var __vite_injected_original_dirname = "C:\\Users\\HP\\Desktop\\Developement\\Open source\\oruga\\packages\\oruga";
var __vite_injected_original_import_meta_url = "file:///C:/Users/HP/Desktop/Developement/Open%20source/oruga/packages/oruga/vite.config.js";
var bannerTxt = `/*! Oruga v${version} | MIT License | github.com/oruga-ui/oruga */`;
var baseFolder = "./src/components/";
var components = fs.readdirSync(baseFolder).filter((f) => fs.statSync(path.join(baseFolder, f)).isDirectory()).filter((f) => !f.includes("utils"));
var entries = {
  index: resolve(__vite_injected_original_dirname, "./src/index.ts"),
  helpers: resolve(__vite_injected_original_dirname, "./src/utils/helpers.ts"),
  config: resolve(__vite_injected_original_dirname, "./src/utils/config.ts"),
  ...components.reduce((obj, name) => {
    obj[name] = resolve(__vite_injected_original_dirname, baseFolder + name);
    return obj;
  }, {})
};
var vite_config_default = defineConfig(({ mode }) => ({
  root: __vite_injected_original_dirname,
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    open: true,
    port: 3e3
  },
  build: {
    emptyOutDir: false,
    sourcemap: true,
    minify: mode === "minify",
    lib: mode === "minify" ? (
      // build minified version with index.ts entry
      {
        name: "Oruga",
        entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
        formats: ["umd", "es"],
        fileName: (format) => format === "umd" ? "oruga.js" : "oruga.mjs"
      }
    ) : (
      // build rollup output verions for all entries
      {
        name: "Oruga",
        entry: entries
      }
    ),
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [...Object.keys(peerDependencies)],
      output: mode === "minify" ? (
        // Browser build minified version
        {
          banner: bannerTxt,
          exports: "named",
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: "Vue"
          }
        }
      ) : [
        // ESM build
        {
          format: "esm",
          dir: "dist/esm",
          entryFileNames: "[name].mjs",
          chunkFileNames: "[name]-[hash].mjs",
          banner: bannerTxt,
          globals: {
            vue: "Vue"
          }
        },
        // SSR build
        {
          format: "cjs",
          dir: "dist/cjs",
          exports: "named",
          banner: bannerTxt,
          globals: {
            vue: "Vue"
          }
        }
      ],
      // rollup plugins
      plugins: [
        babel({
          babelHelpers: "bundled"
        })
      ]
    }
  },
  plugins: [tsconfigPaths(), vue(), dts({ outDir: "./dist/types" })],
  test: {
    setupFiles: [resolve("./src/__tests__/vitest.setup.ts")],
    environment: "jsdom",
    coverage: {
      provider: "istanbul"
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcSFBcXFxcRGVza3RvcFxcXFxEZXZlbG9wZW1lbnRcXFxcT3BlbiBzb3VyY2VcXFxcb3J1Z2FcXFxccGFja2FnZXNcXFxcb3J1Z2FcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEhQXFxcXERlc2t0b3BcXFxcRGV2ZWxvcGVtZW50XFxcXE9wZW4gc291cmNlXFxcXG9ydWdhXFxcXHBhY2thZ2VzXFxcXG9ydWdhXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9IUC9EZXNrdG9wL0RldmVsb3BlbWVudC9PcGVuJTIwc291cmNlL29ydWdhL3BhY2thZ2VzL29ydWdhL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI7XHJcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xyXG5cclxuaW1wb3J0IGJhYmVsIGZyb20gXCJAcm9sbHVwL3BsdWdpbi1iYWJlbFwiO1xyXG5cclxuaW1wb3J0IHsgcGVlckRlcGVuZGVuY2llcywgdmVyc2lvbiB9IGZyb20gXCIuL3BhY2thZ2UuanNvblwiO1xyXG5cclxuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgcGF0aCwgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gXCJ1cmxcIjtcclxuXHJcbmNvbnN0IGJhbm5lclR4dCA9IGAvKiEgT3J1Z2EgdiR7dmVyc2lvbn0gfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vb3J1Z2EtdWkvb3J1Z2EgKi9gO1xyXG5cclxuY29uc3QgYmFzZUZvbGRlciA9IFwiLi9zcmMvY29tcG9uZW50cy9cIjtcclxuXHJcbmNvbnN0IGNvbXBvbmVudHMgPSBmc1xyXG4gICAgLnJlYWRkaXJTeW5jKGJhc2VGb2xkZXIpXHJcbiAgICAvLyBmaWx0ZXIgb25seSBmb2xkZXJcclxuICAgIC5maWx0ZXIoKGYpID0+IGZzLnN0YXRTeW5jKHBhdGguam9pbihiYXNlRm9sZGVyLCBmKSkuaXNEaXJlY3RvcnkoKSlcclxuICAgIC8vIGZpbHRlciB1dGlsIGNvbXBvbmVudHNcclxuICAgIC5maWx0ZXIoKGYpID0+ICFmLmluY2x1ZGVzKFwidXRpbHNcIikpO1xyXG5cclxuY29uc3QgZW50cmllcyA9IHtcclxuICAgIGluZGV4OiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9pbmRleC50c1wiKSxcclxuICAgIGhlbHBlcnM6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3V0aWxzL2hlbHBlcnMudHNcIiksXHJcbiAgICBjb25maWc6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3V0aWxzL2NvbmZpZy50c1wiKSxcclxuICAgIC4uLmNvbXBvbmVudHMucmVkdWNlKChvYmosIG5hbWUpID0+IHtcclxuICAgICAgICBvYmpbbmFtZV0gPSByZXNvbHZlKF9fZGlybmFtZSwgYmFzZUZvbGRlciArIG5hbWUpO1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9LCB7fSksXHJcbn07XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG4vKiogQHR5cGUge2ltcG9ydCgndml0ZScpLlVzZXJDb25maWd9ICovXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XHJcbiAgICByb290OiBfX2Rpcm5hbWUsXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgYWxpYXM6IHtcclxuICAgICAgICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjXCIsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgICBwb3J0OiAzMDAwLFxyXG4gICAgfSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgZW1wdHlPdXREaXI6IGZhbHNlLFxyXG4gICAgICAgIHNvdXJjZW1hcDogdHJ1ZSxcclxuICAgICAgICBtaW5pZnk6IG1vZGUgPT09IFwibWluaWZ5XCIsXHJcbiAgICAgICAgbGliOlxyXG4gICAgICAgICAgICBtb2RlID09PSBcIm1pbmlmeVwiXHJcbiAgICAgICAgICAgICAgICA/IC8vIGJ1aWxkIG1pbmlmaWVkIHZlcnNpb24gd2l0aCBpbmRleC50cyBlbnRyeVxyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIk9ydWdhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2luZGV4LnRzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZm9ybWF0czogW1widW1kXCIsIFwiZXNcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPT09IFwidW1kXCIgPyBcIm9ydWdhLmpzXCIgOiBcIm9ydWdhLm1qc1wiLFxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA6IC8vIGJ1aWxkIHJvbGx1cCBvdXRwdXQgdmVyaW9ucyBmb3IgYWxsIGVudHJpZXNcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJPcnVnYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZW50cnk6IGVudHJpZXMsXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgdG8gZXh0ZXJuYWxpemUgZGVwcyB0aGF0IHNob3VsZG4ndCBiZSBidW5kbGVkXHJcbiAgICAgICAgICAgIC8vIGludG8geW91ciBsaWJyYXJ5XHJcbiAgICAgICAgICAgIGV4dGVybmFsOiBbLi4uT2JqZWN0LmtleXMocGVlckRlcGVuZGVuY2llcyldLFxyXG4gICAgICAgICAgICBvdXRwdXQ6XHJcbiAgICAgICAgICAgICAgICBtb2RlID09PSBcIm1pbmlmeVwiXHJcbiAgICAgICAgICAgICAgICAgICAgPyAvLyBCcm93c2VyIGJ1aWxkIG1pbmlmaWVkIHZlcnNpb25cclxuICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBiYW5uZXI6IGJhbm5lclR4dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBleHBvcnRzOiBcIm5hbWVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJvdmlkZSBnbG9iYWwgdmFyaWFibGVzIHRvIHVzZSBpbiB0aGUgVU1EIGJ1aWxkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yIGV4dGVybmFsaXplZCBkZXBzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dWU6IFwiVnVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICA6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFU00gYnVpbGRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogXCJlc21cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyOiBcImRpc3QvZXNtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcIltuYW1lXS5tanNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2h1bmtGaWxlTmFtZXM6IFwiW25hbWVdLVtoYXNoXS5tanNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFubmVyOiBiYW5uZXJUeHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ1ZTogXCJWdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNTUiBidWlsZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBcImNqc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXI6IFwiZGlzdC9janNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwb3J0czogXCJuYW1lZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYW5uZXI6IGJhbm5lclR4dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnVlOiBcIlZ1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAvLyByb2xsdXAgcGx1Z2luc1xyXG4gICAgICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICAgICAgICBiYWJlbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFiZWxIZWxwZXJzOiBcImJ1bmRsZWRcIixcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW3RzY29uZmlnUGF0aHMoKSwgdnVlKCksIGR0cyh7IG91dERpcjogXCIuL2Rpc3QvdHlwZXNcIiB9KV0sXHJcbiAgICB0ZXN0OiB7XHJcbiAgICAgICAgc2V0dXBGaWxlczogW3Jlc29sdmUoXCIuL3NyYy9fX3Rlc3RzX18vdml0ZXN0LnNldHVwLnRzXCIpXSxcclxuICAgICAgICBlbnZpcm9ubWVudDogXCJqc2RvbVwiLFxyXG4gICAgICAgIGNvdmVyYWdlOiB7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyOiBcImlzdGFuYnVsXCIsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn0pKTtcclxuIiwgIntcclxuICBcIm5hbWVcIjogXCJAb3J1Z2EtdWkvb3J1Z2EtbmV4dFwiLFxyXG4gIFwidmVyc2lvblwiOiBcIjAuOC44XCIsXHJcbiAgXCJob21lcGFnZVwiOiBcImh0dHBzOi8vb3J1Z2EtdWkuY29tXCIsXHJcbiAgXCJkZXNjcmlwdGlvblwiOiBcIlVJIGNvbXBvbmVudHMgZm9yIFZ1ZS5qcyBhbmQgQ1NTIGZyYW1ld29yayBhZ25vc3RpY1wiLFxyXG4gIFwiYXV0aG9yXCI6IFwiV2FsdGVyIFRvbW1hc2kgPHRvbW1zaTIwQGdtYWlsLmNvbT5cIixcclxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcclxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcclxuICBcIm1haW5cIjogXCJkaXN0L2Nqcy9pbmRleC5janNcIixcclxuICBcIm1vZHVsZVwiOiBcImRpc3QvZXNtL2luZGV4Lm1qc1wiLFxyXG4gIFwidW5wa2dcIjogXCJkaXN0L29ydWdhLmpzXCIsXHJcbiAgXCJ0eXBpbmdzXCI6IFwiZGlzdC90eXBlcy9pbmRleC5kLnRzXCIsXHJcbiAgXCJleHBvcnRzXCI6IHtcclxuICAgIFwiLlwiOiB7XHJcbiAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3QvdHlwZXMvaW5kZXguZC50c1wiLFxyXG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9lc20vaW5kZXgubWpzXCIsXHJcbiAgICAgIFwicmVxdWlyZVwiOiBcIi4vZGlzdC9janMvaW5kZXguY2pzXCJcclxuICAgIH0sXHJcbiAgICBcIi4vKlwiOiBcIi4vKlwiLFxyXG4gICAgXCIuL3ZvbGFyXCI6IHtcclxuICAgICAgXCJ0eXBlc1wiOiBcIi4vdm9sYXIuZC50c1wiXHJcbiAgICB9XHJcbiAgfSxcclxuICBcImZpbGVzXCI6IFtcclxuICAgIFwiZGlzdFwiLFxyXG4gICAgXCJzcmNcIixcclxuICAgIFwibnV4dFwiLFxyXG4gICAgXCJ0eXBlcy8qLmQudHNcIixcclxuICAgIFwidm9sYXIuZC50c1wiLFxyXG4gICAgXCJSRUFETUUubWRcIlxyXG4gIF0sXHJcbiAgXCJzaWRlRWZmZWN0c1wiOiBbXHJcbiAgICBcIiouY3NzXCIsXHJcbiAgICBcIiouc2Nzc1wiXHJcbiAgXSxcclxuICBcInJlcG9zaXRvcnlcIjoge1xyXG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXHJcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9vcnVnYS11aS9vcnVnYS5naXRcIlxyXG4gIH0sXHJcbiAgXCJidWdzXCI6IHtcclxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL29ydWdhLXVpL29ydWdhL2lzc3Vlc1wiXHJcbiAgfSxcclxuICBcImtleXdvcmRzXCI6IFtcclxuICAgIFwib3J1Z2FcIixcclxuICAgIFwidnVlXCIsXHJcbiAgICBcInZ1ZWpzXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIixcclxuICAgIFwidXhcIixcclxuICAgIFwidWlcIixcclxuICAgIFwiY3NzXCIsXHJcbiAgICBcImFnbm9zdGljXCIsXHJcbiAgICBcImZyYW1ld29ya1wiXHJcbiAgXSxcclxuICBcInNjcmlwdHNcIjoge1xyXG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXHJcbiAgICBcImJ1aWxkOnZ1ZVwiOiBcInJpbXJhZiBkaXN0ICYmIHZpdGUgYnVpbGQgJiYgdml0ZSBidWlsZCAtLW1vZGUgbWluaWZ5XCIsXHJcbiAgICBcImJ1aWxkOnZ1ZTp3YXRjaFwiOiBcInZpdGUgYnVpbGQgLS1tb2RlIG1pbmlmeSAtLXdhdGNoXCIsXHJcbiAgICBcImJ1aWxkOmxpYlwiOiBcInJpbXJhZiBkaXN0ICYmIG5wbSBydW4gdGVzdDp0cyAmJiBucG0gcnVuIGJ1aWxkOnZ1ZVwiLFxyXG4gICAgXCJidWlsZDpsaWI6d2F0Y2hcIjogXCJucG0gbGluayAmJiBucG0gcnVuIGJ1aWxkOnZ1ZTp3YXRjaFwiLFxyXG4gICAgXCJ0ZXN0XCI6IFwidml0ZXN0XCIsXHJcbiAgICBcInRlc3Q6Y292ZXJhZ2VcIjogXCJ2aXRlc3QgcnVuIC0tY292ZXJhZ2VcIixcclxuICAgIFwidGVzdDp0c1wiOiBcInZ1ZS10c2MgLS1ub0VtaXQgLS1za2lwTGliQ2hlY2tcIixcclxuICAgIFwidGVzdDp3YXRjaFwiOiBcInJtIC1yZiAubnljX291dHB1dCBjb3ZlcmFnZSAmJiBOT0RFX0VOVj10ZXN0IGN5cHJlc3Mgb3BlbiAtLWNvbXBvbmVudFwiLFxyXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IC4gLS1leHQgLnZ1ZSwuanMsLmpzeCwuY2pzLC5tanMsLnRzLC50c3gsLmN0cywubXRzIC0tZml4IC0tcXVpZXQgLS1pZ25vcmUtcGF0aCAuZ2l0aWdub3JlXCIsXHJcbiAgICBcInB1Ymxpc2g6bGliXCI6IFwiY3AgLi4vLi4vUkVBRE1FLm1kIC4gJiYgbnBtIHJ1biBidWlsZDpsaWIgJiYgbnBtIHB1Ymxpc2hcIixcclxuICAgIFwidXBkYXRlXCI6IFwibmN1IC11XCJcclxuICB9LFxyXG4gIFwicGVlckRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcInZ1ZVwiOiBcIl4zLjAuMFwiXHJcbiAgfSxcclxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcIkBiYWJlbC9jb3JlXCI6IFwiNy4yNC40XCIsXHJcbiAgICBcIkBiYWJlbC9wcmVzZXQtZW52XCI6IFwiNy4yNC40XCIsXHJcbiAgICBcIkByb2xsdXAvcGx1Z2luLWJhYmVsXCI6IFwiNi4wLjRcIixcclxuICAgIFwiQHR5cGVzL2plc3QtYXhlXCI6IFwiXjMuNS45XCIsXHJcbiAgICBcIkB0eXBlcy9qc2RvbVwiOiBcIl4yMS4xLjZcIixcclxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjAuMTIuN1wiLFxyXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNS4wLjRcIixcclxuICAgIFwiQHZpdGVzdC9jb3ZlcmFnZS1pc3RhbmJ1bFwiOiBcIl4xLjQuMFwiLFxyXG4gICAgXCJAdnVlL2VzbGludC1jb25maWctcHJldHRpZXJcIjogXCJeOS4wLjBcIixcclxuICAgIFwiQHZ1ZS9lc2xpbnQtY29uZmlnLXN0YW5kYXJkXCI6IFwiXjguMC4xXCIsXHJcbiAgICBcIkB2dWUvZXNsaW50LWNvbmZpZy10eXBlc2NyaXB0XCI6IFwiXjEzLjAuMFwiLFxyXG4gICAgXCJAdnVlL3Rlc3QtdXRpbHNcIjogXCJeMi40LjVcIixcclxuICAgIFwiQHZ1ZS90c2NvbmZpZ1wiOiBcIl4wLjUuMVwiLFxyXG4gICAgXCJjb3JlLWpzXCI6IFwiMy4zNi4xXCIsXHJcbiAgICBcImVzbGludFwiOiBcIl44LjU3LjBcIixcclxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl45LjEuMFwiLFxyXG4gICAgXCJlc2xpbnQtY29uZmlnLXN0YW5kYXJkXCI6IFwiXjE3LjEuMFwiLFxyXG4gICAgXCJlc2xpbnQtY29uZmlnLXN0YW5kYXJkLXdpdGgtdHlwZXNjcmlwdFwiOiBcIl40My4wLjFcIixcclxuICAgIFwiZXNsaW50LXBsdWdpbi1ub2RlXCI6IFwiXjExLjEuMFwiLFxyXG4gICAgXCJlc2xpbnQtcGx1Z2luLXByb21pc2VcIjogXCJeNi4xLjFcIixcclxuICAgIFwiZXNsaW50LXBsdWdpbi12dWVcIjogXCJeOS4yNC4xXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4tdnVlanMtYWNjZXNzaWJpbGl0eVwiOiBcIl4yLjIuMVwiLFxyXG4gICAgXCJqZXN0LWF4ZVwiOiBcIl44LjAuMFwiLFxyXG4gICAgXCJqc2RvbVwiOiBcIl4yNC4wLjBcIixcclxuICAgIFwibnBtLWNoZWNrLXVwZGF0ZXNcIjogXCJeMTYuMTQuMThcIixcclxuICAgIFwicHJldHRpZXJcIjogXCJeMy4yLjVcIixcclxuICAgIFwicmltcmFmXCI6IFwiXjUuMC41XCIsXHJcbiAgICBcInNhc3NcIjogXCIxLjc1LjBcIixcclxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjQuNVwiLFxyXG4gICAgXCJ2aXRlXCI6IFwiXjUuMi44XCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLWR0c1wiOiBcIl4zLjguMlwiLFxyXG4gICAgXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI6IFwiXjQuMy4yXCIsXHJcbiAgICBcInZpdGVzdFwiOiBcIl4xLjQuMFwiLFxyXG4gICAgXCJ2dWVcIjogXCJeMy40LjIxXCIsXHJcbiAgICBcInZ1ZS1jb21wb25lbnQtbWV0YVwiOiBcIl4yLjAuMTNcIixcclxuICAgIFwidnVlLWNvbXBvbmVudC10eXBlLWhlbHBlcnNcIjogXCJeMi4wLjEzXCIsXHJcbiAgICBcInZ1ZS10c2NcIjogXCJeMi4wLjEzXCJcclxuICB9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5WSxTQUFTLG9CQUFvQjtBQUN0YSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxTQUFTO0FBRWhCLE9BQU8sV0FBVzs7O0FDSGhCLGNBQVc7QUFpRVgsdUJBQW9C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