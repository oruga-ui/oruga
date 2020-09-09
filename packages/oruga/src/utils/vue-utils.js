import { VueInstance } from './config'

export const isVue2 = (instance) => {
    const vm = instance || VueInstance
    return vm.version.indexOf('2.') == 0
}

export const use = (vm, plugin) => {
    vm.use(plugin)
}

export const component = (vm, component) => {
    vm.component(component.name, component)
}

export const setGlobalProperty = (vm, property, value) => {
    if (isVue2()) {
        vm.prototype[property] = value
    } else {
        vm.config.globalProperties[property] = value
    }
}

export const getGlobalProperty = (vm, property) => {
    return isVue2() ? vm.prototype[property] : vm.config.globalProperties[property]
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

export const createElement = (vue, tag, data, children) => {
    if (isVue2()) {
        const h = vue
        return h(tag, data, children)
    } else {
        const { h, withDirectives } = vue
        if (!data) return h(tag, data, children)
        let events = {}
        if (data.on) {
            Object.keys(data.on).map(k => {
                // add 'on' prefix and capitalize
                const eventName = `on${k.substring(0, 1)}${k.substring(1)}`
                return events[eventName] = data.on[k]
            })
        }
        const newData = {
            staticClass: data.staticClass,
            class: data.class,
            style: data.style,
            props: data.props,
            key: data.key,
            ref: data.ref,
            ...(data.attrs || {}),
            ...(data.domProps || {}),
            ...(events || {})
        }
        const vnode = h(tag, newData, children)
        if (data.directives) {
            console.log([...data.directives.map(d => [d.name, d.value])])
            return withDirectives(vnode, [...data.directives.map(d => [d.name, d.value])])
        }
        return vnode
    }
}
