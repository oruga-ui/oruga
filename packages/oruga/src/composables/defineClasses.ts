import {
    ref,
    watch,
    isRef,
    toValue,
    getCurrentInstance,
    effectScope,
    onScopeDispose,
    getCurrentScope,
    type MaybeRefOrGetter,
    type Ref,
    type ComponentInternalInstance,
    type EffectScope,
} from "vue";

import { getOptions } from "@/utils/config";
import { isDefined, blankIfUndefined, getValueByPath } from "@/utils/helpers";

import type { ClassBinding, ComponentClass, TransformFunction } from "@/types";

// named tuple as prop definition
type ComputedClass = readonly [
    className: string,
    defaultClass: string,
    suffix?: MaybeRefOrGetter<string | undefined> | null,
    apply?: MaybeRefOrGetter<boolean> | null,
];

/** Helper function to get all active classes from a class binding list */
export const getActiveClasses = (
    classes: MaybeRefOrGetter<ClassBinding[]>,
): string[] => {
    const values = toValue(classes);
    if (!values) return [];
    return values.flatMap((bind) =>
        Object.keys(bind)
            .filter((key) => key && bind[key])
            .flatMap((v) => v.split(" ")),
    );
};

type DefineClassesOptions = {
    /**
     * Pass a custom effect scope.
     * By default a new effect scope is created.
     * An error will be thrown if no current scope or a custom scope is given.
     * @default effectScope()
     */
    scope?: EffectScope;
    /**
     * Pass a custom props object which will be watched on additionaly to the current component instance props.
     * this will recompute the class bind property when the class property change.
     * @default vm.proxy?.$props
     */
    props?: Record<string, any>;
};

export function defineClasses(
    ...args: [...ComputedClass[], DefineClassesOptions]
): Ref<ClassBinding[]>;

export function defineClasses(
    ...args: [...ComputedClass[]]
): Ref<ClassBinding[]>;

/**
 * Calculate dynamic classes based on class definitions
 */
export function defineClasses(
    ...args: ComputedClass[] | [...ComputedClass[], DefineClassesOptions]
): Ref<ClassBinding[]> {
    // extract last argument if its the option object
    const options = Array.isArray(args.at(-1))
        ? undefined
        : (args.at(-1) as DefineClassesOptions);

    // get class defintion list based on options are given or not
    const classDefinitions = (
        Array.isArray(args.at(-1)) ? args : args.slice(0, -1)
    ) as ComputedClass[];

    // getting a hold of the internal instance of the component in setup()
    const vm = getCurrentInstance();
    if (!vm)
        throw new Error(
            "defineClasses must be called within a component setup function.",
        );
    // check if there is no current active effect scope given
    if (!getCurrentScope() && !options?.scope)
        throw new Error(
            "defineClasses must be called within a current active effect scope.",
        );

    // create an effect scope object to capture reactive effects
    const scope = options?.scope || effectScope();

    // check if there is a current active effect scope
    if (getCurrentScope())
        // Registers a dispose callback on the current active effect scope.
        // The callback will be invoked when the associated effect scope is stopped.
        onScopeDispose(() => {
            // stop all effects when appropriate
            if (scope) scope.stop();
        });

    // reactive classes container
    const classes = ref<ClassBinding[]>([]);

    classes.value = classDefinitions.map((defintion, index) => {
        const className = defintion[0];
        const defaultClass = defintion[1];
        const suffix = defintion[2];
        const apply = defintion[3];

        function getClassBind(): ClassBinding {
            // compute class based on definition parameter
            const computedClass = computeClass(
                vm!,
                className,
                defaultClass,
                toValue(suffix) || undefined,
            );

            // if apply is not defined or true
            const applied = !isDefined(apply) || toValue(apply);

            // return class bind property
            return { [computedClass]: applied };
        }

        // run all watcher and computed properties in an active effect scope
        scope.run(() => {
            // recompute the class bind property when the class property change
            watch(
                [
                    () => vm.proxy?.$props[className],
                    () => (options?.props ? options?.props[className] : null),
                ],
                () => {
                    // recompute the class bind property
                    const classBind = getClassBind();
                    // update class binding property by class index
                    classes.value[index] = classBind;
                },
            );

            // if suffix is defined, watch suffix changed and recalculate class
            if (isDefined(suffix) && isRef(suffix)) {
                watch(suffix, (value, oldValue) => {
                    // only recompute when value has really changed
                    if (value === oldValue) return;
                    // recompute the class bind property
                    const classBind = getClassBind();
                    // update class binding property by class index
                    classes.value[index] = classBind;
                });
            }

            // if apply is defined, watch apply changed and update apply state (no need of recalculation here)
            if (isDefined(apply) && isRef(apply)) {
                watch(apply, (applied, oldValue) => {
                    // only change apply when value has really changed
                    if (applied === oldValue) return;
                    // get class binding property by class index
                    const classBind = classes.value[index];
                    // update the apply class binding state
                    Object.keys(classBind).forEach(
                        (key) => (classBind[key] = applied),
                    );
                    // update the class binding property by class index
                    classes.value[index] = classBind;
                });
            }
        });

        // return computed class based on parameter
        return getClassBind();
    });

    // return reactive classes
    return classes;
}

/**
 * Compute a class by a field name
 */
function computeClass(
    vm: ComponentInternalInstance,
    field: string,
    defaultValue: string,
    suffix = "",
): string {
    // get component props
    const props = getProps(vm);

    const componentKey: string = vm.proxy?.$options.configField;
    if (!componentKey)
        throw new Error("component must define the 'configField' option.");

    // get component instance override property
    const config = props.override === true ? {} : getOptions();

    // --- Override Definition ---

    // get local instance override property
    const localOverride: boolean = props.override;
    // get global config override property
    const globalOverride =
        // check component field config override property
        getValueByPath(config, `${componentKey}.${field}.override`) ||
        // check component config override property
        getValueByPath(config, `${componentKey}.override`) ||
        // check global config override property
        getValueByPath(config, "override");

    const overrideClass = (localOverride || globalOverride) ?? false;

    // --- Class Definition ---

    // process component default class definition
    let defaultClassString: string;
    if (defaultValue.includes("{*}")) {
        defaultClassString = defaultValue.replace(
            /\{\*\}/g,
            blankIfUndefined(suffix),
        );
    } else {
        defaultClassString = defaultValue + blankIfUndefined(suffix);
    }

    // get local instance class definition
    const localClass: ComponentClass | undefined = getValueByPath(props, field);

    // procsess local instance class definition
    const localClassString = compileClass(localClass ?? "", props, suffix);

    // get global config class definition
    const globalClass: ComponentClass | undefined =
        getValueByPath(config, `${componentKey}.${field}.class`) ||
        getValueByPath(config, `${componentKey}.${field}`);

    // process global config class definition
    const globalClassString = compileClass(globalClass ?? "", props, suffix);

    // --- Define Applied Classes ---

    // if override is false add default value
    // add global config classes
    // add instance classes
    let appliedClasses = (
        `${!overrideClass ? defaultClassString : ""} ` +
        `${globalClassString} ` +
        `${localClassString}`
    )
        .trim()
        .replace(/\s\s+/g, " ");

    // --- Tranform Classes ---

    // get component config transform function
    let transformClasses: TransformFunction | undefined = getValueByPath(
        config,
        `${componentKey}.transformClasses`,
    );
    if (!transformClasses)
        // get global config transform function
        transformClasses = getValueByPath(config, "transformClasses");

    // apply transform function if available
    if (typeof transformClasses === "function") {
        appliedClasses = transformClasses(appliedClasses);
    }

    return appliedClasses;
}

/** Compile a component class definition into a string. */
function compileClass(
    classDefinition: ComponentClass,
    props: ReturnType<typeof getProps>,
    suffix: string,
): string {
    let classBinding: ClassBinding | ClassBinding[];

    if (typeof classDefinition === "function")
        classBinding = classDefinition(suffix, props) ?? "";
    else classBinding = classDefinition;

    if (Array.isArray(classBinding)) {
        return classBinding
            .map((cb) => processClassBinding(cb, suffix))
            .join(" ");
    } else if (classBinding) {
        return processClassBinding(classBinding, suffix);
    }

    return "";
}

/** Transform a classBinding object into a string. */
function processClassBinding(
    classBinding: ClassBinding,
    suffix: string,
): string {
    if (typeof classBinding === "string") {
        return suffixProcessor(classBinding ?? "", suffix);
    } else if (typeof classBinding === "object") {
        return Object.keys(classBinding)
            .filter((key) => classBinding[key])
            .map((classString) => suffixProcessor(classString ?? "", suffix))
            .join(" ");
    }
    return "";
}

/** Add a suffix to an input string. */
function suffixProcessor(input: string, suffix: string): string {
    return blankIfUndefined(input)
        .split(" ")
        .filter((cls) => cls.length > 0)
        .map((cls) => cls + blankIfUndefined(suffix))
        .join(" ");
}

function getProps(vm: ComponentInternalInstance): Record<string, any> {
    let props = vm.proxy?.$props || {};

    // get all props which ends with "Props", these are compressed parent props
    // append these parent props as root level prop
    props = Object.keys(props)
        .filter((key) => key.endsWith("Props"))
        .map((key) => props[key])
        .reduce((a, b) => ({ ...a, ...b }), props);

    return props;
}
