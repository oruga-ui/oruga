import * as components from './components'

import { merge } from './utils/helpers'
import config, { setOptions, setVueInstance, Programmatic as ConfigProgrammatic } from './utils/config'
import { use, registerComponentProgrammatic, registerPlugin } from './utils/plugins'

const Oruga = {
    install(Vue, options = {}) {
        setVueInstance(Vue)
        // Options
        setOptions(merge(config, options, true))
        // Components
        for (const componentKey in components) {
            registerPlugin(Vue, components[componentKey])
        }
        // Config component
        registerComponentProgrammatic(Vue, 'config', ConfigProgrammatic)
    }
}

use(Oruga)

export default Oruga

// export all components as vue plugin
export * from './components'
// export programmatic components
export { LoadingProgrammatic } from './components/loading'
export { ModalProgrammatic } from './components/modal'
// export config plugin
export { Plugin as Config } from './utils/config'
