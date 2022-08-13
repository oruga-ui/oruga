import * as plugins from './components/plugins'

import { merge } from './utils/helpers'
import { setOptions, setVueInstance, Programmatic as ConfigProgrammatic, getOptions } from './utils/config'
import { use, registerComponentProgrammatic, registerPlugin } from './utils/plugins'

const Oruga = {
    install(Vue, options = {}) {
        setVueInstance(Vue)
        // Options
        const defaultConfig = getOptions()
        setOptions(merge(defaultConfig, options, true))
        // Components
        for (const componentKey in plugins) {
            registerPlugin(Vue, plugins[componentKey])
        }
        // Config component
        registerComponentProgrammatic(Vue, 'config', ConfigProgrammatic)
    }
}

use(Oruga)

export default Oruga

// export all vue components
export * from './components'
// export all components as vue plugin
export * from './components/plugins'
// export programmatic components
export { LoadingProgrammatic } from './components/loading'
export { ModalProgrammatic } from './components/modal'
export { NotificationProgrammatic } from './components/notification'
export { Programmatic as ConfigProgrammatic } from './utils/config'

// export config plugin
export { Plugin as Config } from './utils/config'
