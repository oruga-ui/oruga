import { VueInstance } from './config'

export const isVue2 = (instance) => {
    const vm = instance || VueInstance
    return vm.version.indexOf('2') >= 0 
}

export const getScopedSlot = (cmp, name) => {
    return isVue2() ? cmp.$scopedSlots[name] : cmp.$slots[name]
}

export const setScopedSlot = (cmp, name, data) => {
    if (isVue2()) {
        cmp.$scopedSlots = {
            [name]: data
        }
    } else {
        cmp.$slots = {
            [name]: data
        }
    }
}

export const nextTick = (cmp, callback) => {
    if (isVue2()) {
        cmp.$nextTick(callback)
    } else {
        import('vue').then(exports => {
            exports.nextTick(callback)
        })
    }
}

export const createElement = (h, tag, data, children) => {
    if (isVue2()) {
        return h(tag, data, children)
    } else {
        import('vue').then(exports => {
            let on = {}
            if (element.on) {
                Object.keys(element.on).forEach(k => {
                    // remove 'on' prefix and fix to lowercase the first char
                    const event = k.substring(2)
                    event[0] = event[0].toLowerCase()
                    on[event] = element.on[k]
                }) 
            } 
            const newData = {
                staticClass: element.staticClass,
                class: element.class,
                style: element.style,
                props: element.props,
                key: element.key,
                ref: element.ref,
                directives: element.directives,
                ...(element.attrs || {}),
                ...(element.domProps || {}),
                ...(on || {})
            }
            exports.h(tag, newData, children)
        })
    }
}