<template>
    <div :class="rootClasses">
        <div
            :class="containerClasses"
            :disabled="disabled"
            @click="hasInput && focus($event)">
            <slot name="selected" :items="items">
                <span
                    v-for="(item, index) in items"
                    :key="getNormalizedItemText(item) + index"
                    :class="itemClasses"
                >
                    <span>{{ getNormalizedItemText(item) }}</span>
                    <o-icon
                        v-if="closable"
                        :class="closeClasses"
                        clickable
                        icon="times"
                        @click.native="removeItem(index, $event)"
                        :aria-label="ariaCloseLabel"
                    />
                </span>
            </slot>

            <o-autocomplete
                ref="autocomplete"
                v-if="hasInput"
                v-model="newItem"
                v-bind="$attrs"
                :root-class="autocompleteClasses"
                :input-classes="inputClasses"
                :data="data"
                :field="field"
                :icon="icon"
                :icon-pack="iconPack"
                :maxlength="maxlength"
                :has-counter="false"
                :size="size"
                :disabled="disabled"
                :loading="loading"
                :autocomplete="nativeAutocomplete"
                :open-on-focus="openOnFocus"
                :keep-open="openOnFocus"
                :group-field="groupField"
                :group-options="groupOptions"
                :use-html5-validation="useHtml5Validation"
                :check-infinite-scroll="checkInfiniteScroll"
                :append-to-body="appendToBody"
                :confirm-keys="confirmKeys"
                @typing="onTyping"
                @focus="onFocus"
                @blur="customOnBlur"
                @keydown.native="keydown"
                @compositionstart.native="isComposing = true"
                @compositionend.native="isComposing = false"
                @select="onSelect"
                @infinite-scroll="emitInfiniteScroll">
                <template
                    v-if="hasHeaderSlot"
                    #header>
                    <slot name="header" />
                </template>
                <template
                    v-if="hasDefaultSlot"
                    #default="props">
                    <slot
                        :option="props.option"
                        :index="props.index" />
                </template>
                <template
                    v-if="hasEmptySlot"
                    #empty>
                    <slot name="empty" />
                </template>
                <template
                    v-if="hasFooterSlot"
                    #footer>
                    <slot name="footer" />
                </template>
            </o-autocomplete>
        </div>

        <small
            v-if="hasCounter && (maxitems || maxlength)"
            :class="counterClasses">
            <template v-if="maxlength && valueLength > 0">
                {{ valueLength }} / {{ maxlength }}
            </template>
            <template v-else-if="maxitems">
                {{ itemsLength }} / {{ maxitems }}
            </template>
        </small>
    </div>
</template>

<script>
import Autocomplete from '../autocomplete/Autocomplete'
import Button from '../button/Button'
import Icon from '../icon/Icon'

import FormElementMixin from '../../utils/FormElementMixin'
import BaseComponentMixin from '../../utils/BaseComponentMixin'

import { getValueByPath } from '../../utils/helpers'
import { getOptions } from '../../utils/config'

/**
 * A simple item input field that can have autocomplete functionality
 * @displayName Multiple Input
 * @example ./examples/Taginput.md
 * @style _taginput.scss
 */
export default {
    name: 'OTaginput',
    components: {
        [Autocomplete.name]: Autocomplete,
        [Button.name]: Button,
        [Icon.name]: Icon
    },
    mixins: [FormElementMixin, BaseComponentMixin],
    inheritAttrs: false,
    configField: 'taginput',
    props: {
        value: {
            type: Array,
            default: () => []
        },
        data: {
            type: Array,
            default: () => []
        },
        variant: String,
        maxitems: {
            type: [Number, String],
            required: false
        },
        hasCounter: {
            type: Boolean,
            default: () => {
                return getValueByPath(getOptions(), 'taginput.hasCounter', true)
            }
        },
        field: {
            type: String,
            default: 'value'
        },
        autocomplete: Boolean,
        groupField: String,
        groupOptions: String,
        nativeAutocomplete: String,
        openOnFocus: Boolean,
        disabled: Boolean,
        closable: {
            type: Boolean,
            default: () => {
                return getValueByPath(getOptions(), 'taginput.closable', true)
            }
        },
        ariaCloseLabel: String,
        confirmKeys: {
            type: Array,
            default: () => {
                return getValueByPath(getOptions(), 'taginput.confirmKeys', [',', 'Tab', 'Enter'])
            }
        },
        removeOnKeys: {
            type: Array,
            default: () => {
                return getValueByPath(getOptions(), 'taginput.removeOnKeys', ['Backspace'])
            }
        },
        allowNew: Boolean,
        onPasteSeparators: {
            type: Array,
            default: () => {
                return getValueByPath(getOptions(), 'taginput.onPasteSeparators', [','])
            }
        },
        beforeAdding: {
            type: Function,
            default: () => true
        },
        allowDuplicates: {
            type: Boolean,
            default: false
        },
        checkInfiniteScroll: {
            type: Boolean,
            default: false
        },
        createItem: {
            type: Function,
            default: (item) => item
        },
        ariaCloseLabel: String,
        appendToBody: Boolean,
        rootClass: [String, Array, Function],
        expandedClass: [String, Array, Function],
        variantClass: [String, Array, Function],
        closeClass: [String, Array, Function],
        itemClass: [String, Array, Function],
        counterClass: [String, Array, Function],
        autocompleteClass: [String, Array, Function],
        inputClass: [String, Array, Function],
    },
    data() {
        return {
            items: Array.isArray(this.value) ? this.value.slice(0) : (this.value || []),
            newItem: '',
            isComposing: false,
            _elementRef: 'autocomplete'
        }
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-taginput'),
                { [this.computedClass('expandedClass', 'o-taginput--expanded')]: this.expanded }
            ]
        },

        containerClasses() {
            return [
                this.computedClass('containerClass', 'o-taginput__container'),
                { [this.computedClass('sizeClass', 'o-taginput__container--', this.size)]: this.size },
            ]
        },

        itemClasses() {
            return [
                this.computedClass('itemClasses', 'o-taginput__item'),
                { [this.computedClass('variantClass', 'o-taginput__item--', this.variant)]: this.variant }
            ]
        },

        closeClasses() {
            return [
                this.computedClass('closeClass', 'o-taginput__item__close')
            ]
        },

        autocompleteClasses() {
            return [
                this.computedClass('autocompleteClass', 'o-taginput__autocomplete')
            ]
        },

        inputClasses() {
            return {
                'input-class': this.computedClass('inputClass', 'o-taginput__input')
            }
        },

        counterClasses() {
            return [
                this.computedClass('counterClass', 'o-taginput__counter')
            ]
        },

        valueLength() {
            return this.newItem.trim().length
        },

        hasDefaultSlot() {
            return !!this.$scopedSlots.default
        },

        hasEmptySlot() {
            return !!this.$slots.empty
        },

        hasHeaderSlot() {
            return !!this.$slots.header
        },

        hasFooterSlot() {
            return !!this.$slots.footer
        },

        /**
         * Show the input field if a maxitems hasn't been set or reached.
         */
        hasInput() {
            return this.maxitems == null || this.itemsLength < this.maxitems
        },

        itemsLength() {
            return this.items.length
        },

        /**
         * If input has onPasteSeparators prop,
         * returning new RegExp used to split pasted string.
         */
        separatorsAsRegExp() {
            const sep = this.onPasteSeparators

            return sep.length ? new RegExp(sep.map((s) => {
                return s ? s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : null
            }).join('|'), 'g') : null
        }
    },
    watch: {
        /**
         * When v-model is changed set internal value.
         */
        value(value) {
            this.items = Array.isArray(value) ? value.slice(0) : (value || [])
        },

        hasInput() {
            if (!this.hasInput) this.onBlur()
        }
    },
    methods: {
        addItem(item) {
            const itemToAdd = item || this.newItem.trim()

            if (itemToAdd) {
                if (!this.autocomplete) {
                    const reg = this.separatorsAsRegExp
                    if (reg && itemToAdd.match(reg)) {
                        itemToAdd.split(reg)
                            .map((t) => t.trim())
                            .filter((t) => t.length !== 0)
                            .map(this.addItem)
                        return
                    }
                }
                // Add the item input if it is not blank
                // or previously added (if not allowDuplicates).
                const add = !this.allowDuplicates ? this.items.indexOf(itemToAdd) === -1 : true
                if (add && this.beforeAdding(itemToAdd)) {
                    this.items.push(this.createItem(itemToAdd))
                    this.$emit('input', this.items)
                    this.$emit('add', itemToAdd)
                }
            }

            this.newItem = ''
        },

        getNormalizedItemText(item) {
            if (typeof item === 'object') {
                item = getValueByPath(item, this.field)
            }

            return `${item}`
        },

        customOnBlur(event) {
            // Add item on-blur if not select only
            if (!this.autocomplete) this.addItem()

            this.onBlur(event)
        },

        onSelect(option) {
            if (!option) return

            this.addItem(option)
            this.$nextTick(() => {
                this.newItem = ''
            })
        },

        removeItem(index, event) {
            const item = this.items.splice(index, 1)[0]
            this.$emit('input', this.items)
            this.$emit('remove', item)
            if (event) event.stopPropagation()
            if (this.openOnFocus && this.$refs.autocomplete) {
                this.$refs.autocomplete.focus()
            }
            return item
        },

        removeLastItem() {
            if (this.itemsLength > 0) {
                this.removeItem(this.itemsLength - 1)
            }
        },

        keydown(event) {
            const { key } = event // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)
            if (this.removeOnKeys.indexOf(key) !== -1 && !this.newItem.length) {
                this.removeLastItem()
            }
            // Stop if is to accept select only
            if (this.autocomplete && !this.allowNew) return

            if (this.confirmKeys.indexOf(key) >= 0) {
                // Allow Tab to advance to next field regardless
                if (key !== 'Tab') event.preventDefault()
                if (key === 'Enter' && this.isComposing) return
                this.addItem()
            }
        },

        onTyping(event) {
            this.$emit('typing', event.trim())
        },

        emitInfiniteScroll() {
            this.$emit('infinite-scroll')
        }
    }
}
</script>
