import type { ValidatableFormElement } from "@/composables";

export type ComponentContext = {
    props: Record<string, any>;
    data: Record<string, any>;
    computed: Record<string, any>;
};

export type FieldFunction = (suffix: string, ctx: ComponentContext) => string;

export type FieldObject = {
    class: string;
    /**
     * In case you want to override Oruga existing classes completely,
     * you can specify the override behaviour for each class by set the field override to true.
     */
    override?: boolean;
};

export type TransformFunction = (classes: string) => string;

export type FieldDefinition = undefined | string | FieldFunction | FieldObject;

export type OrugaOptions = {
    /** Define the icon pack be used */
    iconPack?: string;
    /** Enable HTML5 validation */
    useHtml5Validation?: boolean;
    /** Custom HTML5 validation invalid handler */
    invalidHandler?: (
        validatable: ValidatableFormElement,
        fieldElement: Element,
    ) => void;
    /** You can use transformClasses globally if you need to transform classes for any component. */
    transformClasses?: TransformFunction;
    [key: string]:
        | boolean
        | Function
        | FieldDefinition
        | {
              /**
               * In case you want to override Oruga existing classes completely,
               * you can set the field override to true.
               */
              override?: boolean;
              /** Use this function in case you want to transform applied classes' names. */
              transformClasses?: TransformFunction;
              [key: string]: FieldDefinition | boolean;
          };
};

/** Vue native type which a v-bind prop must have */
export type BindProp = (
    | string
    | {
          [x: string]: string;
      }
    | {
          [x: string]: boolean;
      }
)[];
