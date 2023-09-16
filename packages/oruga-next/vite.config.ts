import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import istanbul from 'vite-plugin-istanbul'

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
    root: __dirname,
    server: {
        open: true,
        port: 3000,
    },
    build: {
        sourcemap: true
    },
    plugins: [
        vue(),
        istanbul({
            include: 'src/*',
            exclude: ["node_modules", "cypress/", "**/tests/*"],
            extension: [".ts", ".vue"],
            cypress: true,
        })
    ]
})
