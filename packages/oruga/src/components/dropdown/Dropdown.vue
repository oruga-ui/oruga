<template>
    <div
        ref="dropdown"
        :class="rootClasses"
    >
        <div
            v-if="!inline"
            role="button"
            ref="trigger"
            :class="triggerClasses"
            @click="onClick"
            @contextmenu.prevent="onContextMenu"
            @mouseenter="onHover"
            @focus.capture="onFocus"
            aria-haspopup="true">
            <slot name="trigger" :active="isActive"/>
        </div>

        <transition :name="animation">
            <div
                v-if="isMobileModal"
                v-show="isActive"
                :class="backgroundClasses"
                :aria-hidden="!isActive"
            />
        </transition>
        <transition :name="animation">
            <div
                v-show="(!disabled && (isActive || isHoverable)) || inline"
                ref="dropdownMenu"
                :class="menuClasses"
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
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import trapFocus from '../../directives/trapFocus'
import config from '../../utils/config'
import { removeElement, createAbsoluteElement, toCssDimension, getValueByPath } from '../../utils/helpers'

/**
 * Dropdowns are very versatile, can used as a quick menu or even like a select for discoverable content
 * @displayName Dropdown
 * @requires ./DropdownItem.vue
 * @example ./examples/Dropdown.md
 * @style _dropdown.scss 
 */
export default {
    name: 'ODropdown',
    directives: {
        trapFocus
    },
    mixins: [BaseComponentMixin],
    provide() {
        return {
            $dropdown: this
        }
    },
    props: {
        /** @model */
        value: {
            type: [String, Number, Boolean, Object, Array],
            default: null
        },
        /**
         * Dropdown disabled
         */
        disabled: Boolean,
        /**
         * Dropdown content (items) are shown inline, trigger is removed
         */
        inline: Boolean,
        /**
         * Dropdown content will be scrollable
         */
        scrollable: Boolean,
        /**
         * Max height of dropdown content
         */
        maxHeight: {
            type: [String, Number],
            default: () => {
                return getValueByPath(config, 'dropdown.maxHeight', 200)
            }
        },
        /**
         * Optional, position of the dropdown relative to the trigger
         * @values top-right, top-left, bottom-left
         */
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
        /**
         * Dropdown content (items) are shown into a modal on mobile
         */
        mobileModal: {
            type: Boolean,
            default: () => {
                return getValueByPath(config, 'dropdown.mobileModal', true)
            }
        },
        /**
         * Role attribute to be passed to list container for better accessibility. Use menu only in situations where your dropdown is related to navigation menus
         * @values list, menu, dialog
         */
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
        /**
         * Custom animation (transition name)
         */
        animation: {
            type: String,
            default: () => {
                return getValueByPath(config, 'dropdown.animation', 'fade')
            }
        },
        /**
         * Allows multiple selections
         */
        multiple: Boolean,
        /**
         * Trap focus inside the dropdown.
         */
        trapFocus: {
            type: Boolean,
            default: () => {
                return getValueByPath(config, 'dropdown.trapFocus', true)
            }
        },
        /**
         * Close dropdown when content is clicked
         */
        closeOnClick: {
            type: Boolean,
            default: true
        },
        /**
         * Can close dropdown by pressing escape or by clicking outside
         * @values escape, outside
         */
        canClose: {
            type: [Array, Boolean],
            default: true
        },
        /**
         * Dropdown will be expanded (full-width)
         */
        expanded: Boolean,
        /**
         * Dropdown will be triggered by any events
         * @values click, hover, contextmenu, focus
         */
        triggers: {
            type: Array,
            default: () => ['click']
        },
        /**
         * Append dropdown content to body
         */
        appendToBody: Boolean,
        appendToBodyCopyParent: Boolean,
        rootClass: String,
        triggerClass: String,
        backgroundClass: String,
        menuClass: String,
        disabledClass: String,
        activeClass: String,
        hoverableClass: String,
        inlineClass: String,
        mobileClass: String,
        expandedClass: String
    },
    data() {
        return {
            selected: this.value,
            isActive: false,
            isHoverable: false,
            bodyEl: undefined // Used to append to body
        }
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('dropdown', 'rootClass', 'o-dropdown'),
                { [this.computedClass('dropdown', 'disabledClass', 'o-dropdown-disabled')]: this.disabled },
                { [`${this.computedClass('dropdown', 'positionClass', 'o-dropdown-')}${this.position}`]: this.position },
                { [this.computedClass('dropdown', 'activeClass', 'o-dropdown-active')]: (this.isActive || this.inline) },
                { [this.computedClass('dropdown', 'hoverableClass', 'o-dropdown-hoverable')]: this.hoverable },
                { [this.computedClass('dropdown', 'inlineClass', 'o-dropdown-inline')]: this.inline },
                { [this.computedClass('dropdown', 'expandedClass', 'o-dropdown-expanded')]: this.expanded },
                { [this.computedClass('dropdown', 'mobileClass', 'o-dropdown-mobile')]: this.isMobileModal },
            ]
        },
        triggerClasses() {
            return [
                this.computedClass('dropdown', 'triggerClass', 'o-dropdown-trigger')
            ]
        },
        backgroundClasses() {
            return [
                this.computedClass('dropdown', 'backgroundClass', 'o-dropdown-background')
            ]
        },
        menuClasses() {
            return [
                this.computedClass('dropdown', 'menuClass', 'o-dropdown-menu o-dropdown-menu-animation')
            ]
        },
        isMobileModal() {
            return this.mobileModal && !this.inline
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
        },
        hoverable() {
            return this.triggers.indexOf('hover') >= 0
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
                    if (this.selected.indexOf(value) === -1) {
                        // Add value
                        this.selected = [...this.selected, value]
                    } else {
                        // Remove value
                        this.selected = this.selected.filter((val) => val !== value)
                    }
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

        onClick() {
            if (this.triggers.indexOf('click') < 0) return
            this.toggle()
        },
        onContextMenu() {
            if (this.triggers.indexOf('contextmenu') < 0) return
            this.toggle()
        },
        onHover() {
            if (this.triggers.indexOf('hover') < 0) return
            this.isHoverable = true
        },
        onFocus() {
            if (this.triggers.indexOf('focus') < 0) return
            this.toggle()
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

        updateAppendToBody() {
            const dropdownMenu = this.$refs.dropdownMenu
            const trigger = this.$refs.trigger
            if (dropdownMenu && trigger) {
                // update wrapper dropdown
                const dropdown = this.$data.bodyEl.children[0]
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
                    const parent = this.$data.bodyEl
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
            this.$data.bodyEl = createAbsoluteElement(this.$refs.dropdownMenu)
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
