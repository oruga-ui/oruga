import { Component, InjectionKey } from "vue";

// oruga object for programmatic components
const oruga: Record<string, Component> = {};

/**
 * Added key for app level provide completion
 * following: https://vuejs.org/guide/typescript/composition-api.html#typing-provide-inject
 */
const providerKey = Symbol() as InjectionKey<typeof oruga>

// add components to the oruga object
function addProgrammatic(property: string, component: Component) {
    oruga[property] = component;
}

// composable for internal and external usage
export function useProgrammatic() {
    return { oruga, addProgrammatic, providerKey };
}
