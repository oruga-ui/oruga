import type { App, Plugin, defineComponent } from "vue";
import { addProgrammatic } from "./programmatic";
import { provideOruga } from "./config";
import type { ProgrammaticFactory } from "@/components/programmatic/useProgrammatic";

export let VueInstance: App | undefined;

/** set the global vue instance */
export const setVueInstance = (Vue: App): void => {
  VueInstance = Vue;
};

/** register a plugin to the vue app instance */
export const registerPlugin = (
  app: App,
  plugin: Plugin,
  options?: unknown,
): void => {
  app.use(plugin, options);
};

/** register a component to the vue app instance */
export const registerComponent = (
  app: App,
  component: ReturnType<typeof defineComponent>, // type Component isn't correct since vue 3.5 any more
): void => {
  app.component(component.name, component);
};

/** register a global programmatic component factory interface to the oruga object */
export const registerComponentInterface = (
  app: App,
  component: string,
  Factory: new () => ProgrammaticFactory,
): void => {
  // set global vue instance for programmatic usage
  setVueInstance(app);
  // add new programmatic component factory to the programmatic oruga object
  addProgrammatic(component, new Factory());
  // add `$oruga` as global property
  provideOruga(app);
};
