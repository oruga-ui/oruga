import { App } from "vue";
export declare const setOptions: (options: any) => void;
export declare const getOptions: () => {
    iconPack: string;
    useHtml5Validation: boolean;
    statusIcon: boolean;
    transformClasses: any;
};
export declare let VueInstance: App;
export declare const setVueInstance: (Vue: App<any>) => void;
export declare const Programmatic: {
    getOptions: () => {
        iconPack: string;
        useHtml5Validation: boolean;
        statusIcon: boolean;
        transformClasses: any;
    };
    setOptions(options: any): void;
};
export declare const Plugin: {
    install(Vue: App<any>, options?: {}): void;
};
