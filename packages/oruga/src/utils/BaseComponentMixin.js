import config from '../utils/config'
import { getValueByPath, blankIfUndefined } from './helpers'

export default {
    methods: {
        computedClass(component, field, defaultValue) {
            const override = getValueByPath(config, `${component}.override`, false)
            const clazz = override ? getValueByPath(config, `${component}.${field}`, defaultValue) : defaultValue
            const currrentClazz = this.$props[field]
            return `${blankIfUndefined(currrentClazz)} ${blankIfUndefined(clazz)}`.trim()
        }
    }
}
        