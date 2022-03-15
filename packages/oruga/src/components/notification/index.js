import Notification from './Notification'
import NotificationNotice from './NotificationNotice'

import { getOptions } from '../../utils/config'
import { getValueByPath } from '../../utils/helpers'
import { merge } from '../../utils/helpers'
import { VueInstance } from '../../utils/config'
import { use, registerComponent, registerComponentProgrammatic } from '../../utils/plugins'

let localVueInstance

const NotificationProgrammatic = {
    open(params) {
        let parent
        if (typeof params === 'string') {
            params = {
                message: params
            }
        }

        const defaultParam = {
            position: getValueByPath(getOptions(), 'notification.position', 'top-right'),
            closable: params.closable || getValueByPath(getOptions(), 'notification.closable', false)
        }
        if (params.parent) {
            parent = params.parent
            delete params.parent
        }
        let slot
        if (Array.isArray(params.message)) {
            slot = params.message
            delete params.message
        }
        // fix animation
        params.active = false
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
        const NotificationNoticeComponent = vm.extend(NotificationNotice)
        const component = new NotificationNoticeComponent({
            parent,
            el: document.createElement('div'),
            propsData
        })
        if (slot) {
            component.$slots.default = slot
            component.$forceUpdate()
        }
        // fix animation
        component.$children[0].isActive = true
        return component
    }
}

const Plugin = {
    install(Vue) {
        localVueInstance = Vue
        registerComponent(Vue, Notification)
        registerComponentProgrammatic(Vue, 'notification', NotificationProgrammatic)
    }
}

use(Plugin)

export default Plugin

export {
    Notification as ONotification,
    NotificationProgrammatic,
}
