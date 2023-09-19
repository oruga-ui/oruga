import type { ComponentOptions } from "vue";
import { defineComponent } from "vue";
import { getOptions } from "../utils/options";
import { getValueByPath, blankIfUndefined, endsWith } from "../utils/helpers";

const _defaultSuffixProcessor = (input: string, suffix: string) => {
    return blankIfUndefined(input)
        .split(" ")
        .filter((cls) => cls.length > 0)
        .map((cls) => cls + suffix)
        .join(" ");
};

const _getContext = (vm: ComponentOptions) => {
    const computedNames = vm.$options.computed
        ? Object.keys(vm.$options.computed)
        : [];
    const computed = computedNames
        .filter((e) => !endsWith(e, "Classes"))
        .reduce((o, key) => {
            o[key] = vm[key];
            return o;
        }, {});
    return { props: vm.$props, data: vm.$data, computed };
};

export default defineComponent({
    isOruga: true,
    props: {
        override: Boolean,
    },
    methods: {
        computedClass(
            field: string,
            defaultValue: string,
            suffix: string = "",
        ) {
            const config = this.$props.override === true ? {} : getOptions();

            const override =
                this.$props.override ||
                getValueByPath(
                    config,
                    `${this.$options.configField}.override`,
                    false,
                );
            const overrideClass = getValueByPath(
                config,
                `${this.$options.configField}.${field}.override`,
                override,
            );

            const globalTransformClasses = getValueByPath(
                config,
                `transformClasses`,
                undefined,
            );
            const localTransformClasses = getValueByPath(
                config,
                `${this.$options.configField}.transformClasses`,
                undefined,
            );

            let globalClass =
                getValueByPath(
                    config,
                    `${this.$options.configField}.${field}.class`,
                    "",
                ) ||
                getValueByPath(
                    config,
                    `${this.$options.configField}.${field}`,
                    "",
                );
            let currentClass = getValueByPath(this.$props, field);

            if (Array.isArray(currentClass)) {
                currentClass = currentClass.join(" ");
            }

            if (defaultValue.search("{*}") !== -1) {
                defaultValue = defaultValue.replace(/\{\*\}/g, suffix);
            } else {
                defaultValue = defaultValue + suffix;
            }

            let context = null;
            if (typeof currentClass === "function") {
                context = _getContext(this);
                currentClass = currentClass(suffix, context);
            } else {
                currentClass = _defaultSuffixProcessor(currentClass, suffix);
            }
            if (typeof globalClass === "function") {
                globalClass = globalClass(suffix, context || _getContext(this));
            } else {
                globalClass = _defaultSuffixProcessor(globalClass, suffix);
            }
            let appliedClasses = (
                `${
                    (override && !overrideClass) ||
                    (!override && !overrideClass)
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
        },
    },
});
