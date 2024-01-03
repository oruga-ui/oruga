import type { ValidatableFormElement } from "@/composables";
import type { IconConfig } from "@/utils/icons";
import type { DynamicComponent } from "./utils";

export type ComponentContext = {
    props: Record<string, any>;
    data: Record<string, any>;
    computed: Record<string, any>;
};

export type ClassFunction = (
    suffix: string,
    ctx: ComponentContext,
) => string | undefined;

export type ClassObject = {
    class: string;
    /**
     * In case you want to override existing Oruga default classes for this class,
     * you can set the field override to true.
     */
    override?: boolean;
};

export type TransformFunction = (classes: string) => string;

export type ComponentClass = string | Array<string> | ClassFunction;

export type ClassDefinition =
    | string
    | Array<string>
    | ClassFunction
    | ClassObject;

export type ComponentConfigBase = Partial<{
    /**
     * In case you want to override existing Oruga default classes for this component,
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
    customIconPacks: Record<string, IconConfig>;
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
    /**
     * In case you want to override existing Oruga default classes all components completely,
     * you can specify the override behaviour here globaly.
     */
    override: boolean;
}>;

export interface OrugaOptions extends GlobalConfig {}
