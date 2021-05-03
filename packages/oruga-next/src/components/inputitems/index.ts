import { App, Plugin } from 'vue'

import Inputitems from './Inputitems.vue'

import { registerComponent } from '../../utils/plugins'

export default {
    install(Vue: App) {
        registerComponent(Vue, Inputitems)
    }
} as Plugin

export {
    Inputitems as OInputitems
}
