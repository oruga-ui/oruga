import vue from '@vitejs/plugin-vue'
import istanbul from 'vite-plugin-istanbul'

// https://vitejs.dev/config/
export default {
    open: true,
    port: 3000,
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
}
