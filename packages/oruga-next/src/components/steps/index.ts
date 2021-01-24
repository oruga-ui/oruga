import { App, Plugin } from 'vue'

import Steps from './Steps.vue'
import StepItem from './StepItem.vue'

import { registerComponent } from '../../utils/plugins'

export default {
    install(app: App) {
        registerComponent(app, Steps)
        registerComponent(app, StepItem)
    }
} as Plugin

export {
    Steps as OSteps,
    StepItem as OStepItem
}
