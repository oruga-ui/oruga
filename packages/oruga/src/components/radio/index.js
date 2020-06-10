import Radio from './Radio'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Radio)
    }
}

use(Plugin)

export default Plugin

export {
    Radio as ORadio
}
