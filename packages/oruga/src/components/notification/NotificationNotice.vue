<template>
    <o-notification
        v-bind="$options.propsData"
        @close="close">
        <slot />
    </o-notification>
</template>

<script>
import { getOptions } from '../../utils/config'
import { getValueByPath } from '../../utils/helpers'
import NoticeMixin from '../../utils/NoticeMixin.js'

export default {
    name: 'ONotificationNotice',
    mixins: [NoticeMixin],
    data() {
        return {
            newDuration: this.duration || getValueByPath(getOptions(), 'notification.defaultNotificationDuration', 1000)
        }
    }
}
</script>
