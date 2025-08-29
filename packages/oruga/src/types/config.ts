/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { ValidatableFormElement } from "@/composables";
import type { IconConfig } from "@/utils/icons";
import type { ClassBinding, ClassFunction, DynamicComponent } from "./utils";
import type { MaybeRefOrGetter } from "vue";

/** export option types */
export type {
    OptionsItem,
    OptionsPropItem,
    OptionsGroupItem,
    OptionsGroupPropItem,
    OptionsProp,
    SimpleOptionsProp,
    OptionsGroupProp,
    OptionsPropWithGroups,
} from "@/composables";

/** The class definition for a component class property. */
export type ComponentClass = ClassBinding | ClassBinding[] | ClassFunction;

/** The class object definiton a class in the global config object. */
export type ClassObject = {
    class: ComponentClass;
    /**
     * In case you want to override existing Oruga default classes for this class,
     * you can set the field override to true.
     */
    override?: boolean;
};

/** The class definition for a class in the global config object. */
export type ClassDefinition = ComponentClass | ClassObject;

/**
 * Global config transform classes function
 * @param classes - the compiled class string to transform
 * @returns transformed class string
 */
export type TransformFunction = (classes: string) => string;

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
    /** Define the Date format locale */
    locale: string;
    /** Define the icon pack be used */
    iconPack: string;
    /** Define custom icon packs */
    customIconPacks: Record<string, IconConfig>;
    /** Define a specific icon component */
    iconComponent: DynamicComponent;
    /**
     * Show input status icon using field and variant prop
     * @default true
     */
    statusIcon: boolean;
    /** Default mapping of variant and icon name */
    statusVariantIcon: {
        success: string;
        danger: string;
        info: string;
        warning: string;
    };
    /**
     * Teleport and programmatic default target
     * @default document.body
     */
    teleportTarget: MaybeRefOrGetter<string | HTMLElement>;
    /**
     * Enable default form components HTML5 validation attribute
     * @default true
     */
    useHtml5Validation: boolean;
    /** Custom HTML5 validation invalid handler */
    invalidHandler: (
        validatable: ValidatableFormElement,
        fieldElement?: Element | undefined,
    ) => void;
    /** You can use transformClasses globally if you need to transform classes for any component. */
    transformClasses: TransformFunction;
    /** Mobile breakpoint as `max-width` value */
    mobileBreakpoint: string;
    /**
     * In case you want to override existing Oruga default classes all components completely,
     * you can specify the override behaviour here globaly.
     */
    override: boolean;
    /**
     * @private
     * @ignore
     */
    environment: "docs" | "examples";
}>;

export interface OrugaOptions extends GlobalConfig {}
