import { App, createVNode, DefineComponent, Plugin, render } from 'vue'

import Modal from './Modal.vue'

import { VueInstance } from '../../utils/config'
import { merge } from '../../utils/helpers'
import { registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

let localVueInstance: App

const ModalProgrammatic = {
    open(params: OModal | string) : InstanceType<typeof Modal> {
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
        let slot
        if (Array.isArray(newParams.content)) {
            slot = newParams.content
            delete newParams.content
        }
        const propsData = merge(defaultParam, newParams)

        const app = localVueInstance || VueInstance
        const vnode = createVNode(Modal, propsData)
        vnode.appContext = app._context
        render(vnode, document.createElement('div'))
        return vnode.component.proxy as InstanceType<typeof Modal>
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
    content: string | DefineComponent[] | undefined;
}
