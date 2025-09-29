import type { App, defineComponent } from "vue";
import type { ProgrammaticFactory } from "@/components/programmatic/useProgrammatic";
import { type Oruga } from "./config";

/**
 * register a component to the vue app instance
 * @internal
 */
export const registerComponent = (
    app: App,
    component: ReturnType<typeof defineComponent>, // type Component isn't correct since vue 3.5 any more
): void => {
    app.component(component.name, component);
};

/**
 * register a global programmatic component factory interface to the oruga object
 * @internal
 */
export const registerProgrammatic = (
    oruga: Oruga,
    component: string,
    Factory: new () => ProgrammaticFactory,
): void => {
    // add new programmatic component factory to the programmatic oruga object
    addProgrammatic(oruga, component, new Factory());
};

/**
 * Add components programmatic interfaces to the current oruga instance.
 * @internal
 */
export function addProgrammatic(
    oruga: Oruga,
    property: string,
    component: object,
): void {
    // add the component on the property to the programmatic interface
    oruga[property] = component;
}
