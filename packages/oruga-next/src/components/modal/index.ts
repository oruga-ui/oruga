import { App, ComponentPropsOptions, createVNode, DefineComponent, Plugin, render } from 'vue'

import Modal from './Modal.vue'

import { VueInstance } from '../../utils/config'
import { merge } from '../../utils/helpers'
import { registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

let localVueInstance: App

const ModalProgrammatic = {
    open(params: OModal | string) {
        let parent
        let newParams
        if (typeof params === 'string') {
            newParams = {
                content: params
            }
        } else {
            newParams = params
        }

        const defaultParam = {
            programmatic: true
        }
        if (newParams.parent) {
            parent = newParams.parent
            delete newParams.parent
        }
        let slot
        if (Array.isArray(newParams.content)) {
            slot = newParams.content
            delete newParams.content
        }
        const propsData = merge(defaultParam, newParams)

        const app = localVueInstance || VueInstance
        /*
        const instance = new ModalComponent({
            parent,
            el: document.createElement('div'),
            propsData
        })
        if (slot) {
            instance.$slots.default = slot
        }
        return instance
        */
        const vnode = createVNode(Modal, propsData)
        vnode.appContext = app._context
        return render(vnode, document.createElement('div'))
    }
}

export default {
    install(app: App) {
        localVueInstance = app
        registerComponent(app, Modal)
        registerComponentProgrammatic(app, 'modal', ModalProgrammatic)
    }
} as Plugin

export {
    ModalProgrammatic,
    Modal as OModal
}

export interface OModal {
    parent: any | undefined;
    content: string | DefineComponent[] | undefined;
}
