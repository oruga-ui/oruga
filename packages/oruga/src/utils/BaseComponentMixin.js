import config from '../utils/config'
import { getValueByPath, blankIfUndefined } from './helpers'

const _defaultSuffixProcessor = (input, suffix) => {
    return blankIfUndefined(input)
        .split(' ')
        .filter((cls) => cls.length > 0)
        .map((cls) => cls + suffix)
        .join(' ');
}

export default {
    methods: {
        computedClass(component, field, defaultValue, suffix='') {
            let override = getValueByPath(config, `${component}.override`, false)
            let overrideClass = getValueByPath(config, `${component}.${field}.override`, override)

            let globalClass = getValueByPath(config, `${component}.${field}.class`, '') || getValueByPath(config, `${component}.${field}`, '')
            let currentClass = this.$props[field]

            if (Array.isArray(currentClass)) {
                currentClass = currentClass.join(' ')
            }

            defaultValue = defaultValue + suffix

            if (typeof currentClass === "function") {
                currentClass = currentClass(suffix)
            } else {
                currentClass = _defaultSuffixProcessor(currentClass, suffix)
            }
            if (typeof globalClass === "function") {
                globalClass = globalClass(suffix)
            } else {
                globalClass = _defaultSuffixProcessor(globalClass, suffix)
            }
            return (`${(override && !overrideClass) || (!override && !overrideClass) ? defaultValue : ''} `
               + `${blankIfUndefined(globalClass)} `
               + `${blankIfUndefined(currentClass)}`).trim().replace(/\s\s+/g, ' ');
        }
    }
}
