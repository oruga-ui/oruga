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
                :aria-hidden="!isActive"
                :role="ariaRole"
                :style="menuStyle"
                v-trap-focus="trapFocus">
                <slot/>
            </div>
        </transition>
    </div>
</template>

<script>
import trapFocus from '../../directives/trapFocus'
import config from '../../utils/config'
import { removeElement, createAbsoluteElement, toCssDimension, getValueByPath, getCssClass } from '../../utils/helpers'

export default {
    name: 'ODropdown',
    directives: {
        trapFocus
    },
    provide() {
        return {
            $dropdown: this
        }
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
            default: () => {
                return getValueByPath(config, 'dropdown.maxHeight', 200)
            }
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
                return getValueByPath(config, 'dropdown.mobileModal', true)
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
            default: () => {
                return getValueByPath(config, 'dropdown.animation')
            }
        },
        multiple: Boolean,
        trapFocus: {
            type: Boolean,
            default: () => {
                return getValueByPath(config, 'dropdown.trapFocus', true)
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
                return getCssClass(clazz, override, 'o-dropdown')
            }
        },
        triggerClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'dropdown.override', false)
                const clazz = getValueByPath(config, 'dropdown.triggerClass', '')
                return getCssClass(clazz, override, 'o-dropdown-trigger')
            }
        },
        backgroundClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'dropdown.override', false)
                const clazz = getValueByPath(config, 'dropdown.backgroundClass', '')
                return getCssClass(clazz, override, 'o-dropdown-background')
            }
        },
        menuClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'dropdown.override', false)
                const clazz = getValueByPath(config, 'dropdown.menuClass', '')
                return getCssClass(clazz, override, 'o-dropdown-menu o-dropdown-menu-animation')
            }
        },
        disabledClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'dropdown.override', false)
                const clazz = getValueByPath(config, 'dropdown.disabledClass', '')
                return getCssClass(clazz, override, 'o-dropdown-disabled')
            }
        },
        activeClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'dropdown.override', false)
                const clazz = getValueByPath(config, 'dropdown.activeClass', '')
                return getCssClass(clazz, override, 'o-dropdown-active')
            }
        },
        hoverableClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'dropdown.override', false)
                const clazz = getValueByPath(config, 'dropdown.hoverableClass', '')
                return getCssClass(clazz, override, 'o-dropdown-hoverable')
            }
        },
        inlineClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'dropdown.override', false)
                const clazz = getValueByPath(config, 'dropdown.inlineClass', '')
                return getCssClass(clazz, override, 'o-dropdown-inline')
            }
        },
        mobileClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'dropdown.override', false)
                const clazz = getValueByPath(config, 'dropdown.mobileClass', '')
                return getCssClass(clazz, override, 'o-dropdown-mobile')
            }
        },
        expandedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'dropdown.override', false)
                const clazz = getValueByPath(config, 'dropdown.expandedClass', '')
                return getCssClass(clazz, override, 'o-dropdown-expanded')
            }
        }
    },
    data() {
        return {
            selected: this.value,
            isActive: false,
            isHoverable: this.hoverable,
            _bodyEl: undefined // Used to append to body
        }
    },
    computed: {
        rootClasses() {
            return [
                this.rootClass,
                this.disabled && this.disabledClass, 
                this.position && (this.rootClass + '-' + this.position),
                (this.isActive || this.inline) && this.activeClass, 
                this.hoverable && this.hoverableClass,
                this.inline && this.inlineClass,
                this.isMobileModal && this.mobileClass,
                this.expanded && this.expandedClass
            ]
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
        menuStyle() {
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
                    parentNode.classList.forEach((item) => parent.classList.add(item))
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
                dropdownMenu.style.position = 'absolute'
                dropdownMenu.style.top = `${top}px`
                dropdownMenu.style.left = `${left}px`
                dropdownMenu.style.zIndex = '9999'
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
@import "../../scss/variables.scss";

.o-dropdown {
    display: inline-flex;
    position: relative;
    vertical-align: top;
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
    .o-dropdown-menu {
        position: absolute;
        left: 0;
        top: 100%;
        min-width: $dropdown-menu-width;
        z-index: $dropdown-menu-zindex;
        background-color: $dropdown-menu-background;
        border-radius: $dropdown-menu-border-radius;
        box-shadow: $dropdown-menu-box-shadow;
        padding: $dropdown-menu-padding;
        margin: $dropdown-menu-margin;
        &.o-dropdown-menu-animation {
            display: block;
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
        a {
            &.o-dropdown-item {
                cursor: pointer;
                text-decoration: none;
                &:hover {
                    background-color: $dropdown-item-hover-background-color;
                    color: $dropdown-item-hover-color;
                }
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
                display: block;
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
                max-height: $dropdown-mobile-max-height;
                top: 25%;
                left: 50%;
                bottom: auto;
                right: auto;
                transform: translate3d(-50%, -25%, 0);
                overflow-y: auto;
                z-index: $dropdown-mobile-zindex;
            }
        }
    }
}
</style>