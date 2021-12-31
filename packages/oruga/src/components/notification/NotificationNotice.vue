<template>
    <o-notification
        v-bind="$options.propsData"
        ref="notification"
        @close="close">
        <slot />
    </o-notification>
</template>

<script>
import NoticeMixin from '../../utils/NoticeMixin.js'
import BaseComponentMixin from '../../utils/BaseComponentMixin.js'

/**
 * @displayName Notification Notice
 */
export default {
    name: 'ONotificationNotice',
    configField: 'notification',
    mixins: [BaseComponentMixin, NoticeMixin],
    props: {
        noticeClass: [String, Function, Array],
        noticePositionClass: [String, Function, Array]
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
