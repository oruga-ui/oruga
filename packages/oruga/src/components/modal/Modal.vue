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
            :aria-modal="ariaModal">
            <div :class="backgroundClasses" @click="cancel('outside')"/>
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
                <button
                    type="button"
                    v-if="showX"
                    v-show="!animating"
                    :class="closeClasses"
                    @click="cancel('x')"/>
            </div>
        </div>
    </transition>
</template>

<script>
import trapFocus from '../../directives/trapFocus'
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import { removeElement, getValueByPath, toCssDimension } from '../../utils/helpers'
import config from '../../utils/config'

/**
 * Classic modal overlay to include any content you may need
 * @displayName Modal
 * @example ./examples/Modal.md
 * @style _modal.scss
 */
export default {
    name: 'OModal',
    directives: {
        trapFocus
    },
    mixins: [BaseComponentMixin],
    props: {
        active: Boolean,
        component: [Object, Function],
        content: String,
        programmatic: Boolean,
        props: Object,
        events: Object,
        width: {
            type: [String, Number],
            default: () => {
                return getValueByPath(config, 'modal.width', 960)
            }
        },
        custom: Boolean,
        animation: {
            type: String,
            default: () => {
                return getValueByPath(config, 'modal.animation', 'zoom-out')
            }
        },
        canCancel: {
            type: [Array, Boolean],
            default: () => {
                return getValueByPath(config, 'modal.canCancel', ['escape', 'x', 'outside', 'button'])
            }
        },
        onCancel: {
            type: Function,
            default: () => {}
        },
        scroll: {
            type: String,
            default: () => {
                return getValueByPath(config, 'modal.scroll', 'keep')
            }
        },
        fullScreen: Boolean,
        trapFocus: {
            type: Boolean,
            default: () => {
                return getValueByPath(config, 'modal.trapFocus', true)
            }
        },
        ariaRole: {
            type: String,
            validator: (value) => {
                return [ 'dialog', 'alertdialog' ].indexOf(value) >= 0
            }
        },
        ariaModal: Boolean,
        destroyOnHide: {
            type: Boolean,
            default: () => {
                return getValueByPath(config, 'modal.destroyOnHide', true)
            }
        },
        rootClass: String,
        backgroundClass: String,
        contentClass: String,
        closeClass: String,
        fullScreenClass: String
    },
    data() {
        return {
            isActive: this.active || false,
            savedScrollTop: null,
            newWidth: toCssDimension(this.width),
            animating: true,
            destroyed: !this.active
        }
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('modal', 'rootClass', 'o-modal'),
                { [this.computedClass('modal', 'fullScreenClass', 'o-modal-fullscreen')]: this.fullScreen }
            ]
        },
        backgroundClasses() {
            return [
                this.computedClass('modal', 'backgroundClass', 'o-modal-background')
            ]
        },
        contentClasses() {
            return [
                { [this.computedClass('modal', 'contentClass', 'o-modal-content')]: !this.custom }
            ]
        },
        closeClasses() {
            return [
                this.computedClass('modal', 'closeClass', 'o-modal-close')
            ]
        },
        cancelOptions() {
            return typeof this.canCancel === 'boolean'
                ? this.canCancel
                    ? getValueByPath(config, 'modal.canCancel', ['escape', 'x', 'outside', 'button'])
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
                if (value && this.$el && this.$el.focus) {
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
                    document.documentElement.classList.add('is-clipped')
                } else {
                    document.documentElement.classList.remove('is-clipped')
                }
                return
            }

            this.savedScrollTop = !this.savedScrollTop
                ? document.documentElement.scrollTop
                : this.savedScrollTop

            if (this.isActive) {
                document.body.classList.add('is-noscroll')
            } else {
                document.body.classList.remove('is-noscroll')
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
            this.close()
        },

        /**
        * Call the onCancel prop (function).
        * Emit events, and destroy modal if it's programmatic.
        */
        close() {
            this.$emit('close')
            this.$emit('update:active', false)

            // Timeout for the animation complete before destroying
            if (this.programmatic) {
                this.isActive = false
                setTimeout(() => {
                    this.$destroy()
                    removeElement(this.$el)
                }, 150)
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
            document.documentElement.classList.remove('is-clipped')
            const savedScrollTop = !this.savedScrollTop
                ? document.documentElement.scrollTop
                : this.savedScrollTop
            document.body.classList.remove('is-noscroll')
            document.documentElement.scrollTop = savedScrollTop
            document.body.style.top = null
        }
    }
}
</script>
