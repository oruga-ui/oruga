import { ref, toRaw, type App } from "vue";
import { getValueByPath, merge, setValueByPath } from "./helpers";
import { setVueInstance } from "./plugins";
import type { DeepType, OrugaOptions } from "@/types";

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
});

export const setOptions = (options: OrugaOptions): void => {
    globalOptions.value = options;
};

export const getOptions = (): OrugaOptions => {
    return Object.assign({}, toRaw(globalOptions.value));
};

export const getOption = <K extends string = string>(
    path: K,
    defaultValue?: DeepType<OrugaOptions, K>,
): DeepType<OrugaOptions, K> => {
    return getValueByPath(globalOptions.value, path, defaultValue);
};

/** less type strict version of getOption for component props defaults */
export const getDefault = <T>(path: string, defaultValue?: T): T => {
    return getValueByPath(globalOptions.value, path, defaultValue) as T & {};
};

export const setOption = <T>(path: string, value: T): void => {
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
