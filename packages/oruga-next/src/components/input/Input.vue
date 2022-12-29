<template>
    <div :class="rootClasses">
        <input
            v-if="type !== 'textarea'"
            v-bind="$attrs"
            ref="input"
            :class="inputClasses"
            :type="newType"
            :autocomplete="newAutocomplete"
            :maxlength="maxlength"
            :value="computedValue"
            @input="onInput"
            @blur="onBlur"
            @focus="onFocus">

        <textarea
            v-else
            v-bind="$attrs"
            ref="textarea"
            :class="inputClasses"
            :maxlength="maxlength"
            :value="computedValue"
            @input="onInput"
            @blur="onBlur"
            @focus="onFocus"
            :style="computedStyles"
            />

        <o-icon
            v-if="icon"
            :class="iconLeftClasses"
            :clickable="iconClickable"
            :icon="icon"
            :pack="iconPack"
            :size="size"
            @click="iconClick('icon-click', $event)"/>

        <o-icon
            v-if="hasIconRight"
            :class="iconRightClasses"
            :clickable="passwordReveal || clearable || iconRightClickable"
            :icon="rightIcon"
            :pack="iconPack"
            :size="size"
            :variant="rightIconVariant"
            both
            @click="rightIconClick"/>

        <small
            v-if="maxlength && hasCounter && isFocused && type !== 'number'"
            :class="counterClasses">
            {{ valueLength }} / {{ maxlength }}
        </small>
    </div>
</template>

<script lang="ts">
import { defineComponent, StyleValue } from 'vue'

import Icon from '../icon/Icon.vue'

import BaseComponentMixin from '../../utils/BaseComponentMixin'
import FormElementMixin from '../../utils/FormElementMixin'

import { getOptions } from '../../utils/config'
import { getValueByPath } from '../../utils/helpers'

/**
 * Get user Input. Use with Field to access all functionalities
 * @displayName Input
 * @style _input.scss
 */
export default defineComponent({
    name: 'OInput',
    components: {
        [Icon.name]: Icon
    },
    mixins: [BaseComponentMixin, FormElementMixin],
    configField: 'input',
    inheritAttrs: false,
    emits: ['update:modelValue', 'icon-click', 'icon-right-click'],
    props: {
        /** @model */
        modelValue: [Number, String],
        /** Native options to use in HTML5 validation */
		autocomplete: String,
        /**
         * Input type, like native
         * @values Any native input type, and textarea
         */
        type: {
            type: String,
            default: 'text'
        },
        /**
         * Vertical size of input, optional
         * @values small, medium, large
         */
        size: String,
        /**
        * Color of the control, optional
        * @values primary, info, success, warning, danger, and any other custom color
        */
        variant: String,
        /**
         * 	Adds the reveal password functionality
         */
        passwordReveal: Boolean,
        /**
         * Makes the icon clickable
         */
        iconClickable: Boolean,
        /**
         * Show character counter when maxlength prop is passed
         */
        hasCounter: {
            type: Boolean,
            default: () => { return getValueByPath(getOptions(), 'input.counter', false) }
        },
        /**
         * Automatically adjust height in textarea
         */
        autosize: {
            type: Boolean,
            default: false
        },
        /**
         * 	Icon name to be added on the right side
         */
        iconRight: String,
        /**
         * Make the icon right clickable
         */
        iconRightClickable: Boolean,
        /** Variant of right icon */
        iconRightVariant: String,
        /** Add a button/icon to clear the inputed text */
        clearable: {
            type: Boolean,
            default: () => { return getValueByPath(getOptions(), 'input.clearable', false) }
        },
        rootClass: [String, Function, Array],
        expandedClass: [String, Function, Array],
        iconLeftSpaceClass: [String, Function, Array],
        iconRightSpaceClass: [String, Function, Array],
        inputClass: [String, Function, Array],
        roundedClass: [String, Function, Array],
        iconLeftClass: [String, Function, Array],
        iconRightClass: [String, Function, Array],
        counterClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        variantClass: [String, Function, Array]
    },
    data() {
        return {
            newValue: this.modelValue,
            newType: this.type,
            // from mixin (ts workaround)
            newAutocomplete: this.autocomplete || getValueByPath(getOptions(), 'input.autocompletete', 'off'),
            isPasswordVisible: false,
            height: 'auto'
        }
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-ctrl-input'),
                { [this.computedClass('expandedClass', 'o-ctrl-input--expanded')]: this.expanded }
            ]
        },
        inputClasses() {
            return [
                this.computedClass('inputClass', 'o-input'),
                { [this.computedClass('roundedClass', 'o-input--rounded')]: this.rounded },
                { [this.computedClass('sizeClass', 'o-input--', this.size)]: this.size },
                { [this.computedClass('variantClass', 'o-input--', (this.statusVariant || this.variant))]: (this.statusVariant || this.variant) },
                { [this.computedClass('textareaClass', 'o-input__textarea')]: this.type === 'textarea' },
                { [this.computedClass('iconLeftSpaceClass', 'o-input-iconspace-left')]: this.icon },
                { [this.computedClass('iconRightSpaceClass', 'o-input-iconspace-right')]: this.hasIconRight }
            ]
        },
        iconLeftClasses() {
            return [
                this.computedClass('iconLeftClass', 'o-input__icon-left')
            ]
        },
        iconRightClasses() {
            return [
                this.computedClass('iconRightClass', 'o-input__icon-right')
            ]
        },
        counterClasses() {
            return [
                this.computedClass('counterClass', 'o-input__counter')
            ]
        },
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                this.newValue = value
                this.$emit('update:modelValue', this.newValue)
                this.syncFilled(this.newValue)
                !this.isValid && this.checkHtml5Validity()
            }
        },
        hasIconRight() {
            return this.passwordReveal
                || (this.statusIcon && this.statusVariantIcon)
                || (this.clearable && this.newValue)
                || this.iconRight
        },
        rightIcon() {
            if (this.passwordReveal) {
                return this.passwordVisibleIcon
            } else if (this.clearable && this.newValue) {
                return 'close-circle'
            } else if (this.iconRight) {
                return this.iconRight
            }
            return this.statusVariantIcon
        },
        rightIconVariant() {
            if (this.passwordReveal || this.iconRight) {
                return this.iconRightVariant || this.variant || null
            }
            return this.statusVariant
        },

        /**
        * Check if have any message prop from parent if it's a Field.
        */
        hasMessage() {
            return !!this.statusMessage
        },

        /**
        * Current password-reveal icon name.
        */
        passwordVisibleIcon() {
            return !this.isPasswordVisible ? 'eye' : 'eye-off'
        },
        /**
        * Get value length
        */
        valueLength() {
            if (typeof this.computedValue === 'string') {
                return this.computedValue.length
            } else if (typeof this.computedValue === 'number') {
                return this.computedValue.toString().length
            }
            return 0
        },
        /**
        * Computed inline styles for autoresize
        */
        computedStyles () : StyleValue {
            if (!this.autosize) return {}
            return {
                resize: 'none',
                height: this.height,
                overflow: 'hidden'
            }
        },

        $elementRef() {
            return this.type === 'textarea'
                ? 'textarea'
                : 'input'
        }
    },
    watch: {
        /**
        * When v-model is changed:
        *   1. Set internal value.
        */
        modelValue: {
            immediate: true,
            handler(value) {
                this.newValue = value
                this.syncFilled(this.newValue)
                if(this.autosize) {
                    this.resize()
                }
            }
        },
        type(type) {
            this.newType = type
        }
    },
    methods: {
        /**
        * Toggle the visibility of a password-reveal input
        * by changing the type and focus the input right away.
        */
        togglePasswordVisibility() {
            this.isPasswordVisible = !this.isPasswordVisible
            this.newType = this.isPasswordVisible ? 'text' : 'password'

            this.$nextTick(() => {
                this.focus()
            })
        },

        onInput(event) {
            this.computedValue = event.target.value
        },

        iconClick(emit, event) {
            this.$emit(emit, event)
            this.$nextTick(() => {
                this.focus()
            })
        },

        rightIconClick(event) {
            if (this.passwordReveal) {
                this.togglePasswordVisibility()
            } else if (this.clearable) {
                this.computedValue = ''
            } else if (this.iconRightClickable) {
                this.iconClick('icon-right-click', event)
            }
        },

        resize() {
            this.height = 'auto'
            this.$nextTick(() => {
                const scrollHeight = this.$refs.textarea.scrollHeight
                this.height = scrollHeight + 'px'
            })
        }
    }
})
</script>
