<template>
    <div :class="rootClasses">
        <o-input
            v-model="newValue"
            ref="input"
            type="text"
            :size="size"
            :loading="loading"
            :rounded="rounded"
            :icon="icon"
            :icon-right="newIconRight"
            :icon-right-clickable="newIconRightClickable"
            :icon-pack="iconPack"
            :maxlength="maxlength"
            :autocomplete="newAutocomplete"
            :use-html5-validation="false"
            v-bind="$attrs"
            @input="onInput"
            @focus="focused"
            @blur="onBlur"
            @keyup.native.esc.prevent="isActive = false"
            @keydown.native.tab="tabPressed"
            @keydown.native.enter.prevent="enterPressed"
            @keydown.native.up.prevent="keyArrows('up')"
            @keydown.native.down.prevent="keyArrows('down')"
            @icon-right-click="rightIconClick"
            @icon-click="(event) => $emit('icon-click', event)"
        />

        <transition :name="animation">
            <div
                :class="[menuClass, { 'o-autocomplete-opened-top': isOpenedTop && !appendToBody }]"
                v-show="isActive && (data.length > 0 || hasEmptySlot || hasHeaderSlot)"
                :style="contentStyle"
                ref="dropdown">
                <div
                    v-if="hasHeaderSlot"
                    :class="itemClass">
                    <slot name="header"/>
                </div>
                <a
                    v-for="(option, index) in data"
                    :key="index"
                    :class="[itemClass, { [itemHoveredClass]: option === hovered }]"
                    @click="setSelected(option, undefined, $event)">
                    <slot
                        v-if="hasDefaultSlot"
                        :option="option"
                        :index="index"
                    />
                    <span v-else>
                        {{ getValue(option, true) }}
                    </span>
                </a>
                <div
                    v-if="data.length === 0 && hasEmptySlot"
                    :class="[itemClass, itemDisabledClass]">
                    <slot name="empty"/>
                </div>
                <div
                    v-if="hasFooterSlot"
                    :class="itemClass">
                    <slot name="footer"/>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import config from '../../utils/config'
import { getValueByPath, removeElement, createAbsoluteElement, getCssClass } from '../../utils/helpers'
import FormElementMixin from '../../utils/FormElementMixin'
import Input from '../input/Input'

export default {
    name: 'OAutocomplete',
    components: {
        [Input.name]: Input
    },
    mixins: [FormElementMixin],
    inheritAttrs: false,
    provide() {
        return {
            $elementRef: 'input'
        }
    },
    props: {
        value: [Number, String],
        data: {
            type: Array,
            default: () => []
        },
        field: {
            type: String,
            default: 'value'
        },
        keepFirst: Boolean,
        clearOnSelect: Boolean,
        openOnFocus: Boolean,
        customFormatter: Function,
        checkInfiniteScroll: Boolean,
        keepOpen: Boolean,
        clearable: Boolean,
        maxHeight: [String, Number],
        dropdownPosition: {
            type: String,
            default: 'auto'
        },
        animation: {
            type: String,
            default: 'fade'
        },
        iconRight: String,
        iconRightClickable: Boolean,
        appendToBody: Boolean,
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'autocomplete.override', false)
                const clazz = getValueByPath(config, 'autocomplete.rootClass', '')
                return getCssClass(clazz, override, 'o-autocomplete')
            }
        },
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'autocomplete.override', false)
                const clazz = getValueByPath(config, 'autocomplete.rootClass', '')
                return getCssClass(clazz, override, 'o-autocomplete')
            }
        },
        menuClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'autocomplete.override', false)
                const clazz = getValueByPath(config, 'autocomplete.menuClass', '')
                return getCssClass(clazz, override, 'o-autocomplete-menu')
            }
        },
        expandedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'autocomplete.override', false)
                const clazz = getValueByPath(config, 'autocomplete.expandedClass', '')
                return getCssClass(clazz, override, 'o-autocomplete-expanded')
            }
        },
        itemClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'autocomplete.override', false)
                const clazz = getValueByPath(config, 'autocomplete.activeClass', '')
                return getCssClass(clazz, override, 'o-autocomplete-item')
            }
        },
        itemHoveredClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'autocomplete.override', false)
                const clazz = getValueByPath(config, 'autocomplete.itemHoveredClass', '')
                return getCssClass(clazz, override, 'o-autocomplete-item-hovered')
            }
        },
        itemDisabledClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'autocomplete.override', false)
                const clazz = getValueByPath(config, 'autocomplete.itemDisabledClass', '')
                return getCssClass(clazz, override, 'o-autocomplete-item-disabled')
            }
        }
    },
    data() {
        return {
            selected: null,
            hovered: null,
            isActive: false,
            newValue: this.value,
            newAutocomplete: this.autocomplete || 'off',
            isListInViewportVertically: true,
            hasFocus: false,
            _bodyEl: undefined // Used to append to body
        }
    },
    computed: {
        rootClasses() {
            return [
                this.rootClass,
                this.expandend && this.expandedClass
            ]
        },
        /**
         * White-listed items to not close when clicked.
         * Add input, dropdown and all children.
         */
        whiteList() {
            const whiteList = []
            whiteList.push(this.$refs.input.$el.querySelector('input'))
            whiteList.push(this.$refs.dropdown)
            // Add all chidren from dropdown
            if (this.$refs.dropdown !== undefined) {
                const children = this.$refs.dropdown.querySelectorAll('*')
                for (const child of children) {
                    whiteList.push(child)
                }
            }
            if (this.$parent.$data._isTaginput) {
                // Add taginput container
                whiteList.push(this.$parent.$el)
                // Add .tag and .delete
                const tagInputChildren = this.$parent.$el.querySelectorAll('*')
                for (const tagInputChild of tagInputChildren) {
                    whiteList.push(tagInputChild)
                }
            }

            return whiteList
        },

        /**
         * Check if exists default slot
         */
        hasDefaultSlot() {
            return !!this.$scopedSlots.default
        },

        /**
         * Check if exists "empty" slot
         */
        hasEmptySlot() {
            return !!this.$slots.empty
        },

        /**
         * Check if exists "header" slot
         */
        hasHeaderSlot() {
            return !!this.$slots.header
        },

        /**
         * Check if exists "footer" slot
         */
        hasFooterSlot() {
            return !!this.$slots.footer
        },

        /**
         * Apply dropdownPosition property
         */
        isOpenedTop() {
            return this.dropdownPosition === 'top' || (this.dropdownPosition === 'auto' && !this.isListInViewportVertically)
        },

        newIconRight() {
            if (this.clearable && this.newValue) {
                return 'close-circle'
            }
            return this.iconRight
        },

        newIconRightClickable() {
            if (this.clearable) {
                return true
            }
            return this.iconRightClickable
        },

        contentStyle() {
            return {
                maxHeight: this.maxHeight === undefined
                    ? null : (isNaN(this.maxHeight) ? this.maxHeight : this.maxHeight + 'px')
            }
        }
    },
    watch: {
        /**
         * When dropdown is toggled, check the visibility to know when
         * to open upwards.
         */
        isActive(active) {
            if (this.dropdownPosition === 'auto') {
                if (active) {
                    this.calcDropdownInViewportVertical()
                } else {
                    // Timeout to wait for the animation to finish before recalculating
                    setTimeout(() => {
                        this.calcDropdownInViewportVertical()
                    }, 100)
                }
            }
            if (active) this.$nextTick(() => this.setHovered(null))
        },

        /**
         * When updating input's value
         *   1. Emit changes
         *   2. If value isn't the same as selected, set null
         *   3. Close dropdown if value is clear or else open it
         */
        newValue(value) {
            this.$emit('input', value)
            // Check if selected is invalid
            const currentValue = this.getValue(this.selected)
            if (currentValue && currentValue !== value) {
                this.setSelected(null, false)
            }
            // Close dropdown if input is clear or else open it
            if (this.hasFocus && (!this.openOnFocus || value)) {
                this.isActive = !!value
            }
        },

        /**
         * When v-model is changed:
         *   1. Update internal value.
         *   2. If it's invalid, validate again.
         */
        value(value) {
            this.newValue = value
        },

        /**
         * Select first option if "keep-first
         */
        data(value) {
            // Keep first option always pre-selected
            if (this.keepFirst) {
                this.selectFirstOption(value)
            }
        }
    },
    methods: {
        /**
         * Set which option is currently hovered.
         */
        setHovered(option) {
            if (option === undefined) return

            this.hovered = option
        },

        /**
         * Set which option is currently selected, update v-model,
         * update input value and close dropdown.
         */
        setSelected(option, closeDropdown = true, event = undefined) {
            if (option === undefined) return

            this.selected = option
            this.$emit('select', this.selected, event)
            if (this.selected !== null) {
                this.newValue = this.clearOnSelect ? '' : this.getValue(this.selected)
                this.setHovered(null)
            }
            closeDropdown && this.$nextTick(() => { this.isActive = false })
            this.checkValidity()
        },

        /**
         * Select first option
         */
        selectFirstOption(options) {
            this.$nextTick(() => {
                if (options.length) {
                    // If has visible data or open on focus, keep updating the hovered
                    if (this.openOnFocus || (this.newValue !== '' && this.hovered !== options[0])) {
                        this.setHovered(options[0])
                    }
                } else {
                    this.setHovered(null)
                }
            })
        },

        /**
         * Enter key listener.
         * Select the hovered option.
         */
        enterPressed(event) {
            if (this.hovered === null) return
            this.setSelected(this.hovered, !this.keepOpen, event)
        },

        /**
         * Tab key listener.
         * Select hovered option if it exists, close dropdown, then allow
         * native handling to move to next tabbable element.
         */
        tabPressed(event) {
            if (this.hovered === null) {
                this.isActive = false
                return
            }
            this.setSelected(this.hovered, !this.keepOpen, event)
        },

        /**
         * Close dropdown if clicked outside.
         */
        clickedOutside(event) {
            if (this.whiteList.indexOf(event.target) < 0) this.isActive = false
        },

        /**
         * Return display text for the input.
         * If object, get value from path, or else just the value.
         */
        getValue(option) {
            if (option === null) return

            if (typeof this.customFormatter !== 'undefined') {
                return this.customFormatter(option)
            }
            return typeof option === 'object'
                ? getValueByPath(option, this.field)
                : option
        },

        /**
         * Check if the scroll list inside the dropdown
         * reached it's end.
         */
        checkIfReachedTheEndOfScroll(list) {
            if (list.clientHeight !== list.scrollHeight &&
                list.scrollTop + list.clientHeight >= list.scrollHeight) {
                this.$emit('infinite-scroll')
            }
        },

        /**
         * Calculate if the dropdown is vertically visible when activated,
         * otherwise it is openened upwards.
         */
        calcDropdownInViewportVertical() {
            this.$nextTick(() => {
                /**
                * this.$refs.dropdown may be undefined
                * when Autocomplete is conditional rendered
                */
                if (this.$refs.dropdown === undefined) return

                const rect = this.$refs.dropdown.getBoundingClientRect()

                this.isListInViewportVertically = (
                    rect.top >= 0 &&
                    rect.bottom <= (window.innerHeight ||
                        document.documentElement.clientHeight)
                )
                if (this.appendToBody) {
                    this.updateAppendToBody()
                }
            })
        },

        /**
         * Arrows keys listener.
         * If dropdown is active, set hovered option, or else just open.
         */
        keyArrows(direction) {
            const sum = direction === 'down' ? 1 : -1
            if (this.isActive) {
                let index = this.data.indexOf(this.hovered) + sum
                index = index > this.data.length - 1 ? this.data.length : index
                index = index < 0 ? 0 : index

                this.setHovered(this.data[index])

                const list = this.$refs.dropdown
                const element = list.querySelectorAll(`a`)[index]

                if (!element) return

                const visMin = list.scrollTop
                const visMax = list.scrollTop + list.clientHeight - element.clientHeight

                if (element.offsetTop < visMin) {
                    list.scrollTop = element.offsetTop
                } else if (element.offsetTop >= visMax) {
                    list.scrollTop = (
                        element.offsetTop -
                        list.clientHeight +
                        element.clientHeight
                    )
                }
            } else {
                this.isActive = true
            }
        },

        /**
         * Focus listener.
         * If value is the same as selected, select all text.
         */
        focused(event) {
            if (this.getValue(this.selected) === this.newValue) {
                this.$el.querySelector('input').select()
            }
            if (this.openOnFocus) {
                this.isActive = true
                if (this.keepFirst) {
                    this.selectFirstOption(this.data)
                }
            }
            this.hasFocus = true
            this.$emit('focus', event)
        },

        /**
        * Blur listener.
        */
        onBlur(event) {
            this.hasFocus = false
            this.$emit('blur', event)
        },
        onInput(event) {
            const currentValue = this.getValue(this.selected)
            if (currentValue && currentValue === this.newValue) return
            this.$emit('typing', this.newValue)
            this.checkValidity()
        },
        rightIconClick(event) {
            if (this.clearable) {
                this.newValue = ''
                if (this.openOnFocus) {
                    this.$el.focus()
                }
            } else {
                this.$emit('icon-right-click', event)
            }
        },
        checkValidity() {
            if (this.useHtml5Validation) {
                this.$nextTick(() => {
                    this.checkHtml5Validity()
                })
            }
        },
        updateAppendToBody() {
            const dropdownMenu = this.$refs.dropdown
            const trigger = this.$refs.input.$el
            if (dropdownMenu && trigger) {
                // update wrapper dropdown
                const root = this.$data._bodyEl
                root.classList.forEach((item) => root.classList.remove(item))
                this.rootClasses.forEach((item) => {
                    if (item) {
                        if (typeof item === 'object') {
                            Object.keys(item).filter(key => item[key]).forEach(
                                key => root.classList.add(key))
                        } else {
                            root.classList.add(item)
                        }
                    }
                })
                const rect = trigger.getBoundingClientRect()
                let top = rect.top + window.scrollY
                let left = rect.left + window.scrollX
                if (!this.isOpenedTop) {
                    top += trigger.clientHeight
                } else {
                    top -= dropdownMenu.clientHeight
                }
                dropdownMenu.style.position = 'absolute'
                dropdownMenu.style.top = `${top}px`
                dropdownMenu.style.left = `${left}px`
                dropdownMenu.style.width = `${trigger.clientWidth}px`
                dropdownMenu.style.maxWidth = `${trigger.clientWidth}px`
                dropdownMenu.style.zIndex = '9999'
            }
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('click', this.clickedOutside)
            if (this.dropdownPosition === 'auto') window.addEventListener('resize', this.calcDropdownInViewportVertical)
        }
    },
    mounted() {
        if (this.checkInfiniteScroll && this.$refs.dropdown) {
            const list = this.$refs.dropdown
            list.addEventListener('scroll', () => this.checkIfReachedTheEndOfScroll(list))
        }
        if (this.appendToBody) {
            this.$data._bodyEl = createAbsoluteElement(this.$refs.dropdown)
            this.updateAppendToBody()
        }
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('click', this.clickedOutside)
            if (this.dropdownPosition === 'auto') window.removeEventListener('resize', this.calcDropdownInViewportVertical)
        }
        if (this.checkInfiniteScroll && this.$refs.dropdown) {
            const list = this.$refs.dropdown
            list.removeEventListener('scroll', this.checkIfReachedTheEndOfScroll)
        }
        if (this.appendToBody) {
            removeElement(this.$data._bodyEl)
        }
    }
}
</script>

<style lang="scss">
@import "../../scss/variables.scss";

.o-autocomplete {
    position: relative;
    .o-autocomplete-menu {
        display: block;
        min-width: 100%;
        max-width: 100%;
        position: absolute;
        left: 0;
        top: 100%;
        overflow: auto;
        z-index: $autocomplete-menu-zindex;
        background-color: $autocomplete-menu-background;
        border-radius: $autocomplete-menu-border-radius;
        box-shadow: $autocomplete-menu-box-shadow;
        padding: $autocomplete-menu-padding;
        margin: $autocomplete-menu-margin;
        max-height: $autocomplete-menu-max-height;
        &.o-autocomplete-opened-top {
            top: auto;
            bottom: 100%;
        }
        .o-autocomplete-item {
            display: block;
            position: relative;
            color: $autocomplete-item-color;
            font-size: $autocomplete-item-font-size;
            line-height: $autocomplete-item-line-height;
            padding: $autocomplete-item-padding;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &.o-autocomplete-item-disabled {
                cursor: not-allowed;
                opacity: $autocomplete-item-disabled-opacity;
            }
            &.o-autocomplete-item-hovered {
                background: $autocomplete-item-hover-background-color;
                color: $autocomplete-item-hover-color;
            }
        }
    }
    &.o-autocomplete-expanded {
        width: 100%;
        .o-autocomplete-menu {
            width: 100%;
        }
    }
}
</style>