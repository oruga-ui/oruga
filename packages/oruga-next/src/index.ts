import { App } from 'vue'

import * as components from './components'

import { merge } from './utils/helpers'
import config, { setOptions, setVueInstance } from './utils/config'
import { registerPlugin } from './utils/plugins'


const Oruga = {
    install(app: App, options = {}) {
        setVueInstance(app)
        // Options
        setOptions(merge(config, options, true))
        // Components
        for (const componentKey in components) {
            registerPlugin(app, components[componentKey])
        }
    }
}

export default Oruga

// export all components as vue plugin
export * from './components'
// export programmatic components
export { LoadingProgrammatic } from './components/loading'
export { ModalProgrammatic } from './components/modal'
