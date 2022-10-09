import type { App, Plugin } from 'vue'

import Upload from './Upload.vue'

import { registerComponent } from '../../utils/plugins'

export default {
    install(app: App) {
        registerComponent(app, Upload)
    }
} as Plugin

export {
    Upload as OUpload
}
