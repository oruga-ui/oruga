<template>
    <transition :name="animation">
        <article
            v-show="isActive"
            :class="rootClasses">
            <button
                v-if="closable"
                :class="closeClasses"
                type="button"
                @click="close"
                :aria-label="ariaCloseLabel"
            >
                <o-icon
                    clickable
                    :pack="iconPack"
                    both
                    :icon="closeIcon"
                    :size="closeIconSize"/>
            </button>
            <component
                v-if="component"
                v-bind="props"
                v-on="events"
                :is="component"
                @close="close"/>
            <div :class="wrapperClasses" v-if="$slots.default || message">
                <o-icon
                    :icon="computedIcon"
                    :pack="iconPack"
                    v-if="computedIcon"
                    :class="iconClasses"
                    both
                    :size="iconSize"
                    aria-hidden/>
                <div :class="contentClasses">
                    <template v-if="message">
                        <span v-html="message" />
                    </template>
                    <template v-else>
                        <slot v-bind:closeNotification="close" />
                    </template>
                </div>
            </div>
        </article>
    </transition>
</template>

<script lang="ts">
import MessageMixin from '../../utils/MessageMixin'
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import { getValueByPath } from '../../utils/helpers'
import { getOptions } from '../../utils/config'

/**
 * Bold notification blocks to alert your users of something
 * @displayName Notification
 * @requires ./NotificationNotice.vue
 * @example ./examples/Notification.md
 * @style _notification.scss
 */
export default {
    name: 'ONotification',
    configField: 'notification',
    mixins: [BaseComponentMixin, MessageMixin],
    emits: ['update:active', 'close'],
    props: {
        /**
        * Which position the notification will appear when programmatically
        * @values top-right, top, top-left, bottom-right, bottom, bottom-left
        */
        position: String,
        /**
        * Color of the control, optional
        * @values primary, info, success, warning, danger, and any other custom color
        */
        variant: [String, Object],
        /**
         * Label for the close button, to be read by accessibility screenreaders.
         */
        ariaCloseLabel: String,
        /**
         * Size of close icon
         */
        closeIconSize: {
            type: String,
            default: 'small'
        },
        /**
         * Custom animation (transition name).
         */
        animation: {
            type: String,
            default: 'fade'
        },
        /** Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.$emit('close') */
        component: [Object, Function],
        /** Props to be binded to the injected component */
        props: Object,
        /** Events to be binded to the injected component */
        events: {
            type: Object,
            default: {}
        },
        /** Close icon name */
        closeIcon: {
            type: String,
            default: () => {
                return getValueByPath(getOptions(), 'notification.closeIcon', 'times')
            }
        },
        rootClass: [String, Function, Array],
        closeClass: [String, Function, Array],
        contentClass: [String, Function, Array],
        iconClass: [String, Function, Array],
        positionClass: [String, Function, Array],
        variantClass: [String, Function, Array],
        wrapperClass: [String, Function, Array],
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-notification'),
                { [this.computedClass('variantClass', 'o-notification--', this.variant)]: this.variant },
                { [this.computedClass('positionClass', 'o-notification--', this.position)]: this.position },
            ]
        },
        wrapperClasses() {
            return [
                this.computedClass('wrapperClass', 'o-notification__wrapper')
            ]
        },
        iconClasses() {
            return [
                this.computedClass('iconClass', 'o-notification__icon')
            ]
        },
        contentClasses() {
            return [
                this.computedClass('contentClass', 'o-notification__content')
            ]
        },
        closeClasses() {
            return [
                this.computedClass('closeClass', 'o-notification__close')
            ]
        },
    },
}
</script>
