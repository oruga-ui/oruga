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
} from "vue";

import { getOptions } from "@/utils/config";
import { isDefined, blankIfUndefined, getValueByPath } from "@/utils/helpers";

import type {
    ClassBind,
    ClassDefinition,
    ComponentProps,
    TransformFunction,
} from "@/types";

// named tuple as prop definition
type ComputedClass = readonly [
    className: string,
    defaultClass: string,
    suffix?: MaybeRefOrGetter<string>,
    apply?: MaybeRefOrGetter<boolean>,
];

/** Helperfunction to get all active classes from a class binding list */
export const getActiveClasses = (classes: ClassBind[]): string[] => {
    if (!classes) return [];
    return classes.flatMap((bind) =>
        Object.keys(bind).filter((key) => key && bind[key]),
    );
};

/**
 * Calculate dynamic classes based on class definitions
 */
export function defineClasses(
    ...classDefinitions: ComputedClass[]
): Ref<ClassBind[]> {
    // getting a hold of the internal instance of the component in setup()
    const vm = getCurrentInstance();
    if (!vm)
        throw new Error(
            "defineClasses must be called within a component setup function.",
        );

    // create an effect scope object to capture reactive effects
    const scope = effectScope();

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
                vm,
                className,
                defaultClass,
                toValue(suffix),
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
                () => vm.proxy.$props[className],
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

    // check if there is a current active effect scope
    if (getCurrentScope())
        // Registers a dispose callback on the current active effect scope.
        // The callback will be invoked when the associated effect scope is stopped.
        onScopeDispose(() => {
            // stop all effects when appropriate
            if (scope) scope.stop();
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
    defaultValue?: string,
    suffix = "",
): string {
    // get component props
    const props = getProps(vm);

    const configField = vm.proxy?.$options.configField;
    if (!configField)
        throw new Error("component must define the 'configField' option.");

    // get component instance override property
    const config = props.override === true ? {} : getOptions();

    // get global config override property
    const globalOverride =
        props.override || getValueByPath(config, "override", false);
    // get component config override property
    const localOverride = getValueByPath(
        config,
        `${configField}.override`,
        globalOverride,
    );
    // get field specific config override property
    const overrideClass = getValueByPath(
        config,
        `${configField}.${field}.override`,
        localOverride,
    );

    // get global tranform class
    const globalTransformClasses = getValueByPath<TransformFunction>(
        config,
        "transformClasses",
        undefined,
    );
    // get field specific tranform class
    const localTransformClasses = getValueByPath<TransformFunction>(
        config,
        `${configField}.transformClasses`,
        undefined,
    );

    // get config class definition
    let globalClass =
        getValueByPath<ClassDefinition>(
            config,
            `${configField}.${field}.class`,
            "",
        ) ||
        getValueByPath<ClassDefinition>(config, `${configField}.${field}`, "");
    // get instance class override
    let currentClass = getValueByPath<ClassDefinition>(props, field, "");

    // procsess instance class
    if (Array.isArray(currentClass)) {
        currentClass = currentClass.join(" ");
    }
    if (typeof currentClass === "function") {
        const props = getProps(vm);
        currentClass = currentClass(suffix, props);
    } else {
        currentClass = suffixProcessor(currentClass as string, suffix);
    }

    // process confic class
    if (Array.isArray(globalClass)) {
        globalClass = globalClass.join(" ");
    }
    if (typeof globalClass === "function") {
        const props = getProps(vm);
        globalClass = globalClass(suffix, props);
    } else {
        globalClass = suffixProcessor(globalClass as string, suffix);
    }

    // process default value
    if (defaultValue.includes("{*}")) {
        defaultValue = defaultValue.replace(
            /\{\*\}/g,
            blankIfUndefined(suffix),
        );
    } else {
        defaultValue = defaultValue + blankIfUndefined(suffix);
    }

    // if override is false add default value
    // add global config classes
    // add instance classes
    let appliedClasses = (
        `${!overrideClass ? defaultValue : ""} ` +
        `${blankIfUndefined(globalClass)} ` +
        `${blankIfUndefined(currentClass)}`
    )
        .trim()
        .replace(/\s\s+/g, " ");

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
    let props = vm.proxy.$props;

    // get all props which ends with "Props", these are compressed parent props
    // append these parent props as root level prop
    props = Object.keys(props)
        .filter((key) => key.endsWith("Props"))
        .map((key) => props[key])
        .reduce((a, b) => ({ ...a, ...b }), props);

    return props;
};
