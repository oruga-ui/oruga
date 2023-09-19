import type { App, Component, Plugin } from "vue";
import { useProgrammatic } from "./programmatic";

/** register a plugin to the vue app instance */
export const registerPlugin = (app: App, plugin: Plugin): void => {
    app.use(plugin);
};

/** register a component to the vue app instance */
export const registerComponent = (app: App, component: Component): void => {
    app.component(component.name, component);
};

/** register a global programmatic component to the oruga object */
export const registerProgrammaticComponent = (
    app: App,
    property: string,
    component: Component,
): void => {
    // use composable for unified access to programmatic oruga object
    const { oruga, addProgrammatic } = useProgrammatic();

    // add component (manipulates the programmatic oruga object)
    addProgrammatic(property, component);

    // add provide and $oruga (only needed once)
    if (!(app._context.provides && app._context.provides.oruga))
        app.provide("oruga", oruga);
    if (!app.config.globalProperties.$oruga)
        app.config.globalProperties.$oruga = oruga;
};
