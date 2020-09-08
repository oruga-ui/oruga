import {
    use as vueUse,
    component as vueComponent,
    setGlobalProperty,
    getGlobalProperty
} from "./vue-utils"

export const use = (plugin) => {
    if (typeof window !== 'undefined' && window.Vue) {
        vueUse(window.Vue, plugin)
    }
}

export const registerPlugin = (vm, plugin) => {
    vueUse(vm, plugin)
}

export const registerComponent = (vm, component) => {
    vueComponent(vm, component)
}

export const registerComponentProgrammatic = (vm, property, component) => {
    let oruga = getGlobalProperty(vm, '$oruga')
    if (!oruga) oruga = {}
    oruga[property] = component
    setGlobalProperty(vm, '$oruga', oruga)
}
