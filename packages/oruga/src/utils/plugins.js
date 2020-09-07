import { isVue2 } from "./vue-utils"

export const use = (plugin) => {
    if (typeof window !== 'undefined' && window.Vue) {
        window.Vue.use(plugin)
    }
}

export const registerPlugin = (vm, plugin) => {
    vm.use(plugin)
}

export const registerComponent = (vm, component) => {
    vm.component(component.name, component)
}

export const registerComponentProgrammatic = (vm, property, component) => {
    if (isVue2(vm)) {
        if (!vm.prototype.$oruga) vm.prototype.$oruga = {}
        vm.prototype.$oruga[property] = component
    } else {
        if (!vm.config.globalProperties.$oruga) vm.config.globalProperties.$oruga = {}
        vm.config.globalProperties[property] = component
    }
}
