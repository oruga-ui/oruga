import Loading from './Loading'

import { VueInstance } from '../../utils/config'
import { merge } from '../../utils/helpers'
import { use, registerComponent, registerComponentProgrammatic } from '../../utils/plugins'
import InstanceRegistry from "../../utils/InstanceRegistry"

let localVueInstance

let instances = new InstanceRegistry()

const LoadingProgrammatic = {
    open(params) {
        let parent

        const defaultParam = {
            programmatic: { instances }
        }
        if (params.parent) {
            parent = params.parent
            delete params.parent
        }
        const propsData = merge(defaultParam, params)
        if (window.Promise) {
            propsData.promise = new Promise((p1, p2) => {
                propsData.programmatic.resolve = p1
                propsData.programmatic.reject = p2
            })
        }
        const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || VueInstance
        const LoadingComponent = vm.extend(Loading)
        return new LoadingComponent({
            parent,
            el: document.createElement('div'),
            propsData
        })
    },
    closeAll() {
        instances.walk((entry) => {
            entry.close(...arguments)
        })
    }
}

const Plugin = {
    install(Vue) {
        localVueInstance = Vue
        registerComponent(Vue, Loading)
        registerComponentProgrammatic(Vue, 'loading', LoadingProgrammatic)
    }
}

use(Plugin)

export default Plugin

export {
    LoadingProgrammatic,
    Loading as OLoading
}
