import { App, Plugin } from 'vue'

import Steps from './Steps.vue'
import StepsItem from './StepsItem.vue'

import { registerComponent } from '../../utils/plugins'

export default {
    install(app: App) {
        registerComponent(app, Steps)
        registerComponent(app, StepsItem)
    }
} as Plugin

export {
    Steps as OSteps,
    StepsItem as OStepsItem
}
