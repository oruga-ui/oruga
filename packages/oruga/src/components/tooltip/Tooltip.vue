<template>
    <span ref="tooltip" :class="rootClasses">
        <transition :name="newAnimation">
            <div
                v-show="active && (isActive || always)"
                ref="content"
                :class="contentClass">
                <template v-if="label">{{ label }}</template>
                <template v-else-if="$slots.content">
                    <slot name="content" />
                </template>
            </div>
        </transition>
        <div
            ref="trigger"
            :class="triggerClass"
            @click.prevent="onClick"
            @mouseenter="onHover"
            @focus.capture="onFocus"
            @mouseleave="close">
            <slot ref="slot" />
        </div>
    </span>
</template>

<script>
import config from '../../utils/config'
import { createAbsoluteElement, removeElement, getValueByPath, getCssClass } from '../../utils/helpers'

/**
 * Display a brief helper text to your user
 * @displayName Tooltip
 * @style _tooltip.scss
 */
export default {
    name: 'OTooltip',
    props: {
        active: {
            type: Boolean,
            default: true
        },
        label: String,
        delay: Number,
        position: {
            type: String,
            default: 'top',
            validator(value) {
                return [
                    'top',
                    'bottom',
                    'left',
                    'right'
                ].indexOf(value) > -1
            }
        },
        triggers: {
            type: Array,
            default: () => ['hover']
        },
        always: Boolean,
        animated: {
            type: Boolean,
            default: true
        },
        animation: {
            type: String,
            default: 'fade'
        },
        autoClose: {
            type: [Array, Boolean],
            default: true
        },
        multiline: Boolean,
        appendToBody: Boolean,
        variant: String,
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'tooltip.override', false)
                const clazz = getValueByPath(config, 'tooltip.rootClass', '')
                return getCssClass(clazz, override, 'o-tooltip')
            }
        },
        contentClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'tooltip.override', false)
                const clazz = getValueByPath(config, 'tooltip.contentClass', '')
                return getCssClass(clazz, override, 'o-tooltip-content')
            }
        },
        triggerClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'tooltip.override', false)
                const clazz = getValueByPath(config, 'tooltip.triggerClass', '')
                return getCssClass(clazz, override, 'o-tooltip-trigger')
            }
        },
        multilineClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'tooltip.override', false)
                const clazz = getValueByPath(config, 'tooltip.multilineClass', '')
                return getCssClass(clazz, override, 'o-tooltip-multiline')
            }
        },
        alwaysClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'tooltip.override', false)
                const clazz = getValueByPath(config, 'tooltip.alwaysClass', '')
                return getCssClass(clazz, override, 'o-tooltip-always')
            }
        }
    },
    data() {
        return {
            isActive: false,
            bodyEl: undefined // Used to append to body
        }
    },
    computed: {
        rootClasses() {
            return [
                this.rootClass,
                this.variant && ('o-color-' + this.variant),
                this.multiline && this.multilineClass,
                this.position && (this.rootClass + '-' + this.position),
                this.always && this.alwaysClass
            ]
        },
        newAnimation() {
            return this.animated ? this.animation : undefined
        }
    },
    watch: {
        isActive(value) {
            if (value && this.appendToBody) {
                this.updateAppendToBody()
            }
        }
    },
    methods: {
        updateAppendToBody() {
            const tooltip = this.$refs.tooltip
            const trigger = this.$refs.trigger
            if (tooltip && trigger) {
                // update wrapper tooltip
                const tooltipEl = this.$data.bodyEl.children[0]
                tooltipEl.classList.forEach((item) => tooltipEl.classList.remove(item))
                this.rootClasses.forEach((item) => {
                    if (typeof item === 'object') {
                        Object.keys(item).filter(key => !!item[key]).forEach(
                            key => tooltipEl.classList.add(key))
                    } else {
                        tooltipEl.classList.add(item)
                    }
                })
                tooltipEl.style.width = `${trigger.clientWidth}px`
                tooltipEl.style.height = `${trigger.clientHeight}px`
                const rect = trigger.getBoundingClientRect()
                const top = rect.top + window.scrollY
                const left = rect.left + window.scrollX
                const wrapper = this.$data.bodyEl
                wrapper.style.position = 'absolute'
                wrapper.style.top = `${top}px`
                wrapper.style.left = `${left}px`
                wrapper.style.zIndex = this.isActive ? '9999' : '-1'
            }
        },
        onClick() {
            if (this.triggers.indexOf('click') < 0) return
            // if not active, toggle after clickOutside event
            // this fixes toggling programmatic
            this.$nextTick(() => {
                setTimeout(() => this.open())
            })
        },
        onHover() {
            if (this.triggers.indexOf('hover') < 0) return
            this.open()
        },
        onFocus() {
            if (this.triggers.indexOf('focus') < 0) return
            this.open()
        },
        open() {
            if (this.delay) {
                setTimeout(() => (this.isActive = true), this.delay)
            } else {
                this.isActive = true
            }
        },
        close() {
            if (typeof this.autoClose === 'boolean') {
                this.isActive = !this.autoClose
            }
        },
        /**
        * Close tooltip if clicked outside.
        */
        clickedOutside(event) {
            if (this.isActive) {
                if (Array.isArray(this.autoClose)) {
                    if (this.autoClose.indexOf('outside') >= 0) {
                        if (!this.isInWhiteList(event.target)) this.isActive = false
                    } else if (this.autoClose.indexOf('inside') >= 0) {
                        if (this.isInWhiteList(event.target)) this.isActive = false
                    }
                }
            }
        },
        /**
         * Keypress event that is bound to the document
         */
        keyPress({ key }) {
            if (this.isActive && (key === 'Escape' || key === 'Esc')) {
                if (Array.isArray(this.autoClose)) {
                    if (this.autoClose.indexOf('escape') >= 0) this.isActive = false
                }
            }
        },
        /**
        * White-listed items to not close when clicked.
        */
        isInWhiteList(el) {
            if (el === this.$refs.content) return true
            // All chidren from content
            if (this.$refs.content !== undefined) {
                const children = this.$refs.content.querySelectorAll('*')
                for (const child of children) {
                    if (el === child) {
                        return true
                    }
                }
            }
            return false
        }
    },
    mounted() {
        if (this.appendToBody) {
            this.$data.bodyEl = createAbsoluteElement(this.$refs.content)
            this.updateAppendToBody()
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('click', this.clickedOutside)
            document.addEventListener('keyup', this.keyPress)
        }
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('click', this.clickedOutside)
            document.removeEventListener('keyup', this.keyPress)
        }
        if (this.appendToBody) {
            removeElement(this.$data.bodyEl)
        }
    }
}
</script>
