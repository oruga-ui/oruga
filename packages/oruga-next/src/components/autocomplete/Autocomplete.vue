<template>
    <div :class="rootClasses">
        <o-input
            v-bind="inputBind"
            v-model="newValue"
            ref="input"
            :type="type"
            :size="size"
            :rounded="rounded"
            :icon="icon"
            :icon-right="newIconRight"
            :icon-right-clickable="newIconRightClickable"
            :icon-pack="iconPack"
            :maxlength="maxlength"
            :autocomplete="newAutocomplete"
            :use-html5-validation="false"
            :aria-autocomplete="ariaAutocomplete"
            :expanded="expanded"
            @update:modelValue="onInput"
            @focus="focused"
            @blur="onBlur"
            @invalid="onInvalid"
            @keydown="keydown"
            @keydown.up.prevent="keyArrows('up')"
            @keydown.down.prevent="keyArrows('down')"
            @icon-right-click="rightIconClick"
            @icon-click="(event) => $emit('icon-click', event)"
        />

        <Teleport :disabled="!appendToBody" to="body">
            <transition :name="animation">
                <div
                    :class="menuClasses"
                    :is="menuTag"
                    v-show="isActive && (!isEmpty || $slots.empty || $slots.header || $slots.footer)"
                    :style="menuStyle"
                    ref="dropdown">
                    <div
                        v-if="$slots.header"
                        :is="itemTag"
                        ref="header"
                        role="button"
                        :tabindex="0"
                        @click="selectHeaderOrFoterByClick($event, 'header')"
                        :class="itemHeaderClasses">
                        <slot name="header"/>
                    </div>
                    <template v-for="(element, groupindex) in computedData">
                        <div
                            v-if="element.group"
                            :is="itemTag"
                            :key="groupindex + 'group'"
                            :class="itemGroupClasses">
                            <slot
                                v-if="$slots.group"
                                name="group"
                                :group="element.group"
                                :index="groupindex" />
                            <span v-else>
                                {{ element.group }}
                            </span>
                        </div>
                        <div
                            v-for="(option, index) in element.items"
                            :key="groupindex + ':' + index"
                            :is="itemTag"
                            :class="itemOptionClasses(option)"
                            @click.stop="setSelected(option, !keepOpen, $event)"
                            :ref="setItemRef"
                        >
                            <slot
                                v-if="$slots.default"
                                :option="option"
                                :index="index" />
                            <span v-else>
                                {{ getValue(option) }}
                            </span>
                        </div>
                    </template>
                    <div
                        v-if="isEmpty && $slots.empty"
                        :is="itemTag"
                        :class="itemEmptyClasses">
                        <slot name="empty" />
                    </div>
                    <div
                        v-if="$slots.footer"
                        :is="itemTag"
                        ref="footer"
                        role="button"
                        :tabindex="0"
                        @click="selectHeaderOrFoterByClick($event, 'footer')"
                        :class="itemFooterClasses">
                        <slot name="footer"/>
                    </div>
                </div>
            </transition>
        </Teleport>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Input from '../input/Input.vue'

import BaseComponentMixin from '../../utils/BaseComponentMixin'
import FormElementMixin from '../../utils/FormElementMixin'

import { getValueByPath, removeElement, createAbsoluteElement, toCssDimension, debounce } from '../../utils/helpers'
import { getOptions } from '../../utils/config'

import { getScrollingParent } from '../../utils/getScrollingParent';

/**
 * Extended input that provide suggestions while the user types
 * @displayName Autocomplete
 * @style _autocomplete.scss
 */
export default defineComponent({
    name: 'OAutocomplete',
    configField: 'autocomplete',
    components: {
        [Input.name]: Input
    },
    mixins: [BaseComponentMixin, FormElementMixin],
    inheritAttrs: false,
    emits: ['update:modelValue', 'select', 'infinite-scroll', 'typing', 'focus', 'blur', 'invalid', 'icon-click', 'icon-right-click'],
    props: {
        /** @model */
        modelValue: [Number, String],
        /** Options / suggestions */
        data: {
            type: Array,
            default: () => []
        },
        /** Native options to use in HTML5 validation */
		autocomplete: String,
        /**
         * Vertical size of input, optional
         * @values small, medium, large
         */
        size: String,
        /** Property of the object (if data is array of objects) to use as display text, and to keep track of selected option */
        field: {
            type: String,
            default: 'value'
        },
        /** The first option will always be pre-selected (easier to just hit enter or tab) */ 
        keepFirst: Boolean,
        /** Clear input text on select */
        clearOnSelect: Boolean,
        /** Open dropdown list on focus */
        openOnFocus: Boolean,
        /** Function to format an option to a string for display in the input as alternative to field prop) */
        customFormatter: Function,
        /** Makes the component check if list reached scroll end and emit infinite-scroll event. */
        checkInfiniteScroll: Boolean,
        /** Keep open dropdown list after select */
        keepOpen: Boolean,
        /** Add a button/icon to clear the inputed text */
        clearable: Boolean,
        /** Max height of dropdown content */
        maxHeight: [String, Number],
        /**
         * Position of dropdown
         * @values auto, top, bottom
         */
        menuPosition: {
            type: String,
            default: 'auto'
        },
        /** Transition name to apply on dropdown list */
        animation: {
            type: String,
            default: () => {
                return getValueByPath(getOptions(), 'autocomplete.animation', 'fade')
            }
        },
        /** Property of the object (if <code>data</code> is array of objects) to use as display text of group */
        groupField: String,
        /** Property of the object (if <code>data</code> is array of objects) to use as key to get items array of each group, optional */
        groupOptions: String,
        /** Number of milliseconds to delay before to emit typing event */
        debounceTyping: Number,
        /** Icon name to be added on the right side */
        iconRight: String,
        /** Clickable icon right if exists */
        iconRightClickable: Boolean,
        /** Append autocomplete content to body */
        appendToBody: Boolean,
        /** Array of keys (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) which will add a tag when typing (default tab and enter) */
        confirmKeys: {
            type: Array,
            default: () => ['Tab', 'Enter']
        },
        /** Input type */
        type: {
            type: String,
            default: 'text'
        },
        /**
         * Menu tag name
         */
        menuTag: {
            type: String,
            default: () => {
                return getValueByPath(getOptions(), 'autocomplete.menuTag', 'div')
            }
        },
        /**
         * Menu item tag name
         */
        itemTag: {
            type: String,
            default: () => {
                return getValueByPath(getOptions(), 'autocomplete.itemTag', 'div')
            }
        },
        /** Trigger the select event for the first pre-selected option when clicking outside and <code>keep-first</code> is enabled */
        selectOnClickOutside: Boolean,
        /** Allows the header in the autocomplete to be selectable */
        selectableHeader: Boolean,
        /** Allows the footer in the autocomplete to be selectable */
        selectableFooter: Boolean,
        rootClass: [String, Function, Array],
        menuClass: [String, Function, Array],
        expandedClass: [String, Function, Array],
        menuPositionClass: [String, Function, Array],
        itemClass: [String, Function, Array],
        itemHoverClass: [String, Function, Array],
        itemGroupTitleClass: [String, Function, Array],
        itemEmptyClass: [String, Function, Array],
        itemHeaderClass: [String, Function, Array],
        itemFooterClass: [String, Function, Array],
        inputClasses: {
            type: Object,
            default: () => {
                return getValueByPath(getOptions(), 'autocomplete.inputClasses', {})
            }
        }
    },
    resizeObserver: undefined,
    data() {
        return {
            // NEW
            scrollingParent: document?.documentElement,
            menuStyle: {
                maxHeight: this.maxHeight ? toCssDimension(this.maxHeight) : undefined,
            },
            // NEW - END
            selected: null,
            hovered: null,
            headerHovered: null,
            footerHovered: null,
            isActive: false,
            newValue: this.modelValue,
            ariaAutocomplete: this.keepFirst ? 'both' : 'list',
            newAutocomplete: this.autocomplete || 'off',
            isListInViewportVertically: true,
            hasFocus: false,
            itemRefs: [],
            width: undefined,
            bodyEl: undefined, // Used to append to body
        }
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-acp'),
                { [this.computedClass('expandedClass', 'o-acp--expanded')]: this.expanded }
            ]
        },
        menuClasses() {
            return [
                this.computedClass('menuClass', 'o-acp__menu'),
                { [this.computedClass('menuPositionClass', 'o-acp__menu--', this.positionClassFromProps)]: !this.appendToBody },
            ]
        },
        itemClasses() {
            return [
                this.computedClass('itemClass', 'o-acp__item')
            ]
        },
        itemEmptyClasses() {
            return [
                ...this.itemClasses,
                this.computedClass('itemEmptyClass', 'o-acp__item--empty')
            ]
        },
        itemGroupClasses() {
            return [
                ...this.itemClasses,
                this.computedClass('itemGroupTitleClass', 'o-acp__item-group-title')
            ]
        },
        itemHeaderClasses() {
            return [
                ...this.itemClasses,
                this.computedClass('itemHeaderClass', 'o-acp__item-header'),
                { [this.computedClass('itemHoverClass', 'o-acp__item--hover')]: this.headerHovered }
            ]
        },
        itemFooterClasses() {
            return [
                ...this.itemClasses,
                this.computedClass('itemFooterClass', 'o-acp__item-footer'),
                { [this.computedClass('itemHoverClass', 'o-acp__item--hover')]: this.footerHovered }
            ]
        },
        inputBind() {
            return {
                ...this.$attrs,
                ...this.inputClasses
            }
        },
        computedData() {
            if (this.groupField) {
                if (this.groupOptions) {
                    const newData = []
                    this.data.forEach((option) => {
                        const group = getValueByPath(option, this.groupField)
                        const items = getValueByPath(option, this.groupOptions)
                        newData.push({ group, items })
                    })
                    return newData
                } else {
                    const tmp = {}
                    this.data.forEach((option) => {
                        const group = getValueByPath(option, this.groupField)
                        if (!tmp[group]) tmp[group] = []
                        tmp[group].push(option)
                    })
                    const newData = []
                    Object.keys(this.data).forEach((group) => {
                        newData.push({ group, items: this.data[group] })
                    })
                    return newData
                }
            }

            // Return no data to avoid the full list to be shown when clearing input
            if (!this.openOnFocus && this.modelValue === '') {
                const dropdownRef = this.$refs.dropdown
                const tDur = 'transition-duration'

                if (dropdownRef) {
                    // 'Disable' fade-out transition on empty dropdown
                    dropdownRef.style.setProperty(tDur, '0ms')
                    setTimeout(() => {
                        // 'Re-enable' after a frame. At this point this computed...
                        dropdownRef.style.removeProperty(tDur)
                    }, 1000 / 60)
                    
                    // ...already returned null and dropdown closed.
                    return [{ items: null }]
                }
            }

            return [{ items: this.data }]
        },
        isEmpty() {
            if (!this.computedData) return true
            return !this.computedData.some((element) => element.items && element.items.length)
        },
        /**
         * White-listed items to not close when clicked.
         * Add input, dropdown and all children.
         */
        whiteList() {
            const whiteList = []
            whiteList.push(this.$refs.input.$el.querySelector('input'))
            whiteList.push(this.$refs.dropdown)
            // Add all children from dropdown
            if (this.$refs.dropdown !== undefined) {
                const children = this.$refs.dropdown.querySelectorAll('*')
                for (const child of children) {
                    whiteList.push(child)
                }
            }
            return whiteList
        },
        positionClassFromProps() {
            if (this.menuPosition !== 'auto') {
                return this.menuPosition
            }
            return ''
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

        $elementRef() {
            return 'input'
        }
    },
    watch: {
        /**
         * When v-model is changed:
         *   1. Update internal value.
         *   2. If it's invalid, validate again.
         */
        modelValue(value) {
            this.newValue = value
        },

        /**
         * When dropdown is toggled, check the visibility to know when
         * to open upwards.
         */
        isActive(_isActive) {
            if (_isActive) {
                this.setMenuAutoPosition() // Noop if not 'auto'
            } else {
                this.menuStyle = {
                    maxHeight: toCssDimension(this.maxHeight)
                }
            }
        },
        /**
         * When updating input's value
         *   1. Emit changes
         *   2. If value isn't the same as selected, set null
         *   3. Close dropdown if value is clear or else open it
         */
        newValue(value) {
            this.$emit('update:modelValue', value)
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
         * Select first option if "keep-first
         */
        data() {
            // Keep first option always pre-selected
            if (this.keepFirst) {
                this.$nextTick(() => {
                    if (this.isActive) {
                        this.selectFirstOption(this.computedData)
                    } else {
                        this.setHovered(null)
                    }
                })
            } else {
                if (this.hovered) {
                    // reset hovered if list doesn't contain it
                    const hoveredValue = this.getValue(this.hovered)
                    const data = this.computedData.map((d) => d.items).reduce((a, b) => ([...a, ...b]), [])
                    if (!data.some(d => this.getValue(d) === hoveredValue)) {
                        this.setHovered(null)
                    }
                }
            }
        },

        debounceTyping: {
            handler(value) {
                this.debouncedEmitTyping = debounce(this.emitTyping, value)
            },
            immediate: true
        }
    },
    methods: {
        itemOptionClasses(option) {
            return [
                ...this.itemClasses,
                { [this.computedClass('itemHoverClass', 'o-acp__item--hover')]: option === this.hovered }
            ]
        },

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
            /**
             * @property {Object} selected selected option
             * @property {Event} event native event
             */
            this.$emit('select', this.selected, event)
            if (this.selected !== null) {
                if (this.clearOnSelect) {
                    const input = this.$refs.input
                    input.newValue = ''
                    input.$refs.input.value = ''
                } else {
                    this.newValue = this.getValue(this.selected)
                }
                this.setHovered(null)
            }
            closeDropdown && this.$nextTick(() => { this.isActive = false })
            this.checkValidity()
        },

        /**
         * Select first option
         */
        selectFirstOption(computedData) {
            this.$nextTick(() => {
                const nonEmptyElements = computedData.filter(
                    (element) => element.items && element.items.length
                )
                if (nonEmptyElements.length) {
                    const option = nonEmptyElements[0].items[0]
                    this.setHovered(option)
                } else {
                    this.setHovered(null)
                }
            })
        },

        /**
         * Key listener.
         * Select the hovered option.
         */
        keydown(event) {
            const { key } = event // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)
            // prevent emit submit event
            if (key === 'Enter') event.preventDefault()
            // Close dropdown on Tab & no hovered
            if (key === 'Escape' || key === 'Tab') {
                this.isActive = false
            }
            if (this.confirmKeys.indexOf(key) >= 0) {
                // If adding by comma, don't add the comma to the input
                if (key === ',') event.preventDefault()
                // Close dropdown on select by Tab
                const closeDropdown = !this.keepOpen || key === 'Tab'
                if (this.hovered === null) {
                    // header and footer uses headerHovered && footerHovered. If header or footer
                    // was selected then fire event otherwise just return so a value isn't selected
                    this.checkIfHeaderOrFooterSelected(event, null, closeDropdown)
                    return
                }
                this.setSelected(this.hovered, closeDropdown, event)
            }
        },

        selectHeaderOrFoterByClick(event, origin) {
            this.checkIfHeaderOrFooterSelected(event, {origin: origin})
        },

        /**
         * Check if header or footer was selected.
         */
        checkIfHeaderOrFooterSelected(event, triggerClick, closeDropdown = true) {
            if (this.selectableHeader && (this.headerHovered || (triggerClick && triggerClick.origin === 'header'))) {
                this.$emit('select-header', event)
                this.headerHovered = false
                if (triggerClick) this.setHovered(null)
                if (closeDropdown) this.isActive = false
            }
            if (this.selectableFooter && (this.footerHovered || (triggerClick && triggerClick.origin === 'header'))) {
                this.$emit('select-footer', event)
                this.footerHovered = false
                if (triggerClick) this.setHovered(null)
                if (closeDropdown) this.isActive = false
            }
        },

        /**
         * Close dropdown if clicked outside.
         */
        clickedOutside(event) {
            if (!this.hasFocus && this.whiteList.indexOf(event.target) < 0) {
                if (this.keepFirst && this.hovered && this.selectOnClickOutside) {
                    this.setSelected(this.hovered, true)
                } else {
                    this.isActive = false
                }
            }
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
        checkIfReachedTheEndOfScroll() {
            const list = this.$refs.dropdown
            const footerHeight = this.$slots.footer ? this.$refs.footer.clientHeight : 0
            if (list.clientHeight !== list.scrollHeight &&
                list.scrollTop + list.clientHeight + footerHeight >= list.scrollHeight
            ) {
                this.$emit('infinite-scroll')
            }
        },
        /**
         * This is called only if menuPosition === 'auto'
         */
        setMenuAutoPosition() {
            if (this.menuPosition !== 'auto') {
                return {} // Noop
            }
            if (this.isActive) {
                this.$nextTick(() => {
                    const inputRef = this.$refs?.input?.$el as HTMLInputElement
                    const dropdownRef = this.$refs?.dropdown as HTMLDivElement

                    if (!inputRef || !dropdownRef) {
                        return
                    }

                    const { height: inputHeight, bottom: inputBottom, top: inputTop } = inputRef.getBoundingClientRect()
                    const { height: dropdownHeight } = dropdownRef.getBoundingClientRect()

                    const maxHeight = toCssDimension(this.maxHeight)
                    if (this.scrollingParent === document.documentElement) {
                        const shouldPlaceOnBottom = inputBottom + dropdownHeight < window.visualViewport.height

                        this.menuStyle = {
                            maxHeight,
                            top: shouldPlaceOnBottom ? `${inputHeight}px` : 'auto',
                            bottom: shouldPlaceOnBottom ? 'auto' : `${inputHeight}px`,
                        }
                    } else {
                        const { top: parentTop, height: parentHeight } = this.scrollingParent.getBoundingClientRect()
                        const distanceFromViewport = inputTop - parentTop 
                        const availableSpace = parentHeight - distanceFromViewport - inputHeight
                        const _shouldPlaceOnBottom = availableSpace >= dropdownHeight

                        this.menuStyle = {
                            maxHeight,
                            top: _shouldPlaceOnBottom ? `${inputHeight}px` : 'auto',
                            bottom: _shouldPlaceOnBottom ? 'auto' : `${inputHeight}px`,
                        }
                    }
                })
            }
        },
        /**
         * Arrows keys listener.
         * If dropdown is active, set hovered option, or else just open.
         */
        keyArrows(direction) {
            const sum = direction === 'down' ? 1 : -1
            if (this.isActive) {
                const data = this.computedData.map(
                    (d) => d.items).reduce((a, b) => ([...a, ...b]), [])

                if (this.$slots.header && this.selectableHeader) {
                    data.unshift(undefined)
                }
                if (this.$slots.footer && this.selectableFooter) {
                    data.push(undefined)
                }
                let index
                if (this.headerHovered) {
                    index = 0 + sum
                } else if (this.footerHovered) {
                    index = (data.length - 1) + sum
                } else {
                    index = data.indexOf(this.hovered) + sum
                }

                index = index > data.length - 1 ? data.length - 1 : index
                index = index < 0 ? 0 : index

                this.footerHovered = false
                this.headerHovered = false
                this.setHovered(data[index] !== undefined ? data[index] : null)
                if (this.$slots.footer && this.selectableFooter && index === data.length - 1) {
                    this.footerHovered = true
                }
                if (this.$slots.header && this.selectableHeader && index === 0) {
                    this.headerHovered = true
                }

                const list = this.$refs.dropdown
                let items = this.itemRefs || []

                if (this.$slots.header && this.selectableHeader) {
                    items = [this.$refs.header, ...items]
                }
                if (this.$slots.footer && this.selectableFooter) {
                    items = [...items, this.$refs.footer]
                }
                const element = items[index]

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
                    // If open on focus, update the hovered
                    this.selectFirstOption(this.computedData)
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
        onInput() {
            const currentValue = this.getValue(this.selected)
            if (currentValue && currentValue === this.newValue) return
            if (this.debounceTyping) {
                this.debouncedEmitTyping()
            } else {
                this.emitTyping()
            }
        },
        emitTyping() {
            this.$emit('typing', this.newValue)
            this.checkValidity()
        },
        rightIconClick(event) {
            if (this.clearable) {
                this.newValue = ''
                this.setSelected(null, false)
                if (this.openOnFocus) {
                    this.$refs.input.$el.focus()
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
        setItemRef(el) {
            if (el) {
                this.itemRefs.push(el)
            }
        },
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('click', this.clickedOutside)
        }
    },
    mounted() {
        const list = this.$refs.dropdown
        if (this.checkInfiniteScroll && list) {
            list.addEventListener('scroll', this.checkIfReachedTheEndOfScroll)
        }

        // Dynamic positioning handling - START
        this.scrollingParent = getScrollingParent(this.$refs?.input?.$el)

        if (this.scrollingParent !== document.documentElement) {
            this.scrollingParent.addEventListener('scroll', this.setMenuAutoPosition, { passive: true })
            this.resizeObserver = new ResizeObserver(this.setMenuAutoPosition)
            this.resizeObserver.observe(this.scrollingParent)
        } else {
            document.addEventListener('scroll', this.setMenuAutoPosition, { passive: true })
            window.addEventListener('resize', this.setMenuAutoPosition)
        }
        // Dynamic positioning handling - END

        if (this.appendToBody) {
            this.$data.bodyEl = createAbsoluteElement(list)
            this.updateAppendToBody()
        }
    },
    beforeUpdate() {
        this.width = this.$refs.input ? this.$refs.input.$el.clientWidth : undefined
        this.itemRefs = []
    },
    beforeUnmount() {
        document.removeEventListener('click', this.clickedOutside)

        // Dynamic positioning handling - START
        this.resizeObserver?.disconnect()
        window.removeEventListener('resize', this.setMenuAutoPosition)
        document.removeEventListener('scroll', this.setMenuAutoPosition)
        // Dynamic positioning handling - END
        
        if (this.checkInfiniteScroll && this.$refs.dropdown) {
            const list = this.$refs.dropdown
            list.removeEventListener('scroll', this.checkIfReachedTheEndOfScroll)
        }
        if (this.appendToBody) {
            removeElement(this.$data.bodyEl)
        }
    }
})
</script>
