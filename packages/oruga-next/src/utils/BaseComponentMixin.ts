import config from './config'
import { getValueByPath, blankIfUndefined } from './helpers'

export default {
    methods: {
        computedClass(component: string, field: string, defaultValue: string, overrideIfExists: boolean = false): string {
            const override = getValueByPath(config, `${component}.override`, false)
            const globalClass = getValueByPath(config, `${component}.${field}`, '')
            const currentClass = this.$props[field]
            return (`${override || (overrideIfExists && (currentClass || globalClass)) ? '' : defaultValue} `
               + `${overrideIfExists && currentClass ? '' : blankIfUndefined(globalClass)} `
               + `${blankIfUndefined(currentClass)}`).trim()
        }
    }
}
