import { getOptions } from './config';
import { getValueByPath, blankIfUndefined } from './helpers'

const _defaultSuffixProcessor = (input, suffix) => {
    return blankIfUndefined(input)
        .split(' ')
        .filter((cls) => cls.length > 0)
        .map((cls) => cls + suffix)
        .join(' ');
}

const _getContext = (vm) => {
    const computedNames = Object.keys(vm.$options.computed)
    const computed = computedNames.reduce((o, key) => {
        o[key] = vm[key]
        return o
    }, {})
    return {props: vm.$props, data: vm.$data, computed}
}

export default {
    isOruga: true,
    props: {
        /**
         * Override classes
         */
        override: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        computedClass(field, defaultValue, suffix='') {
            const config = getOptions();

            let override = this.$props.override || getValueByPath(config, `${this.$options.configField}.override`, false)
            let overrideClass = getValueByPath(config, `${this.$options.configField}.${field}.override`, override)

            let globalClass = getValueByPath(config, `${this.$options.configField}.${field}.class`, '')
                || getValueByPath(config, `${this.$options.configField}.${field}`, '')
            let currentClass = getValueByPath(this.$props, field)

            if (Array.isArray(currentClass)) {
                currentClass = currentClass.join(' ')
            }

            if (defaultValue.search("{*}") !== -1) {
                defaultValue = defaultValue.replace(/\{\*\}/g, suffix);
            } else {
                defaultValue = defaultValue + suffix
            }

            if (typeof currentClass === "function") {
                currentClass = currentClass(suffix, _getContext(this))
            } else {
                currentClass = _defaultSuffixProcessor(currentClass, suffix)
            }
            if (typeof globalClass === "function") {
                globalClass = globalClass(suffix, _getContext(this))
            } else {
                globalClass = _defaultSuffixProcessor(globalClass, suffix)
            }
            return (`${(override && !overrideClass) || (!override && !overrideClass) ? defaultValue : ''} `
               + `${blankIfUndefined(globalClass)} `
               + `${blankIfUndefined(currentClass)}`).trim().replace(/\s\s+/g, ' ');
        }
    }
}
