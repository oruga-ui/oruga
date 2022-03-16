import Loading from './Loading'

import { VueInstance } from '../../utils/config'
import { merge } from '../../utils/helpers'
import { use, registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

let localVueInstance

const LoadingProgrammatic = {
    open(params) {
        let parent

        const defaultParam = {
            programmatic: true
        }
        if (params.parent) {
            parent = params.parent
            delete params.parent
        }
        const propsData = merge(defaultParam, params)
        if (window.Promise) {
            let resolve, reject;
            propsData.promise = new Promise((p1, p2) => {
                resolve = p1
                reject = p2
            })
            propsData.programmatic = {resolve, reject}
        }
        const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || VueInstance
        const LoadingComponent = vm.extend(Loading)
        return new LoadingComponent({
            parent,
            el: document.createElement('div'),
            propsData
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
