import { getCurrentInstance } from "vue";
import { getOptions } from "@/utils/config";
import { blankIfUndefined, endsWith, getValueByPath } from "@/utils/helpers";
import type { ComponentInternalInstance } from "vue";

const defaultSuffixProcessor = (input: string, suffix: string): string => {
    return blankIfUndefined(input)
        .split(" ")
        .filter((cls) => cls.length > 0)
        .map((cls) => cls + suffix)
        .join(" ");
};

const getContext = (vm: ComponentInternalInstance) => {
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

export function useComputedClass(
    props,
    field,
    defaultValue,
    suffix = "",
): string {
    const vm = getCurrentInstance();
    if (!vm)
        throw new Error(
            "useComputedClass must be called within a component setup function.",
        );

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

    const globalTransformClasses = getValueByPath(
        config,
        "transformClasses",
        undefined,
    );
    const localTransformClasses = getValueByPath(
        config,
        `${configField}.transformClasses`,
        undefined,
    );

    let globalClass =
        getValueByPath(config, `${configField}.${field}.class`, "") ||
        getValueByPath(config, `${configField}.${field}`, "");

    let currentClass = getValueByPath(props, field);

    if (Array.isArray(currentClass)) {
        currentClass = currentClass.join(" ");
    }

    if (defaultValue.includes("{*}")) {
        defaultValue = defaultValue.replace(/\{\*\}/g, suffix);
    } else {
        defaultValue = defaultValue + suffix;
    }

    let context = null;
    if (typeof currentClass === "function") {
        context = getContext(vm);
        currentClass = currentClass(suffix, context);
    } else {
        currentClass = defaultSuffixProcessor(currentClass, suffix);
    }

    if (typeof globalClass === "function") {
        globalClass = globalClass(suffix, context || config);
    } else {
        globalClass = defaultSuffixProcessor(globalClass, suffix);
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
