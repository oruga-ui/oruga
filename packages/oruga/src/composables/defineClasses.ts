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

import type {
    ClassBind,
    ClassDefinition,
    ComponentClass,
    ComponentProps,
    TransformFunction,
} from "@/types";

// named tuple as prop definition
type ComputedClass = readonly [
    className: string,
    defaultClass: string,
    suffix?: MaybeRefOrGetter<string | undefined> | null,
    apply?: MaybeRefOrGetter<boolean> | null,
];

/** Helperfunction to get all active classes from a class binding list */
export const getActiveClasses = (
    classes: MaybeRefOrGetter<ClassBind[]>,
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
};

export function defineClasses(
    ...args: [...ComputedClass[], DefineClassesOptions]
): Ref<ClassBind[]>;

export function defineClasses(...args: [...ComputedClass[]]): Ref<ClassBind[]>;

/**
 * Calculate dynamic classes based on class definitions
 */
export function defineClasses(
    ...args: ComputedClass[] | [...ComputedClass[], DefineClassesOptions]
): Ref<ClassBind[]> {
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
    const classes = ref<ClassBind[]>([]);

    classes.value = classDefinitions.map((defintion, index) => {
        const className = defintion[0];
        const defaultClass = defintion[1];
        const suffix = defintion[2];
        const apply = defintion[3];

        function getClassBind(): ClassBind {
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
                () => vm.proxy?.$props[className],
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

    // --- Classes Definition ---

    // get component config class definition
    let globalClass: ClassDefinition | undefined =
        getValueByPath<ClassDefinition>(
            config,
            `${componentKey}.${field}.class`,
            "",
        ) ||
        getValueByPath<ClassDefinition>(config, `${componentKey}.${field}`, "");

    // get instance class definition
    let localClass: ComponentClass | undefined = getValueByPath<ComponentClass>(
        props,
        field,
        "",
    );

    // procsess local instance class
    if (Array.isArray(localClass)) {
        localClass = localClass.join(" ");
    }
    if (typeof localClass === "function") {
        const props = getProps(vm);
        localClass = localClass(suffix, props);
    } else {
        localClass = suffixProcessor(localClass as string, suffix);
    }

    // process global config class
    if (Array.isArray(globalClass)) {
        globalClass = globalClass.join(" ");
    }
    if (typeof globalClass === "function") {
        const props = getProps(vm);
        globalClass = globalClass(suffix, props);
    } else {
        globalClass = suffixProcessor(globalClass as string, suffix);
    }

    // process component instance default value
    if (defaultValue.includes("{*}")) {
        defaultValue = defaultValue.replace(
            /\{\*\}/g,
            blankIfUndefined(suffix),
        );
    } else {
        defaultValue = defaultValue + blankIfUndefined(suffix);
    }

    // --- Override Definition ---

    // get instance or global config override property
    const globalOverride =
        props.override || getValueByPath(config, "override", false);
    // get component config override property
    const localOverride = getValueByPath(
        config,
        `${componentKey}.override`,
        globalOverride,
    );
    // get component field config override property
    const overrideClass = getValueByPath(
        config,
        `${componentKey}.${field}.override`,
        localOverride,
    );

    // --- Define Applied Classes ---

    // if override is false add default value
    // add global config classes
    // add instance classes
    let appliedClasses = (
        `${!overrideClass ? defaultValue : ""} ` +
        `${blankIfUndefined(globalClass)} ` +
        `${blankIfUndefined(localClass)}`
    )
        .trim()
        .replace(/\s\s+/g, " ");

    // --- Tranform Classes ---

    // get global config tranform class
    const globalTransformClasses = getValueByPath<TransformFunction>(
        config,
        "transformClasses",
        undefined,
    );
    // get component config tranform class
    const localTransformClasses = getValueByPath<TransformFunction>(
        config,
        `${componentKey}.transformClasses`,
        undefined,
    );

    // apply component local transformclass if available
    if (localTransformClasses) {
        appliedClasses = localTransformClasses(appliedClasses);
    }
    // else apply global transformclass if available
    else if (globalTransformClasses) {
        appliedClasses = globalTransformClasses(appliedClasses);
    }

    return appliedClasses;
}

function suffixProcessor(input: string, suffix: string): string {
    return blankIfUndefined(input)
        .split(" ")
        .filter((cls) => cls.length > 0)
        .map((cls) => cls + blankIfUndefined(suffix))
        .join(" ");
}

const getProps = (vm: ComponentInternalInstance): ComponentProps => {
    let props = vm.proxy?.$props || {};

    // get all props which ends with "Props", these are compressed parent props
    // append these parent props as root level prop
    props = Object.keys(props)
        .filter((key) => key.endsWith("Props"))
        .map((key) => props[key])
        .reduce((a, b) => ({ ...a, ...b }), props);

    return props;
};
