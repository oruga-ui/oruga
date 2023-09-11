import type { App, DefineComponent, Plugin } from 'vue'
import { createVNode, render } from 'vue'

import Modal from './Modal.vue'

import { VueInstance } from '../../utils/config'
import { merge } from '../../utils/helpers'
import { registerComponent, registerComponentProgrammatic } from '../../utils/plugins'
import InstanceRegistry from "../../utils/InstanceRegistry"

let localVueInstance: App

let instances = new InstanceRegistry()

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
            programmatic: { instances }
        }
        let slot
        if (Array.isArray(newParams.content)) {
            slot = newParams.content
            delete newParams.content
        }
        const propsData = merge(defaultParam, newParams)
        propsData.promise = new Promise((p1, p2) => {
            propsData.programmatic.resolve = p1
            propsData.programmatic.reject = p2
        })

        const app = localVueInstance || VueInstance
        const defaultSlot = () => { return slot }
        const vnode = createVNode(Modal, propsData, defaultSlot)
        vnode.appContext = app._context
        render(vnode, document.createElement('div'))
        return vnode.component.proxy as InstanceType<typeof Modal>
    },
    closeAll() {
        instances.walk((entry) => {
            entry.close(...arguments)
        })
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
