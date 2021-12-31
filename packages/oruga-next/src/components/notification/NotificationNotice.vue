<template>
    <o-notification
        v-bind="propsNotification"
        ref="notification"
        @close="close">
        <slot />
    </o-notification>
</template>

<script lang="ts">
import { getOptions } from '../../utils/config'
import { getValueByPath } from '../../utils/helpers'
import NoticeMixin from '../../utils/NoticeMixin'
import BaseComponentMixin from '../../utils/BaseComponentMixin'

/**
 * @displayName Notification Notice
 */
export default {
    name: 'ONotificationNotice',
    configField: 'notification',
    mixins: [BaseComponentMixin, NoticeMixin],
    props: {
        propsNotification: Object,
        noticeClass: [String, Function, Array],
        noticePositionClass: [String, Function, Array]
    },
    emits: ['update:active', 'close'],
    data() {
        return {
            newDuration: this.duration || getValueByPath(getOptions(), 'notification.duration', 1000)
        }
    },
    methods: {
        rootClasses() {
            return [
                this.computedClass('noticeClass', 'o-notices'),
            ]
        },
        positionClasses(position) {
            return [
                this.computedClass('noticePositionClass', 'o-notices--', position),
            ]
        },
        timeoutCallback() {
            return this.$refs.notification.close()
        }
    }
}
</script>
