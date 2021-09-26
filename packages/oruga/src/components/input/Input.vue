<template>
    <div :class="rootClasses">
        <input
            v-if="type !== 'textarea'"
            ref="input"
            :class="inputClasses"
            :type="newType"
            :autocomplete="newAutocomplete"
            :maxlength="maxlength"
            v-bind="$attrs"
            :value="computedValue"
            @input="computedValue = $event.target.value"
            @blur="onBlur"
            @focus="onFocus">

        <textarea
            v-else
            ref="textarea"
            :class="inputClasses"
            :maxlength="maxlength"
            v-bind="$attrs"
            :value="computedValue"
            @input="computedValue = $event.target.value"
            @blur="onBlur"
            @focus="onFocus"/>

        <o-icon
            v-if="icon"
            :class="iconLeftClasses"
            :clickable="iconClickable"
            :icon="icon"
            :pack="iconPack"
            :size="size"
            @click.native="iconClick('icon-click', $event)"/>

        <o-icon
            v-if="hasIconRight"
            :class="iconRightClasses"
            :clickable="passwordReveal || iconRightClickable"
            :icon="rightIcon"
            :pack="iconPack"
            :size="size"
            :variant="rightIconVariant"
            both
            @click.native="rightIconClick"/>

        <small
            v-if="maxlength && hasCounter && isFocused && type !== 'number'"
            :class="counterClasses">
            {{ valueLength }} / {{ maxlength }}
        </small>
    </div>
</template>

<script>
import Icon from '../icon/Icon'

import { getOptions } from '../../utils/config'
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import FormElementMixin from '../../utils/FormElementMixin'
import { getValueByPath } from '../../utils/helpers'

/**
 * Get user Input. Use with Field to access all functionalities
 * @displayName Input
 * @example ./examples/Input.md
 * @style _input.scss
 */
export default {
    name: 'OInput',
    components: {
        [Icon.name]: Icon
    },
    mixins: [BaseComponentMixin, FormElementMixin],
    configField: 'input',
    inheritAttrs: false,
    provide() {
        return {
            $elementRef: this.type === 'textarea'
                ? 'textarea'
                : 'input'
        }
    },
    props: {
        /** @model */
        value: [Number, String],
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
            newValue: this.value,
            newType: this.type,
            newAutocomplete: this.autocomplete || getValueByPath(getOptions(), 'input.autocompletete', 'off'),
            isPasswordVisible: false
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
                { [this.computedClass('variantClass', 'o-input--', this.statusVariant)]: this.statusVariant },
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
                this.$emit('input', this.newValue)
                this.syncFilled(this.newValue)
                !this.isValid && this.checkHtml5Validity()
            }
        },
        hasIconRight() {
            return this.passwordReveal
                || (this.statusIcon && this.statusVariantIcon)
                || this.clearable
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
                return this.iconRightVariant || null
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
        }
    },
    watch: {
        /**
        * When v-model is changed:
        *   1. Set internal value.
        */
        value: {
            immediate: true,
            handler(value) {
                this.newValue = value
                this.syncFilled(this.newValue)
            }
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
        }
    }
}
</script>
