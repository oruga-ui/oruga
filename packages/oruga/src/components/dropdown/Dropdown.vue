<template>
    <div
        ref="dropdown"
        :class="rootClasses"
    >
        <div
            v-if="!inline"
            role="button"
            ref="trigger"
            :class="triggerClass"
            @click="toggle"
            @mouseenter="checkHoverable"
            aria-haspopup="true">
            <slot name="trigger" :active="isActive"/>
        </div>

        <transition :name="animation">
            <div
                v-if="isMobileModal"
                v-show="isActive"
                :class="backgroundClass"
                :aria-hidden="!isActive"
            />
        </transition>
        <transition :name="animation">
            <div
                v-show="(!disabled && (isActive || isHoverable)) || inline"
                ref="dropdownMenu"
                :class="menuClass"
                :style="style"
                :aria-hidden="!isActive"
                v-trap-focus="trapFocus">
                <div
                    :class="contentClass"
                    :role="ariaRole"
                    :style="contentStyle">
                    <slot/>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import trapFocus from '../../directives/trapFocus'
import config from '../../utils/config'
import { removeElement, createAbsoluteElement, toCssDimension, getValueByPath } from '../../utils/helpers'

export default {
    name: 'ODropdown',
    directives: {
        trapFocus
    },
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array, Function],
            default: null
        },
        disabled: Boolean,
        hoverable: Boolean,
        inline: Boolean,
        scrollable: Boolean,
        maxHeight: {
            type: [String, Number],
            default: 200
        },
        position: {
            type: String,
            validator(value) {
                return [
                    'top-right',
                    'top-left',
                    'bottom-left',
                    'bottom-right'
                ].indexOf(value) > -1
            }
        },
        mobileModal: {
            type: Boolean,
            default: () => {
                return config.defaultDropdownMobileModal
            }
        },
        ariaRole: {
            type: String,
            validator(value) {
                return [
                    'menu',
                    'list',
                    'dialog'
                ].indexOf(value) > -1
            },
            default: null
        },
        animation: {
            type: String,
            default: 'fade'
        },
        multiple: Boolean,
        trapFocus: {
            type: Boolean,
            default: () => {
                return config.defaultTrapFocus
            }
        },
        closeOnClick: {
            type: Boolean,
            default: true
        },
        canClose: {
            type: [Array, Boolean],
            default: true
        },
        expanded: Boolean,
        appendToBody: Boolean,
        appendToBodyCopyParent: Boolean,
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'dropdown.override', false)
                const clazz = getValueByPath(config, 'dropdown.rootClass', '')
                return (clazz ? (clazz + ' ') : '') + (override ? '' : 'o-dropdown o-dropdown-menu-animation')
            }
        },
        triggerClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'dropdown.override', false)
                const clazz = getValueByPath(config, 'dropdown.triggerClass', '')
                return (clazz ? (clazz + ' ') : '') + (override ? '' : 'o-dropdown-trigger')
            }
        },
        backgroundClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'dropdown.override', false)
                const clazz = getValueByPath(config, 'dropdown.backgroundClass', '')
                return (clazz ? (clazz + ' ') : '') + (override ? '' : 'o-dropdown-background')
            }
        },
        menuClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'dropdown.override', false)
                const clazz = getValueByPath(config, 'dropdown.menuClass', '')
                return (clazz ? (clazz + ' ') : '') + (override ? '' : 'o-dropdown-menu')
            }
        },
        contentClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'dropdown.override')
                const clazz = getValueByPath(config, 'dropdown.contentClass', '')
                return (clazz ? (clazz + ' ') : '') + (override ? '' : 'o-dropdown-content')
            }
        },
        disabledClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'dropdown.override', false)
                const clazz = getValueByPath(config, 'dropdown.disabledClass', '')
                return (clazz ? (clazz + ' ') : '') + (override ? '' : 'o-dropdown-disabled')
            }
        }
    },
    data() {
        return {
            selected: this.value,
            style: {},
            isActive: false,
            isHoverable: this.hoverable,
            _isDropdown: true, // Used internally by DropdownItem
            _bodyEl: undefined // Used to append to body
        }
    },
    computed: {
        rootClasses() {
            return [this.rootClass,
                this.disabled && this.disabledClass, 
                this.position && ('o-dropdown-' + this.position), {
                'o-dropdown-hoverable': this.hoverable,
                'o-dropdown-inline': this.inline,
                'o-dropdown-active': this.isActive || this.inline,
                'o-dropdown-mobile': this.isMobileModal,
            }]
        },
        isMobileModal() {
            return this.mobileModal && !this.inline && !this.hoverable
        },
        cancelOptions() {
            return typeof this.canClose === 'boolean'
                ? this.canClose
                    ? ['escape', 'outside']
                    : []
                : this.canClose
        },
        contentStyle() {
            return {
                maxHeight: this.scrollable ? toCssDimension(this.maxHeight) : null,
                overflow: this.scrollable ? 'auto' : null
            }
        }
    },
    watch: {
        /**
        * When v-model is changed set the new selected item.
        */
        value(value) {
            this.selected = value
        },

        /**
        * Emit event when isActive value is changed.
        */
        isActive(value) {
            this.$emit('active-change', value)
            if (this.appendToBody) {
                this.$nextTick(() => {
                    this.updateAppendToBody()
                })
            }
        }
    },
    methods: {
        /**
        * Click listener from DropdownItem.
        *   1. Set new selected item.
        *   2. Emit input event to update the user v-model.
        *   3. Close the dropdown.
        */
        selectItem(value) {
            if (this.multiple) {
                if (this.selected) {
                    const index = this.selected.indexOf(value)
                    if (index === -1) this.selected.push(value)
                    else this.selected.splice(index, 1)
                } else {
                    this.selected = [value]
                }
                this.$emit('change', this.selected)
            } else {
                if (this.selected !== value) {
                    this.selected = value
                    this.$emit('change', this.selected)
                }
            }
            this.$emit('input', this.selected)
            if (!this.multiple) {
                this.isActive = !this.closeOnClick
                if (this.hoverable && this.closeOnClick) {
                    this.isHoverable = false
                }
            }
        },

        /**
        * White-listed items to not close when clicked.
        */
        isInWhiteList(el) {
            if (el === this.$refs.dropdownMenu) return true
            if (el === this.$refs.trigger) return true
            // All chidren from dropdown
            if (this.$refs.dropdownMenu !== undefined) {
                const children = this.$refs.dropdownMenu.querySelectorAll('*')
                for (const child of children) {
                    if (el === child) {
                        return true
                    }
                }
            }
            // All children from trigger
            if (this.$refs.trigger !== undefined) {
                const children = this.$refs.trigger.querySelectorAll('*')
                for (const child of children) {
                    if (el === child) {
                        return true
                    }
                }
            }
            return false
        },

        /**
        * Close dropdown if clicked outside.
        */
        clickedOutside(event) {
            if (this.cancelOptions.indexOf('outside') < 0) return
            if (this.inline) return

            if (!this.isInWhiteList(event.target)) this.isActive = false
        },

        /**
         * Keypress event that is bound to the document
         */
        keyPress({ key }) {
            if (this.isActive && (key === 'Escape' || key === 'Esc')) {
                if (this.cancelOptions.indexOf('escape') < 0) return
                this.isActive = false
            }
        },

        /**
        * Toggle dropdown if it's not disabled.
        */
        toggle() {
            if (this.disabled) return

            if (!this.isActive) {
                // if not active, toggle after clickOutside event
                // this fixes toggling programmatic
                this.$nextTick(() => {
                    const value = !this.isActive
                    this.isActive = value
                    // Vue 2.6.x ???
                    setTimeout(() => (this.isActive = value))
                })
            } else {
                this.isActive = !this.isActive
            }
        },

        checkHoverable() {
            if (this.hoverable) {
                this.isHoverable = true
            }
        },

        updateAppendToBody() {
            const dropdownMenu = this.$refs.dropdownMenu
            const trigger = this.$refs.trigger
            if (dropdownMenu && trigger) {
                // update wrapper dropdown
                const dropdown = this.$data._bodyEl.children[0]
                dropdown.classList.forEach((item) => dropdown.classList.remove(item))
                this.rootClasses.forEach((item) => {
                    if (item) {
                        if (typeof item === 'object') {
                            Object.keys(item).filter(key => item[key]).forEach(
                                key => dropdown.classList.add(key))
                        } else {
                            dropdown.classList.add(item)
                        }
                    }
                })
                if (this.appendToBodyCopyParent) {
                    const parentNode = this.$refs.dropdown.parentNode
                    const parent = this.$data._bodyEl
                    parent.classList.forEach((item) => parent.classList.remove(item))
                    parentNode.classList.forEach((item) => {
                        parent.classList.add(item)
                    })
                }
                const rect = trigger.getBoundingClientRect()
                let top = rect.top + window.scrollY
                let left = rect.left + window.scrollX
                if (!this.position || this.position.indexOf('bottom') >= 0) {
                    top += trigger.clientHeight
                } else {
                    top -= dropdownMenu.clientHeight
                }
                if (this.position && this.position.indexOf('left') >= 0) {
                    left -= (dropdownMenu.clientWidth - trigger.clientWidth)
                }
                this.style = {
                    position: 'absolute',
                    top: `${top}px`,
                    left: `${left}px`,
                    zIndex: '99'
                }
            }
        }
    },
    mounted() {
        if (this.appendToBody) {
            this.$data._bodyEl = createAbsoluteElement(this.$refs.dropdownMenu)
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
$dropdown-disabled-opacity: 0.5 !default;
$dropdown-mobile-breakpoint: 1024px !default;
$dropdown-mobile-overlay-color: rgba(black, 0.86) !default;
$dropdown-mobile-overlay-zindex: 40!default;
$dropdown-mobile-max-width: 460px !default;
$dropdown-mobile-width: calc(100vw - 40px) !default;
$dropdown-mobile-zindex: 50 !default;
$dropdown-menu-width: 12rem !default;
$dropdown-menu-padding: .5rem 0 .5rem 0 !default;
$dropdown-menu-zindex: 20 !default;
$dropdown-menu-background: #ffffff !default;
$dropdown-menu-border-radius: 4px !default;
$dropdown-menu-box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02) !important;
$dropdown-item-color: #4a4a4a !default;
$dropdown-item-padding: .375rem 1rem !default;
$dropdown-item-font-size: .875rem !default;
$dropdown-item-line-height: 1.5 !default;
$dropdown-item-color-active: #ffffff !default;
$dropdown-item-background-active: #3273dc !default;
$dropdown-item-disabled-opacity: 0.5 !default;

.o-dropdown {
    display: inline-flex;
    position: relative;
    .o-dropdown-background {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        cursor: pointer;
        background-color: $dropdown-mobile-overlay-color;
        z-index: $dropdown-mobile-overlay-zindex;
        @media screen and (min-width: $dropdown-mobile-breakpoint) {
            display: none;
        }
    }
    &.o-dropdown-menu-animation {
        .o-dropdown-menu {
            display: block;
        }
    }
    .o-dropdown-menu {
        left: 0;
        // padding: $dropdown-menu-padding;
        position: absolute;
        top: 100%;
        min-width: $dropdown-menu-width;
        z-index: $dropdown-menu-zindex;
        .o-dropdown-content {
            background-color: $dropdown-menu-background;
            border-radius: $dropdown-menu-border-radius;
            box-shadow: $dropdown-menu-box-shadow;
            padding: $dropdown-menu-padding;
        }
        .o-dropdown-item {
            display: block;
            position: relative;
            color: $dropdown-item-color;
            font-size: $dropdown-item-font-size;
            line-height: $dropdown-item-line-height;
            padding: $dropdown-item-padding;
            &.o-dropdown-item-disabled {
                cursor: not-allowed;
            }
            &.o-dropdown-item-active {
                background-color: $dropdown-item-background-active;
                color: $dropdown-item-color-active;
            }
        }
    }
    &.o-dropdown-hoverable:not(.o-dropdown-active) {
        .o-dropdown-menu {
            display: none;
        }
    }
    &.o-dropdown-hoverable {
        &:hover {
            .o-dropdown-menu {
                display: inherit;
            }
        }
    }
    &.o-dropdown-expanded {
        width: 100%;
        .o-dropdown-trigger {
            width: 100%;
        }
        .o-dropdown-menu {
            width: 100%;
        }
        &.o-dropdown-mobile {
            .o-dropdown-menu {
                max-width: 100%;
            }
        }
    }
    &:not(.o-dropdown-disabled) {
        .o-dropdown-menu {
            .o-dropdown-item {
                &.o-dropdown-item-disabled {
                    opacity: $dropdown-item-disabled-opacity;
                }
            }
        }
    }
    &.o-dropdown-disabled {
        opacity: $dropdown-disabled-opacity;
        cursor: not-allowed;
        .o-dropdown-trigger {
            pointer-events: none;
        }
    }
    &.o-dropdown-inline {
        .o-dropdown-menu {
            position: static;
            display: inline-block;
            padding: 0;
        }
    }
    &.o-dropdown-top-right {
        .o-dropdown-menu {
            top: auto;
            bottom: 100%;
        }
    }
    &.o-dropdown-top-left {
        .o-dropdown-menu {
            top: auto;
            bottom: 100%;
            right: 0;
            left: auto;
        }
    }
    &.o-dropdown-bottom-left {
        .o-dropdown-menu {
            right: 0;
            left: auto;
        }
    }
    @media screen and (max-width: $dropdown-mobile-breakpoint - 1px) {
        &.o-dropdown-mobile {
            > .o-dropdown-menu {
                position: fixed;
                width: $dropdown-mobile-width;
                max-width: $dropdown-mobile-max-width;
                // max-height: calc(100vh - 120px);
                top: 25%;
                left: 50%;
                bottom: auto;
                right: auto;
                transform: translate3d(-50%, -25%, 0);
                overflow-y: auto;
                z-index: 50;
            }
        }
    }
}
</style>