import config from '../utils/config'
import { getValueByPath, blankIfUndefined } from './helpers'

export default {
    methods: {
        computedClass(component, field, defaultValue, overrideIfExists = false) {
            const override = getValueByPath(config, `${component}.override`, false)
            const globalClass = getValueByPath(config, `${component}.${field}`, '')
            const currrentClass = this.$props[field]
            return (`${override || (overrideIfExists && (currrentClass || globalClass)) ? '' : defaultValue} `
               + `${overrideIfExists && currrentClass ? '' : blankIfUndefined(globalClass)} `
               + `${blankIfUndefined(currrentClass)}`).trim().replace(/\s\s+/g, ' ');
        }
    }
}
