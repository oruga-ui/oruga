import { defineConfig } from 'rollup';
import vue from 'rollup-plugin-vue';
import node from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-typescript2';

import fs from 'fs';
import path from 'path';

import pack from './package.json' assert { type: "json" };

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const bannerTxt = `/*! Oruga v${pack.version} | MIT License | github.com/oruga-ui/oruga */`;

const baseFolder = './src/components/';

const components = fs
    .readdirSync(baseFolder)
    .filter((f) =>
        fs.statSync(path.join(baseFolder, f)).isDirectory()
    )

const entries = {
    'index': './src/index.ts',
    'helpers': './src/utils/helpers.ts',
    'config': './src/utils/config.ts',
    ...components.reduce((obj, name) => {
        obj[name] = (baseFolder + name)
        return obj
    }, {}),
}

const definePlugins = (ssr = false) => [
    node({
        extensions: ['.vue', '.ts'],
    }),
    typescript({
        typescript: require('typescript'),
    }),
    vue({  
        template: {
            isProduction: true,
            compilerOptions: {
                whitespace: 'condense'
            },
            optimizeSSR: ssr,
        }
    }),
    babel({
        babelHelpers: 'bundled',
    }),
    cjs(),
]

const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

// ESM build to be used with webpack/rollup.
const esmConfig = defineConfig({
    input: entries,
    external: ['vue'],
    output: {
        format: 'esm',
        dir: `dist/esm`,
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name]-[hash].mjs',
    },
    plugins: definePlugins(),
});

// SSR build
const cjsConfig = defineConfig({
    input: entries,
    external: ['vue'],
    output: {
        format: 'cjs',
        dir: 'dist/cjs',
        exports: 'named'
    },
    plugins: definePlugins(true),
});

// Browser build
const umdIndexConfig = defineConfig({
    input: 'src/index.ts',
    external: ['vue'],
    output: {
        format: 'umd',
        name: capitalize('oruga'),
        file: 'dist/oruga.js',
        exports: 'named',
        banner: bannerTxt,
        globals: {
            vue: 'Vue'
        }
    },
    plugins: definePlugins(),
});

const esmIndexConfig = defineConfig({
    input: 'src/index.ts',
    external: ['vue'],
    output: {
        format: 'esm',
        file: 'dist/oruga.mjs',
        banner: bannerTxt
    },
    plugins: definePlugins(),
});

export default () => {
    let configs = [
        esmConfig, 
        cjsConfig,
        umdIndexConfig,
        esmIndexConfig, 
    ];

    if (process.env.MINIFY === 'true') {
        configs = configs.filter((c) => !!c.output.file);
        configs.forEach((c) => {
            c.output.file = c.output.file?.replace(/\.m?js/g, r => `.min${r}`);
            c.plugins.push(terser({
                output: {
                    comments: RegExp('/^!/')
                }
            }));
        })
    }

    return configs;
}