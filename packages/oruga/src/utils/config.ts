import { ref, toRaw, type App } from "vue";
import { getValueByPath, merge, setValueByPath } from "./helpers";
import { setVueInstance } from "./plugins";
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

export const OrugaConfig = {
    install(app: App, options?: OrugaOptions): void {
        // set global vue instance
        setVueInstance(app);
        // set options
        setOptions(merge(getOptions(), options, true));
    },
};
