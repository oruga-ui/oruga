import { Component } from "vue";

// oruga object for programmatic components
const oruga: Record<string, Component> = {};

// add components to the oruga object
function addProgrammatic(property: string, component: Component) {
    oruga[property] = component;
}

// composable for internal and external usage
export function useProgrammatic() {
    return { oruga, addProgrammatic };
}
