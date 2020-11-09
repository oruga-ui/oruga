import { App, Plugin } from 'vue'

import Field from './Field.vue'

import { registerComponent } from '../../utils/plugins'

export default {
    install(app: App) {
        registerComponent(app, Field)
    }
} as Plugin

export {
    Field as OField
}

export interface OField {
    // props
    variant?: string | {[key: string]: string},
    message?: string
    // data
    newVariant?: string | {[key: string]: string},
    newMessage?: string
    // computed
    hasMessageSlot: boolean
}
