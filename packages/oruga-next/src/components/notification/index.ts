import Notification from './Notification.vue'
import NotificationNotice from './NotificationNotice.vue'

import { getOptions } from '../../utils/config'
import { getValueByPath } from '../../utils/helpers'
import { merge } from '../../utils/helpers'
import { VueInstance } from '../../utils/config'
import { registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

import { App, createVNode, DefineComponent, Plugin, render } from 'vue'


let localVueInstance: App

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
            programmatic: true,
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

        const app = localVueInstance || VueInstance
        propsData.propsNotification = Object.assign({},propsData)
        propsData.propsNotification.isActive = true
        const defaultSlot = () => { return newParams.message }
        const vnode = createVNode(NotificationNotice, propsData, defaultSlot)
        vnode.appContext = app._context
        render(vnode, document.createElement('div'))
        return vnode.component.proxy as InstanceType<typeof NotificationNotice>
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
