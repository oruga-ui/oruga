import { ref, type App } from "vue";
import { merge } from "./helpers";
import type { OrugaOptions } from "@/types";

const options = ref<OrugaOptions>({
    iconPack: "mdi",
    useHtml5Validation: true,
    statusIcon: true,
    transformClasses: undefined,
});

export const setOptions = (options: OrugaOptions): void => {
    options.value = options;
};

export const getOptions = (): OrugaOptions => {
    return options.value;
};

export const ConfigProgrammatic = {
    getConfig: getOptions,
    setConfig(options: OrugaOptions): void {
        setOptions(merge(getOptions(), options, true));
    },
};

export const ConfigPlugin = {
    install(Vue: App, options?: OrugaOptions): void {
        // set options
        setOptions(merge(getOptions(), options, true));
    },
};
