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
    teleportTarget: () => (isClient ? document.body : "body"),
});

export const setOptions = (options: OrugaOptions): void => {
    globalOptions.value = options;
};

export const getOptions = (): OrugaOptions => {
    return Object.assign({}, toRaw(globalOptions.value));
};

export const getOption = <K extends DeepKeys<OrugaOptions>>(
    path: K,
    defaultValue?: DeepType<OrugaOptions, K>,
): DeepType<OrugaOptions, K> | undefined => {
    return getValueByPath(globalOptions.value, path, defaultValue);
};

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
