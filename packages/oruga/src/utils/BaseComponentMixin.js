import config from '../utils/config'
import { getValueByPath } from './helpers'

export default {
    methods: {
        computedClass(component, field, defaultValue) {
            const override = getValueByPath(config, `${component}.override`, false)
            const clazz = this.$props[field] || getValueByPath(config, `${component}.${field}`, '')
            return (clazz ? (clazz + (override ? '' : ' ')) : '') + (override ? '' : defaultValue)
        }
    }
}
        