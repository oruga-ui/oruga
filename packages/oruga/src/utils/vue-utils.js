import { VueInstance } from './config'

export const isVue2 = (instance) => {
    const vm = instance || VueInstance
    return !vm || (vm && vm.version.indexOf('2.') === 0)
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

export const getListeners = (cmp) => {
    return isVue2() ? cmp.$listeners : cmp.$attrs
}

export const existsSlot = (cmp, name, scoped = false) => {
    if (isVue2()) {
        return scoped ? !!cmp.$scopedSlots[name] : !!cmp.$slots[name]
    } 
    return cmp.$slots[name]
}

export const getSlotInstance = (cmp, name, scoped = false, props = undefined) => {
    if (isVue2()) {
        return scoped ? cmp.$scopedSlots[name](props) : cmp.$slots[name]
    } 
    return scoped ? cmp.$slots[name](props) : cmp.$slots[name]()
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
        if (!data) {
            return h(resolveTag(tag, vue), data, wrapChildren(tag, children))
        }
        const vnode = h(resolveTag(tag, vue), convertData(data), wrapChildren(tag, children))
        return data.directives ? withDirectives(vnode, resolveDirectives(data.directives, vue)) : vnode
    }
}

const resolveTag = (tag, vue) => {
    const { Transition } = vue
    return tag === 'transition' ? Transition : tag
}

const resolveDirectives = (directives, vue) => {
    const { resolveDirective, vShow } = vue
    return [...directives.map(d => [ d.name === 'show' ? vShow : resolveDirective(d.name), d.value])]
}

const convertData = (data) => {
    const events = {}
    if (data.on) {
        Object.keys(data.on).map(k => {
            // add 'on' prefix and capitalize
            const eventName = `on${k.substring(0, 1)}${k.substring(1)}`
            return events[eventName] = data.on[k]
        })
    }
    return {
        class: [...(data.class || []), data.staticClass],
        style: data.style,
        key: data.key,
        ref: data.ref,
        ...(data.props || {}),
        ...(data.attrs || {}),
        ...(data.domProps || {}),
        ...(events || {})
    }
}

const wrapChildren = (tag, children) => {
    return tag === 'transition' ? () => children : children 
}