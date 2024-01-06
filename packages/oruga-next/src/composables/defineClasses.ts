import {
    ref,
    watch,
    toValue,
    onUnmounted,
    getCurrentInstance,
    type MaybeRefOrGetter,
    type Ref,
    type ComponentInternalInstance,
    type WatchStopHandle,
} from "vue";
import { getOptions } from "@/utils/config";
import {
    isDefined,
    blankIfUndefined,
    endsWith,
    getValueByPath,
} from "@/utils/helpers";

import type {
    PropBind,
    ClassDefinition,
    ComponentContext,
    TransformFunction,
} from "@/types";

// named tuple as prop definition
type ComputedClass = readonly [
    className: string,
    defaultClass: string,
    suffix?: MaybeRefOrGetter<string>,
    apply?: MaybeRefOrGetter<boolean>,
];

/**
 * calculate classes based on class definitions
 */
export function defineClasses(
    classDefinitions: ComputedClass[],
): Ref<PropBind> {
    // getting a hold of the internal instance of the component in setup()
    const vm = getCurrentInstance();
    if (!vm)
        throw new Error(
            "defineClasses must be called within a component setup function.",
        );

    // reactive classes container
    const classes = ref<PropBind>([]);
    // watcher references
    const watcher: WatchStopHandle[] = [];

    classes.value = classDefinitions.map((defintion, index) => {
        const className = defintion[0];
        const defaultClass = defintion[1];
        const suffix = defintion[2];
        const apply = defintion[3];

        function getClassBind(): PropBind[number] {
            // compute class based on definition parameter
            const computedClass = computeClass(
                vm,
                className,
                defaultClass,
                toValue(suffix),
            );

            // if apply is not defined or true
            const applied = !isDefined(apply) || toValue(apply);

            console.log(
                "defineClass - computed class:",
                computedClass,
                applied,
            );

            // return class bind property
            return { [computedClass]: applied };
        }

        // if suffix is defined, watch suffix changed and recalculate class
        if (isDefined(suffix)) {
            const unwatch = watch(
                () => toValue(suffix),
                (suffix) => {
                    console.log("defineClass - suffix changed:", index, suffix);
                    // recompute the class bind property
                    const classBind = getClassBind();
                    // update class binding property by class index
                    classes.value[index] = classBind;
                },
            );
            watcher.push(unwatch);
        }

        // if apply is defined, watch apply chaned and update apply state, no need of recalculation here
        if (isDefined(apply)) {
            const unwatch = watch(
                () => toValue(apply),
                (applied) => {
                    console.log("defineClass - apply changed:", index, applied);
                    // get class binding property by class index
                    const classBind = classes.value[index];
                    if (typeof classBind === "object") {
                        // update the apply class binding state
                        Object.keys(classBind).forEach(
                            (key) => (classBind[key] = applied),
                        );
                    }
                    // updatge the class binding property by class index
                    classes.value[index] = classBind;
                },
            );
            watcher.push(unwatch);
        }

        // return computed class based on parameter
        return getClassBind();
    });

    // remove watch handler if defined
    onUnmounted(() => {
        watcher.forEach((unwatch) => {
            if (typeof unwatch === "function") unwatch();
        });
    });

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
        currentClass = suffixProcessor(currentClass as string, suffix);
    }

    // process confic class
    if (Array.isArray(globalClass)) {
        globalClass = globalClass.join(" ");
    }
    if (typeof globalClass === "function") {
        const context = getContext(vm);
        globalClass = globalClass(suffix, context);
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

const suffixProcessor = (input: string, suffix: string): string => {
    return blankIfUndefined(input)
        .split(" ")
        .filter((cls) => cls.length > 0)
        .map((cls) => cls + blankIfUndefined(suffix))
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
