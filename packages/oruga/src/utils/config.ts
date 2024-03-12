import { ref, toRaw, type App } from "vue";
import { getValueByPath, merge, clone, setValueByPath } from "./helpers";
import { setVueInstance } from "./plugins";
import type { OrugaOptions } from "@/types";

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
    return clone(toRaw(globalOptions.value));
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

export const OrugaConfig = {
    install(app: App, options?: OrugaOptions): void {
        // set global vue instance
        setVueInstance(app);
        // set options
        setOptions(merge(getOptions(), options, true));
    },
};
