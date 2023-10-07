import { ref, type App } from "vue";
import { getValueByPath, merge, setValueByPath } from "./helpers";
import type { OrugaOptions } from "@/types";

export let VueInstance: App;

export const setVueInstance = (Vue: App): void => {
    VueInstance = Vue;
};

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
    return globalOptions.value;
};

export const getOption = <T>(path: string, defaultValue?: T): T => {
    return getValueByPath(globalOptions.value, path, defaultValue);
};

export const setOption = <T>(path: string, defaultValue: T): void => {
    setValueByPath(globalOptions.value, path, defaultValue);
};

export const ConfigProgrammatic = {
    getOption,
    getOptions,
    setOption,
    setOptions(options: OrugaOptions): void {
        setOptions(merge(getOptions(), options, true));
    },
};

export const ConfigPlugin = {
    install(app: App, options?: OrugaOptions): void {
        // set global vue instance
        setVueInstance(app);
        // set options
        setOptions(merge(getOptions(), options, true));
    },
};
