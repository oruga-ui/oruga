import { App } from 'vue'

import * as components from './components'

import { merge } from './utils/helpers'
import { setOptions, setVueInstance, Programmatic as ConfigProgrammatic, getOptions } from './utils/config'
import { registerComponentProgrammatic, registerPlugin } from './utils/plugins'

const Oruga = {
    install(app: App, options = {}) {
        setVueInstance(app)
        // Options
        const defaultConfig = getOptions()
        setOptions(merge(defaultConfig, options, true))
        // Components
        for (const componentKey in components) {
            registerPlugin(app, (components as any)[componentKey])
        }
        // Config component
        registerComponentProgrammatic(app, 'config', ConfigProgrammatic)
    }
}

export default Oruga

// export all components as vue plugin
export * from './components'
// export programmatic components
export { LoadingProgrammatic } from './components/loading'
export { ModalProgrammatic } from './components/modal'

// export config plugin
export { Plugin as Config } from './utils/config'
