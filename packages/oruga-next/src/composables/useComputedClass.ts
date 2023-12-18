import { getCurrentInstance, type ComponentInternalInstance } from "vue";
import { getOptions } from "@/utils/config";
import { blankIfUndefined, endsWith, getValueByPath } from "@/utils/helpers";

import type {
    ClassDefinition,
    ComponentContext,
    TransformFunction,
} from "@/types";

const defaultSuffixProcessor = (input: string, suffix: string): string => {
    return blankIfUndefined(input)
        .split(" ")
        .filter((cls) => cls.length > 0)
        .map((cls) => cls + suffix)
        .join(" ");
};

const getContext = (vm: ComponentInternalInstance): ComponentContext => {
    const computedNames = vm.proxy?.$options.computed
        ? Object.keys(vm.proxy.$options.computed)
        : [];

    let props = vm.proxy.$props;

    // get all props which ends with "Props", these are compressed parent props
    // append these parent props as root level prop
    Object.keys(props)
        .filter((key) => key.endsWith("Props"))
        .forEach((key) => (props = { ...props, ...props[key] }));

    const computedProps = computedNames
        .filter((e) => !endsWith(e, "Classes"))
        .reduce((o, key) => {
            o[key] = vm.proxy[key];
            return o;
        }, {});

    return {
        props: props,
        data: vm.proxy.$data,
        computed: computedProps,
    };
};

/**
 * Compute a class by field name
 */
export function useComputedClass(
    field: string,
    defaultValue?: string,
    suffix = "",
): string {
    // getting a hold of the internal instance in setup()
    const vm = getCurrentInstance();
    if (!vm)
        throw new Error(
            "useComputedClass must be called within a component setup function.",
        );
    // get component props
    const props = vm.props;

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
        const context = getContext(vm);
        currentClass = currentClass(suffix, context);
    } else {
        currentClass = defaultSuffixProcessor(currentClass as string, suffix);
    }

    // process confic class
    if (Array.isArray(globalClass)) {
        globalClass = globalClass.join(" ");
    }
    if (typeof globalClass === "function") {
        const context = getContext(vm);
        globalClass = globalClass(suffix, context);
    } else {
        globalClass = defaultSuffixProcessor(globalClass as string, suffix);
    }

    // process default value
    if (defaultValue.includes("{*}")) {
        defaultValue = defaultValue.replace(/\{\*\}/g, suffix);
    } else {
        defaultValue = defaultValue + suffix;
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
