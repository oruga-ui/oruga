<script lang="ts">
import { defineComponent } from "vue";

import NoticeMixin from "../../mixins/NoticeMixin";
import BaseComponentMixin from "../../mixins/BaseComponentMixin";

/**
 * @displayName Notification Notice
 */
export default defineComponent({
    name: "ONotificationNotice",
    configField: "notification",
    mixins: [BaseComponentMixin, NoticeMixin],
    props: {
        propsNotification: Object,
        noticeClass: [String, Function, Array],
        noticePositionClass: [String, Function, Array],
        noticeCustomContainerClass: [String, Function, Array],
    },
    emits: ["update:active", "close"],
    methods: {
        rootClasses() {
            return [this.computedClass("noticeClass", "o-notices")];
        },
        positionClasses(position) {
            return [
                this.computedClass(
                    "noticePositionClass",
                    "o-notices--",
                    position,
                ),
            ];
        },
        noticeCustomContainerClasses() {
            return [
                this.computedClass(
                    "noticeCustomContainerClass",
                    "o-notices__custom-container",
                ),
            ];
        },
        timeoutCallback() {
            return this.$refs.notification.close({
                action: "close",
                method: "timeout",
            });
        },
    },
});
</script>

<template>
    <o-notification
        v-bind="propsNotification"
        ref="notification"
        @close="close">
        <slot />
    </o-notification>
</template>
