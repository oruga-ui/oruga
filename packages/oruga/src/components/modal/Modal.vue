<template>
    <transition
        :name="animation"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @after-leave="afterLeave"
    >
        <div
            v-if="!destroyed"
            v-show="isActive"
            :class="rootClasses"
            v-trap-focus="trapFocus"
            tabindex="-1"
            :role="ariaRole"
            :aria-label="ariaLabel"
            :aria-modal="ariaModal">
            <div :class="overlayClasses" @click="cancel('outside')"/>
            <div
                :class="contentClasses"
                :style="customStyle">
                <component
                    v-if="component"
                    v-bind="props"
                    v-on="events"
                    :is="component"
                    @close="close"/>
                <div v-else-if="content"> {{ content }} </div>
                <slot v-else/>
                <o-icon
                    v-if="showX"
                    v-show="!animating"
                    clickable
                    both
                    :class="closeClasses"
                    :icon="closeIcon"
                    :size="closeIconSize"
                    @click.native="cancel('x')"/>
            </div>
        </div>
    </transition>
</template>

<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import MatchMediaMixin from '../../utils/MatchMediaMixin'

import trapFocus from '../../directives/trapFocus'
import { removeElement, getValueByPath, toCssDimension } from '../../utils/helpers'
import { getOptions } from '../../utils/config'

import Icon from '../icon/Icon'


/**
 * Classic modal overlay to include any content you may need
 * @displayName Modal
 * @example ./examples/Modal.md
 * @style _modal.scss
 */
export default {
    name: 'OModal',
    components: {
        [Icon.name]: Icon
    },
    configField: 'modal',
    directives: {
        trapFocus
    },
    mixins: [BaseComponentMixin, MatchMediaMixin],
    props: {
        /** Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding */
        active: Boolean,
        /** Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.$emit('close') */
        component: [Object, Function],
        /** Text content */
        content: String,
        /** @ignore */
        programmatic: [Boolean, Object],
        /** @ignore */
        promise: Object,
        /** Props to be binded to the injected component */
        props: Object,
         /** Events to be binded to the injected component */
        events: Object,
        /** Width of the Modal */
        width: {
            type: [String, Number],
            default: () => {
                return getValueByPath(getOptions(), 'modal.width', 960)
            }
        },
        /** Enable custom style on modal content */
        custom: Boolean,
        /** Custom animation (transition name) */
        animation: {
            type: String,
            default: () => {
                return getValueByPath(getOptions(), 'modal.animation', 'zoom-out')
            }
        },
        /**
         * Can close Modal by clicking 'X', pressing escape or clicking outside
         * @values escape, x, outside, button
         */
        canCancel: {
            type: [Array, Boolean],
            default: () => {
                return getValueByPath(getOptions(), 'modal.canCancel', ['escape', 'x', 'outside', 'button'])
            }
        },
        /** Callback function to call after user canceled (clicked 'X' / pressed escape / clicked outside) */
        onCancel: {
            type: Function,
            default: () => {}
        },
        /** Callback function to call after close (programmatically close or user canceled) */
        onClose: {
            type: Function,
            default: () => {}
        },
        /**
         * clip to remove the body scrollbar, keep to have a non scrollable scrollbar to avoid shifting background, but will set body to position fixed, might break some layouts
         * @values keep, clip
         */
        scroll: {
            type: String,
            default: () => {
                return getValueByPath(getOptions(), 'modal.scroll', 'keep')
            }
        },
        /** Display modal as full screen */
        fullScreen: Boolean,
        /** Trap focus inside the modal. */
        trapFocus: {
            type: Boolean,
            default: () => {
                return getValueByPath(getOptions(), 'modal.trapFocus', true)
            }
        },
        ariaRole: {
            type: String,
            validator: (value) => {
                return [ 'dialog', 'alertdialog' ].indexOf(value) >= 0
            }
        },
        ariaModal: Boolean,
        ariaLabel: String,
        /** Destroy modal on hide */
        destroyOnHide: {
            type: Boolean,
            default: () => {
                return getValueByPath(getOptions(), 'modal.destroyOnHide', true)
            }
        },
        /** Automatically focus modal when active */
        autoFocus: {
            type: Boolean,
            default: () => {
                return getValueByPath(getOptions(), 'modal.autoFocus', true)
            }
        },
        /** Icon name */
        closeIcon: {
            type: String,
            default: () => {
                return getValueByPath(getOptions(), 'modal.closeIcon', 'close')
            }
        },
        closeIconSize: {
            type: String,
            default: 'medium'
        },
        rootClass: [String, Function, Array],
        overlayClass: [String, Function, Array],
        contentClass: [String, Function, Array],
        closeClass: [String, Function, Array],
        fullScreenClass: [String, Function, Array],
        mobileClass: [String, Function, Array],
    },
    data() {
        return {
            isActive: this.active || false,
            savedScrollTop: null,
            newWidth: toCssDimension(this.width),
            animating: !this.active,
            destroyed: !this.active
        }
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-modal'),
                { [this.computedClass('mobileClass', 'o-modal--mobile')]: this.isMatchMedia },
            ]
        },
        overlayClasses() {
            return [
                this.computedClass('overlayClass', 'o-modal__overlay')
            ]
        },
        contentClasses() {
            return [
                { [this.computedClass('contentClass', 'o-modal__content')]: !this.custom },
                { [this.computedClass('fullScreenClass', 'o-modal__content--full-screen')]: this.fullScreen }
            ]
        },
        closeClasses() {
            return [
                this.computedClass('closeClass', 'o-modal__close')
            ]
        },
        cancelOptions() {
            return typeof this.canCancel === 'boolean'
                ? this.canCancel
                    ? getValueByPath(getOptions(), 'modal.canCancel', ['escape', 'x', 'outside', 'button'])
                    : []
                : this.canCancel
        },
        showX() {
            return this.cancelOptions.indexOf('x') >= 0
        },
        customStyle() {
            if (!this.fullScreen) {
                return { maxWidth: this.newWidth }
            }
            return null
        }
    },
    watch: {
        active(value) {
            this.isActive = value
        },
        isActive(value) {
            if (value) this.destroyed = false
            this.handleScroll()
            this.$nextTick(() => {
                if (value && this.$el && this.$el.focus && this.autoFocus) {
                    this.$el.focus()
                }
            })
        }
    },
    methods: {
        handleScroll() {
            if (typeof window === 'undefined') return

            if (this.scroll === 'clip') {
                if (this.isActive) {
                    document.documentElement.classList.add('o-clipped')
                } else {
                    document.documentElement.classList.remove('o-clipped')
                }
                return
            }

            this.savedScrollTop = !this.savedScrollTop
                ? document.documentElement.scrollTop
                : this.savedScrollTop

            if (this.isActive) {
                document.body.classList.add('o-noscroll')
            } else {
                document.body.classList.remove('o-noscroll')
            }

            if (this.isActive) {
                document.body.style.top = `-${this.savedScrollTop}px`
                return
            }

            document.documentElement.scrollTop = this.savedScrollTop
            document.body.style.top = null
            this.savedScrollTop = null
        },

        /**
        * Close the Modal if canCancel and call the onCancel prop (function).
        */
        cancel(method) {
            if (this.cancelOptions.indexOf(method) < 0) return

            this.onCancel.apply(null, arguments)
            this.close({action: 'cancel', method});
        },

        /**
        * Call the onCancel prop (function).
        * Emit events, and destroy modal if it's programmatic.
        */
        close() {
            this.isActive = false
            this.$emit('close')
            this.$emit('update:active', false)
            this.onClose.apply(null, arguments)

            // Waiting for the animation complete before destroying
            if (this.programmatic) {
                if (this.programmatic.resolve) {
                    this.programmatic.resolve.apply(null, arguments)
                }

                window.requestAnimationFrame(() => {
                    this.$destroy()
                    removeElement(this.$el)
                })
            }
        },

        /**
        * Keypress event that is bound to the document.
        */
        keyPress({ key }) {
            if (this.isActive && (key === 'Escape' || key === 'Esc')) this.cancel('escape')
        },

        /**
        * Transition after-enter hook
        */
        afterEnter() {
            this.animating = false
        },

        /**
        * Transition before-leave hook
        */
        beforeLeave() {
            this.animating = true
        },

        /**
        * Transition after-leave hook
        */
        afterLeave() {
            if (this.destroyOnHide) {
                this.destroyed = true
            }
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress)
        }
    },
    beforeMount() {
        // Insert the Modal component in body tag
        // only if it's programmatic
        this.programmatic && document.body.appendChild(this.$el)
    },
    mounted() {
        if (this.programmatic) this.isActive = true
        else if (this.isActive) this.handleScroll()
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress)
            // reset scroll
            document.documentElement.classList.remove('o-clipped')
            const savedScrollTop = !this.savedScrollTop
                ? document.documentElement.scrollTop
                : this.savedScrollTop
            document.body.classList.remove('o-noscroll')
            document.documentElement.scrollTop = savedScrollTop
            document.body.style.top = null
        }
    }
}
</script>
