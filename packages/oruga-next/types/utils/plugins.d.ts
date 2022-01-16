import { App, DefineComponent, Plugin } from 'vue';
export declare const registerPlugin: (app: App<any>, plugin: Plugin) => void;
export declare const registerComponent: (app: App<any>, component: DefineComponent<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    [x: string]: any;
}> | Readonly<{
    [x: string]: any;
} & {
    [x: number]: any;
}>, {} | {
    [x: string]: any;
}>) => void;
export declare const registerComponentProgrammatic: (app: App<any>, property: string, component: any) => void;
