import { defineComponent } from 'vue';
import config from './config'
import { getValueByPath, blankIfUndefined } from './helpers'

const _defaultSuffixProcessor = (input: string, suffix: string) => {
    return blankIfUndefined(input)
        .split(' ')
        .filter((cls) => cls.length > 0)
        .map((cls) => cls + suffix)
        .join(' ');
}

export default defineComponent({
    isOruga: true,
    props: {
        override: Boolean
    },
    methods: {
        computedClass(field: string, defaultValue: string, suffix: string = '') {
            let override = this.$props.override || getValueByPath(config, `${this.$options.configField}.override`, false)
            let overrideClass = getValueByPath(config, `${this.$options.configField}.${field}.override`, override)

            let globalClass = getValueByPath(config, `${this.$options.configField}.${field}.class`, '')
                || getValueByPath(config, `${this.$options.configField}.${field}`, '')
            let currentClass = this.$props[field]

            if (Array.isArray(currentClass)) {
                currentClass = currentClass.join(' ')
            }

            if (defaultValue.search("{*}") !== -1) {
                defaultValue = defaultValue.replace(/\{\*\}/g, suffix);
            } else {
                defaultValue = defaultValue + suffix
            }

            if (typeof currentClass === "function") {
                currentClass = currentClass(suffix, {props: this.$props})
            } else {
                currentClass = _defaultSuffixProcessor(currentClass, suffix)
            }
            if (typeof globalClass === "function") {
                globalClass = globalClass(suffix, {props: this.$props})
            } else {
                globalClass = _defaultSuffixProcessor(globalClass, suffix)
            }
            return (`${(override && !overrideClass) || (!override && !overrideClass) ? defaultValue : ''} `
               + `${blankIfUndefined(globalClass)} `
               + `${blankIfUndefined(currentClass)}`).trim().replace(/\s\s+/g, ' ');
        }
    }
})
