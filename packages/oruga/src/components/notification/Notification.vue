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
                    :icon="closeIcon"
                    size="small"/>
            </button>
            <div :class="wrapperClasses" v-if="$scopedSlots.default || message">
                <o-icon
                    :icon="computedIcon"
                    :pack="iconPack"
                    v-if="computedIcon"
                    :class="iconClasses"
                    both
                    size="large"
                    aria-hidden/>
                <div :class="contentClasses">
                    <template v-if="$scopedSlots.default">
                        <slot v-bind:closeNotification="close" />
                    </template>
                    <template v-else>
                        <span v-html="message" />
                    </template>
                </div>
            </div>
        </article>
    </transition>
</template>

<script>
import MessageMixin from '../../utils/MessageMixin.js'
import BaseComponentMixin from '../../utils/BaseComponentMixin.js'
import { getValueByPath } from '../../utils/helpers'
import { getOptions } from '../../utils/config'
/**
 * Classic modal overlay to include any content you may need
 * @displayName Notification
 * @example ./examples/Notification.md
 * @style _notification.scss
 */
export default {
    name: 'ONotification',
    mixins: [BaseComponentMixin, MessageMixin],
    props: {
        position: String,
        /**
        * Color of the control, optional
        * @values primary, info, success, warning, danger, and any other custom color
        */
        variant: [String, Object],
        ariaCloseLabel: String,
        animation: {
            type: String,
            default: 'fade'
        },
        /** Icon name */
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
