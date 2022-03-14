import { App, ComponentPropsOptions, createVNode, Plugin, render } from 'vue'

import Loading from './Loading.vue'

import { VueInstance } from '../../utils/config'
import { merge } from '../../utils/helpers'
import { registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

let localVueInstance: App

const LoadingProgrammatic = {
    open(params: Readonly<ComponentPropsOptions>) : InstanceType<typeof Loading> {
        const defaultParam = {
            programmatic: true
        }
        const propsData = merge(defaultParam, params)

        const app = localVueInstance || VueInstance
        const vnode = createVNode(Loading, propsData)
        vnode.appContext = app._context
        render(vnode, document.createElement('div'))
        return vnode.component.proxy as InstanceType<typeof Loading>
    }
}

export default {
    install(app: App) {
        localVueInstance = app
        registerComponent(app, Loading)
        registerComponentProgrammatic(app, 'loading', LoadingProgrammatic)
    }
} as Plugin

export {
    LoadingProgrammatic,
    Loading as OLoading
}
