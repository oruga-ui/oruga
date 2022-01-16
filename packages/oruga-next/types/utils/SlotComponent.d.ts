import { DefineComponent } from 'vue';
declare const _default: DefineComponent<{
    component: {
        type: ObjectConstructor;
        required: true;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    props: {
        type: ObjectConstructor;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    component: Record<string, any>;
    tag: string;
    name: string;
} & {
    props?: Record<string, any>;
}>, {
    tag: string;
    name: string;
}>;
export default _default;
