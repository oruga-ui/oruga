import vue from 'rollup-plugin-vue'
import node from '@rollup/plugin-node-resolve'
import cjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2';

import fs from 'fs'
import path from 'path'

import pack from './package.json'

const bannerTxt = `/*! Oruga v${pack.version} | MIT License | github.com/oruga-ui/oruga */`

const baseFolder = './src/components/'

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
    }, {})
}

const babelOptions = {
    babelHelpers: 'bundled'
}

const vuePluginConfig = {
    template: {
        isProduction: true,
        compilerOptions: {
            whitespace: 'condense'
        }
    }
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export default () => {
    let config = [
        {
            input: entries,
            external: ['vue'],
            output: {
                format: 'esm',
                dir: `dist/esm`,
                entryFileNames: '[name].mjs',
                chunkFileNames: '[name]-[hash].mjs',
            },
            plugins: [
                node({
                    extensions: ['.vue', '.ts']
                }),
                typescript({
                    typescript: require('typescript')
                }),
                vue(vuePluginConfig),
                babel(babelOptions),
                cjs()
            ]
        },
        {
            input: entries,
            external: ['vue'],
            output: {
                format: 'cjs',
                dir: 'dist/cjs',
                exports: 'named'
            },
            plugins: [
                node({
                    extensions: ['.vue', '.ts']
                }),
                typescript({
                    typescript: require('typescript')
                }),
                vue(vuePluginConfig),
                babel(babelOptions),
                cjs()
            ]
        },
        {
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
            plugins: [
                node({
                    extensions: ['.vue', '.ts']
                }),
                typescript({
                    typescript: require('typescript')
                }),
                vue(vuePluginConfig),
                babel(babelOptions),
                cjs()
            ]
        },
        {
            input: 'src/index.ts',
            external: ['vue'],
            output: {
                format: 'esm',
                file: 'dist/oruga.mjs',
                banner: bannerTxt
            },
            plugins: [
                node({
                    extensions: ['.vue', '.ts']
                }),
                typescript({
                    typescript: require('typescript')
                }),
                vue(vuePluginConfig),
                babel(babelOptions),
                cjs()
            ]
        }
    ]

    if (process.env.MINIFY === 'true') {
        config = config.filter((c) => !!c.output.file)
        config.forEach((c) => {
            c.output.file = c.output.file.replace(/\.m?js/g, r => `.min${r}`)
            c.plugins.push(terser({
                output: {
                    comments: '/^!/'
                }
            }))
        })
    }
    return config
}
