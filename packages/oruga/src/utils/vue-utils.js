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
            if (!data) return exports.h(tag, data, children)
            let on = {}
            if (data.on) {
                Object.keys(data.on).forEach(k => {
                    // add 'on' prefix and capitalize
                    const event = `on${k.substring(0, 1)}${k.substring(1)}`
                    on[event] = data.on[k]
                }) 
            } 
            const newData = {
                staticClass: data.staticClass,
                class: data.class,
                style: data.style,
                props: data.props,
                key: data.key,
                ref: data.ref,
                directives: data.directives,
                ...(data.attrs || {}),
                ...(data.domProps || {}),
                ...(on || {})
            }
            exports.h(tag, newData, children)
        })
    }
}