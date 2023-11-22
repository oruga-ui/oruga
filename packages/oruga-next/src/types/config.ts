import type { ValidatableFormElement } from "@/composables";
import type { IconConfig } from "@/utils/icons";
import type { DynamicComponent } from "./utils";

export type ComponentContext = {
    props: Record<string, any>;
    data: Record<string, any>;
    computed: Record<string, any>;
};

export type ClassFunction = (suffix: string, ctx: ComponentContext) => string;

export type ClassObject = {
    class: string;
    /**
     * In case you want to override Oruga existing classes completely,
     * you can specify the override behaviour for each class by set the field override to true.
     */
    override?: boolean;
};

export type TransformFunction = (classes: string) => string;

export type ClassDefinition = undefined | string | ClassFunction | ClassObject;

export type ComponentConfigBase = Partial<{
    /**
     * In case you want to override existing Oruga classes completely,
     * you can set the field override to true.
     */
    override: boolean;
    /** Use this function in case you want to transform all applied classes' names. */
    transformClasses: TransformFunction;
}>;

export type GlobalConfig = Partial<{
    /** Define the icon pack be used */
    iconPack: string;
    /** Define custom icon packs */
    customIconPacks: IconConfig[];
    /** Define a specific icon component */
    iconComponent: DynamicComponent;
    /** Enable HTML5 validation */
    useHtml5Validation: boolean;
    /** Show input status icon using field and variant prop */
    statusIcon: boolean;
    /** Custom HTML5 validation invalid handler */
    invalidHandler: (
        validatable: ValidatableFormElement,
        fieldElement: Element,
    ) => void;
    /** You can use transformClasses globally if you need to transform classes for any component. */
    transformClasses: TransformFunction;
}>;

export interface OrugaOptions extends GlobalConfig {}
