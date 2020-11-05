import vue from 'rollup-plugin-vue'
import node from '@rollup/plugin-node-resolve'
import cjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { eslint } from 'rollup-plugin-eslint'

import fs from 'fs'
import path from 'path'

import pack from './package.json'

const bannerTxt = `/*! Oruga Next v${pack.version} | MIT License | github.com/oruga-ui/oruga */`

const baseFolder = '../oruga/src/components/'

const components = fs
    .readdirSync(baseFolder)
    .filter((f) =>
        fs.statSync(path.join(baseFolder, f)).isDirectory()
    )

const entries = {
    'index': '../oruga/src/index.js',
    'helpers': '../oruga/src/utils/helpers.js',
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
                dir: `dist/esm`
            },
            plugins: [
                node({
                    extensions: ['.vue', '.js']
                }),
                eslint(),
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
                    extensions: ['.vue', '.js']
                }),
                eslint(),
                vue(vuePluginConfig),
                babel(babelOptions),
                cjs()
            ]
        },
        {
            input: '../oruga/src/index.js',
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
                    extensions: ['.vue', '.js']
                }),
                eslint(),
                vue(vuePluginConfig),
                babel(babelOptions),
                cjs()
            ]
        },
        {
            input: '../oruga/src/index.js',
            external: ['vue'],
            output: {
                format: 'esm',
                file: 'dist/oruga.esm.js',
                banner: bannerTxt
            },
            plugins: [
                node({
                    extensions: ['.vue', '.js']
                }),
                eslint(),
                vue(vuePluginConfig),
                babel(babelOptions),
                cjs()
            ]
        }
    ]

    if (process.env.MINIFY === 'true') {
        config = config.filter((c) => !!c.output.file)
        config.forEach((c) => {
            c.output.file = c.output.file.replace(/\.js/g, '.min.js')
            c.plugins.push(terser({
                output: {
                    comments: '/^!/'
                }
            }))
        })
    }
    return config
}
