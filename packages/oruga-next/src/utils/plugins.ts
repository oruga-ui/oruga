
import { App, DefineComponent, Plugin } from 'vue'

export const registerPlugin = (app: App, plugin: Plugin) => {
    app.use(plugin)
}

export const registerComponent = (app: App, component: DefineComponent) => {
    app.component(component.name, component)
}

export const registerComponentProgrammatic = (app: App, property: string, component: DefineComponent) => {
    let oruga = app.config.globalProperties.$oruga
    if (!oruga) oruga = {}
    app.config.globalProperties.$oruga[property] = component
}
