import { App, Component, Plugin } from 'vue'
import { useProgrammatic } from './useProgrammatic'

export const registerPlugin = (app: App, plugin: Plugin) => {
    app.use(plugin)
}

export const registerComponent = (app: App, component: Component) => {
    app.component(component.name, component)
}

export const registerComponentProgrammatic = (app: App, property: string, component: Component) => {
    // use composable for unified access to programmatic oruga object
    const { oruga, addProgrammatic } = useProgrammatic();

    // add component (manipulates the programmatic oruga object)
    addProgrammatic(property, component);

    // add provide and $oruga (only needed once)
    if (!(app._context.provides && app._context.provides.oruga)) app.provide('oruga', oruga);
    if (!app.config.globalProperties.$oruga) app.config.globalProperties.$oruga = oruga;
  }
