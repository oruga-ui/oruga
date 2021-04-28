import Inputitems from './Inputitems'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
    install(Vue) {
        registerComponent(Vue, Inputitems)
    }
}

use(Plugin)

export default Plugin

export {
    Inputitems as OInputitems
}
