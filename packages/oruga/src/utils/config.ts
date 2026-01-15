import { ref, toRaw, type App } from "vue";
import { getValueByPath, merge, setValueByPath } from "./helpers";
import { setVueInstance } from "./plugins";
import { addProgrammatic, useOruga } from "./programmatic";
import { isClient } from "./ssr";
import type { DeepKeys, DeepType, OrugaOptions } from "@/types";

declare module "../index" {
  interface OrugaProgrammatic {
    config: typeof ConfigProgrammatic;
  }
}

const globalOptions = ref<OrugaOptions>({
  iconPack: "mdi",
  useHtml5Validation: true,
  statusIcon: true,
  transformClasses: undefined,
  mobileBreakpoint: "1023px",
  teleportTarget: () => (isClient ? document.body : "body"),
});

export const setOptions = (options: OrugaOptions): void => {
  globalOptions.value = options;
};

export const getOptions = (): OrugaOptions => {
  return Object.assign({}, toRaw(globalOptions.value));
};

/** get an option by option path with an optional default if not set */
export function getOption<
  K extends DeepKeys<OrugaOptions>,
  D extends DeepType<OrugaOptions, K>,
>(path: K | (string & {}), defaultValue: D): D;
export function getOption<
  K extends DeepKeys<OrugaOptions>,
  D extends DeepType<OrugaOptions, K>,
>(path: K | (string & {}), defaultValue?: D): D | undefined;
export function getOption<
  K extends DeepKeys<OrugaOptions>,
  D extends DeepType<OrugaOptions, K>,
>(path: K | (string & {}), defaultValue?: D): D | undefined {
  return getValueByPath<OrugaOptions, K, D>(
    globalOptions.value,
    path,
    defaultValue,
  );
}

/** less type strict version of getOption for component props defaults */
export const getDefault = <T>(
  path: DeepKeys<OrugaOptions>,
  defaultValue?: T,
): T => {
  return getValueByPath(globalOptions.value, path, defaultValue) as T & {};
};

export const setOption = <K extends DeepKeys<OrugaOptions>>(
  path: K,
  value: DeepType<OrugaOptions, K>,
): void => {
  setValueByPath(globalOptions.value, path, value);
};

export const ConfigProgrammatic = {
  getOption,
  getOptions,
  setOption,
  setOptions(options: OrugaOptions): void {
    setOptions(merge(getOptions(), options, true));
  },
};

export function useProgrammaticConfig(): typeof ConfigProgrammatic {
  return ConfigProgrammatic;
}

export const OrugaConfig = {
  install(app: App, options?: OrugaOptions): void {
    // set global vue instance for programmatic usage
    setVueInstance(app);
    // set additional options
    setOptions(merge(getOptions(), options, true));
    // add programmatic config interface to the programmatic oruga object
    addProgrammatic("config", ConfigProgrammatic);
    // add `$oruga` as global property
    provideOruga(app);
  },
};

/**
 * Adds the programmatic Oruga interface as a global property
 * and provides it on the Vue instance.
 */
export function provideOruga(app: App): void {
  // use composable for unified access to programmatic oruga object
  const oruga = useOruga();
  // add provide and $oruga (only needed once)
  if (!(app._context.provides && app._context.provides.oruga))
    app.provide("oruga", oruga);
  if (!app.config.globalProperties.$oruga)
    app.config.globalProperties.$oruga = oruga;
}
