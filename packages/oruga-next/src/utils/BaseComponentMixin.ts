import config from './config'
import { getValueByPath, blankIfUndefined } from './helpers'

export default {
    methods: {
        computedClass(component: string, field: string, defaultValue: string, overrideIfExists: boolean = false): string {
            const override = getValueByPath(config, `${component}.override`, false)
            const globalClass = getValueByPath(config, `${component}.${field}`, '')
            const currrentClass = this.$props[field]
            return (`${override || (overrideIfExists && (currrentClass || globalClass)) ? '' : defaultValue} ` 
               + `${overrideIfExists && currrentClass ? '' : blankIfUndefined(globalClass)} `
               + `${blankIfUndefined(currrentClass)}`).trim()
        }
    }
}
