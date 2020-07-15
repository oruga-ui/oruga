import config from '../utils/config'
import { getValueByPath, blankIfUndefined } from './helpers'

export default {
    methods: {
        computedClass(component, field, defaultValue) {
            const override = getValueByPath(config, `${component}.override`, false)
            const gloabalClazz = getValueByPath(config, `${component}.${field}`, '')
            const currrentClazz = this.$props[field]
            return `${override ? '' : defaultValue} ${blankIfUndefined(gloabalClazz)} ${blankIfUndefined(currrentClazz)}`.trim()
        }
    }
}
        