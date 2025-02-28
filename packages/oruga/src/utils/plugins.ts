import type { App, Component, Plugin, defineComponent } from "vue";
import { useOruga, addProgrammatic } from "./programmatic";

export let VueInstance: App | undefined;

/** set the global vue instance */
export const setVueInstance = (Vue: App): void => {
    VueInstance = Vue;
};

/** register a plugin to the vue app instance */
export const registerPlugin = (app: App, plugin: Plugin): void => {
    app.use(plugin);
};

/** register a component to the vue app instance */
export const registerComponent = (
    app: App,
    component: ReturnType<typeof defineComponent>, // type Component isn't correct since vue 3.5 any more
): void => {
    app.component(component.name, component);
};

/** register a global programmatic component to the oruga object */
export const registerComponentProgrammatic = (
    app: App,
    property: string,
    component: Component,
): void => {
    // set global vue instance
    setVueInstance(app);
    // use composable for unified access to programmatic oruga object
    const oruga = useOruga();
    // add component (manipulates the programmatic oruga object)
    addProgrammatic(property, component);

    // add provide and $oruga (only needed once)
    if (!(app._context.provides && app._context.provides.oruga))
        app.provide("oruga", oruga);
    if (!app.config.globalProperties.$oruga)
        app.config.globalProperties.$oruga = oruga;
};
