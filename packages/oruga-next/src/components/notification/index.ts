import Notification from './Notification.vue'
import NotificationNotice from './NotificationNotice.vue'

import { getOptions } from '../../utils/config'
import { getValueByPath } from '../../utils/helpers'
import { merge } from '../../utils/helpers'
import { VueInstance } from '../../utils/config'
import { registerComponent, registerComponentProgrammatic } from '../../utils/plugins'
import InstanceRegistry from "../..//utils/InstanceRegistry"

import { App, createVNode, DefineComponent, Plugin, render } from 'vue'


let localVueInstance: App

let instances = new InstanceRegistry()

const NotificationProgrammatic = {
    open(params) : InstanceType<typeof NotificationNotice>{
        let newParams
        if (typeof params === 'string') {
            newParams = {
                message: params
            }
        } else {
            newParams = params
        }

        const defaultParam = {
            programmatic: { instances },
            position: getValueByPath(getOptions(), 'notification.position', 'top-right'),
            closable: params.closable || getValueByPath(getOptions(), 'notification.closable', false)
        }
        let slot
        if (Array.isArray(newParams.message)) {
            slot = newParams.message
            delete newParams.message
        }

        newParams.active = true
        const propsData = merge(defaultParam, newParams)
        propsData.promise = new Promise((p1, p2) => {
            propsData.programmatic.resolve = p1
            propsData.programmatic.reject = p2
        })

        const app = localVueInstance || VueInstance
        propsData.propsNotification = Object.assign({},propsData)
        propsData.propsNotification.isActive = true
        const defaultSlot = () => { return newParams.message }
        const vnode = createVNode(NotificationNotice, propsData, defaultSlot)
        vnode.appContext = app._context
        render(vnode, document.createElement('div'))
        return vnode.component.proxy as InstanceType<typeof NotificationNotice>
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
        registerComponent(app, Notification)
        registerComponentProgrammatic(app, 'notification', NotificationProgrammatic)
    }
} as Plugin

export {
    Notification as ONotification,
    NotificationProgrammatic,
}

export interface ONotification {
    content: string | DefineComponent[] | undefined;
}
