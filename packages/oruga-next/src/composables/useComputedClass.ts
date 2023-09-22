import { getCurrentInstance, type ComponentInternalInstance } from "vue";
import { getOptions } from "@/utils/config";
import { blankIfUndefined, endsWith, getValueByPath } from "@/utils/helpers";

import type {
    FieldDefinition,
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
    const computedProps = computedNames
        .filter((e) => !endsWith(e, "Classes"))
        .reduce((o, key) => {
            o[key] = vm.proxy[key];
            return o;
        }, {});

    return {
        props: vm.proxy.$props,
        data: vm.proxy.$data,
        computed: computedProps,
    };
};

export function useComputedClass(field, defaultValue, suffix = ""): string {
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

    const config = props.override === true ? {} : getOptions();

    const override =
        props.override ||
        getValueByPath(config, `${configField}.override`, false);
    const overrideClass = getValueByPath(
        config,
        `${configField}.${field}.override`,
        override,
    );

    const globalTransformClasses = getValueByPath<
        TransformFunction | undefined
    >(config, "transformClasses");
    const localTransformClasses = getValueByPath<TransformFunction | undefined>(
        config,
        `${configField}.transformClasses`,
    );

    let globalClass =
        getValueByPath<FieldDefinition>(
            config,
            `${configField}.${field}.class`,
            "",
        ) ||
        getValueByPath<FieldDefinition>(config, `${configField}.${field}`, "");
    let currentClass = getValueByPath<FieldDefinition>(props, field, "");

    if (Array.isArray(currentClass)) {
        currentClass = currentClass.join(" ");
    }
    if (typeof currentClass === "function") {
        const context = getContext(vm);
        currentClass = currentClass(suffix, context);
    } else {
        currentClass = defaultSuffixProcessor(currentClass as string, suffix);
    }

    if (typeof globalClass === "function") {
        const context = getContext(vm);
        globalClass = globalClass(suffix, context);
    } else {
        globalClass = defaultSuffixProcessor(globalClass as string, suffix);
    }

    if (defaultValue.includes("{*}")) {
        defaultValue = defaultValue.replace(/\{\*\}/g, suffix);
    } else {
        defaultValue = defaultValue + suffix;
    }

    let appliedClasses = (
        `${
            (override && !overrideClass) || (!override && !overrideClass)
                ? defaultValue
                : ""
        } ` +
        `${blankIfUndefined(globalClass)} ` +
        `${blankIfUndefined(currentClass)}`
    )
        .trim()
        .replace(/\s\s+/g, " ");

    if (localTransformClasses) {
        appliedClasses = localTransformClasses(appliedClasses);
    }

    if (globalTransformClasses) {
        appliedClasses = globalTransformClasses(appliedClasses);
    }

    return appliedClasses;
}
