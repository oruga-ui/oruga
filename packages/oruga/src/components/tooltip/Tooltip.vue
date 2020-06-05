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
        contentClass: String,
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
    },
    data() {
        return {
            isActive: false,
            _bodyEl: undefined // Used to append to body
        }
    },
    computed: {
        rootClasses() {
            return [
                this.rootClass,
                this.variant && ('o-color-' + this.variant),
                this.multiline && 'o-tooltip-multiline',
                `o-tooltip-${this.position}`, {
                'o-tooltip-always': this.always
            }]
        },
        newAnimation() {
            return this.animated ? this.animation : undefined
        }
    },
    watch: {
        isActive(value) {
            if (this.appendToBody) {
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
                const tooltipEl = this.$data._bodyEl.children[0]
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
                let top = rect.top + window.scrollY
                let left = rect.left + window.scrollX
                const wrapper = this.$data._bodyEl
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
            this.$data._bodyEl = createAbsoluteElement(this.$refs.content)
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
            removeElement(this.$data._bodyEl)
        }
    }
}
</script>

<style lang="scss">
@import "../../scss/variables.scss";

@mixin tooltip-arrow($direction, $color) {
    @if ($direction == "top") {
        border-top: $tooltip-arrow-size solid $color;
        border-right: $tooltip-arrow-size solid transparent;
        border-left: $tooltip-arrow-size solid transparent;
    } @else if ($direction == "bottom") {
        border-right: $tooltip-arrow-size solid transparent;
        border-bottom: $tooltip-arrow-size solid $color;
        border-left: $tooltip-arrow-size solid transparent;
    } @else if ($direction == "right") {
        border-top: $tooltip-arrow-size solid transparent;
        border-right: $tooltip-arrow-size solid $color;
        border-bottom: $tooltip-arrow-size solid transparent;
    } @else if ($direction == "left") {
        border-top: $tooltip-arrow-size solid transparent;
        border-bottom: $tooltip-arrow-size solid transparent;
        border-left: $tooltip-arrow-size solid $color;
    }
}

@mixin tooltip($direction) {
    &.o-tooltip-#{$direction} {
        .o-tooltip-content {
            @if ($direction == "top") {
                top: auto;
                right: auto;
                bottom: calc(100% + #{$tooltip-arrow-size} + #{$tooltip-arrow-margin});
                left: 50%;
                transform: translateX(-50%);
            } @else if ($direction == "bottom") {
                top: calc(100% + #{$tooltip-arrow-size} + #{$tooltip-arrow-margin});
                right: auto;
                bottom: auto;
                left: 50%;
                transform: translateX(-50%);
            } @else if ($direction == "right") {
                top: 50%;
                right: auto;
                bottom: auto;
                left: calc(100% + #{$tooltip-arrow-size} + #{$tooltip-arrow-margin});
                transform: translateY(-50%);
            } @else if ($direction == "left") {
                top: 50%;
                right: calc(100% + #{$tooltip-arrow-size} + #{$tooltip-arrow-margin});
                bottom: auto;
                left: auto;
                transform: translateY(-50%);
            }
        }
        .o-tooltip-content::before {
            @if ($direction == "bottom") {
                top: auto;
                right: auto;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
            } @else if ($direction == "top") {
                top: 100%;
                right: auto;
                bottom: auto;
                left: 50%;
                transform: translateX(-50%);
            } @else if ($direction == "left") {
                top: 50%;
                right: auto;
                bottom: auto;
                left: 100%;
                transform: translateY(-50%);
            } @else if ($direction == "right") {
                top: 50%;
                right: 100%;
                bottom: auto;
                left: auto;
                transform: translateY(-50%);
            }
            @include tooltip-arrow($direction, $tooltip-background-color);
        }
        @each $name, $pair in $colors {
            $color: nth($pair, 1);
            &.o-color-#{$name} {
                .o-tooltip-content::before {
                    @include tooltip-arrow($direction, $color)
                }
            }
        }
    }
}

// Base
.o-tooltip {
    @include tooltip("top");
    @include tooltip("right");
    @include tooltip("bottom");
    @include tooltip("left");
    position: relative;
    display: inline-flex;
    .o-tooltip-content {
        position: absolute;
        max-width: $tooltip-content-max-width;
        padding: $tooltip-content-padding;
        border-radius: $tooltip-content-radius-large;
        font-size: $tooltip-content-font-size;
        font-weight: $tooltip-content-weight-normal;
        box-shadow: $tooltip-content-box-shadow;
        z-index: $tooltip-content-zindex;
        white-space: nowrap;
        background-color: $tooltip-background-color;
        color: $tooltip-color;
    }
    .o-tooltip-content::before {
        position: absolute;
        content: "";
        pointer-events: none;
        z-index: calc($tooltip-content-zindex + 1); 
    }
    .o-tooltip-trigger {
        width: 100%;
        z-index: calc($tooltip-content-zindex - 1);
    }
    @each $name, $pair in $colors {
        $color: nth($pair, 1);
        $color-invert: nth($pair, 2);
        &.o-color-#{$name} {
            .o-tooltip-content {
                background: $color;
                color: $color-invert;
            }
        }
    }
    &.o-tooltip-always {
        .o-tooltip-content::before,
        .o-tooltip-content {
            opacity: 1;
            visibility: visible;
        }
    }
    &.o-tooltip-multiline {
        .o-tooltip-content {
            text-align: center;
            white-space: normal;
            width: $tooltip-content-multiline-width;
        }
    }
}
</style>