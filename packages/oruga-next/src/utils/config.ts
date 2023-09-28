import type { App } from "vue";

import { merge } from "./helpers";

let config = {
    iconPack: "mdi",
    useHtml5Validation: true,
    statusIcon: true,
    transformClasses: undefined,
};

export const setOptions = (options: any) => {
    config = options;
};

export const getOptions = () => {
    return config;
};

export let VueInstance: App;

export const setVueInstance = (Vue: App) => {
    VueInstance = Vue;
};

export const Programmatic = {
    getOptions,
    setOptions(options: any) {
        setOptions(merge(getOptions(), options, true));
    },
};

export const Plugin = {
    install(Vue: App, options = {}) {
        setVueInstance(Vue);
        // Options
        setOptions(merge(getOptions(), options, true));
    },
};
