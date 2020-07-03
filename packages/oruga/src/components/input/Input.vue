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
            v-model="computedValue"
            @blur="onBlur"
            @focus="onFocus">

        <textarea
            v-else
            ref="textarea"
            :class="inputClasses"
            :maxlength="maxlength"
            v-bind="$attrs"
            v-model="computedValue"
            @blur="onBlur"
            @focus="onFocus"/>

        <o-icon
            v-if="icon"
            :class="iconLeftClass"
            :clickable="iconClickable"
            :icon="icon"
            :pack="iconPack"
            :size="size"
            @click.native="iconClick('icon-click', $event)"/>

        <o-icon
            v-if="hasIconRight"
            :class="iconRightClass"
            :clickable="passwordReveal || iconRightClickable"
            :icon="rightIcon"
            :pack="iconPack"
            :size="size"
            :variant="rightIconType"
            both
            @click.native="rightIconClick"/>

        <small
            v-if="maxlength && hasCounter && type !== 'number'"
            :class="[ counterClass, !isFocused && counterInvisibleClass ]">
            {{ valueLength }} / {{ maxlength }}
        </small>
    </div>
</template>

<script>
import Icon from '../icon/Icon'

import config from '../../utils/config'
import FormElementMixin from '../../utils/FormElementMixin'
import { getValueByPath, getCssClass } from '../../utils/helpers'

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
    mixins: [FormElementMixin],
    inheritAttrs: false,
    provide() {
        return {
            $elementRef: this.type === 'textarea'
                ? 'textarea'
                : 'input'
        }
    },
    props: {
        value: [Number, String],
        type: {
            type: String,
            default: 'text'
        },
        passwordReveal: Boolean,
        iconClickable: Boolean,
        hasCounter: {
            type: Boolean,
            default: () => getValueByPath(config, 'input.counter', false)
        },
        iconRight: String,
        iconRightClickable: Boolean,
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'input.override', false)
                const clazz = getValueByPath(config, 'input.rootClass', '')
                return getCssClass(clazz, override, 'o-control-input')
            }
        },
        controlExpandedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'input.override', false)
                const clazz = getValueByPath(config, 'input.controlExpandedClass', '')
                return getCssClass(clazz, override, 'o-control-input-expanded')
            }
        },
        controlIconLeftClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'input.override', false)
                const clazz = getValueByPath(config, 'input.controlIconLeftClass', '')
                return getCssClass(clazz, override, 'o-control-input-icons-left')
            }
        },
        controlIconRightClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'input.override', false)
                const clazz = getValueByPath(config, 'input.controlIconRightClass', '')
                return getCssClass(clazz, override, 'o-control-input-icons-right')
            }
        },
        inputClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'input.override', false)
                const clazz = getValueByPath(config, 'input.inputClass', '')
                return getCssClass(clazz, override, 'o-input')
            }
        },
        roundedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'input.override', false)
                const clazz = getValueByPath(config, 'input.roundedClass', '')
                return getCssClass(clazz, override, 'o-input-rounded')
            }
        },
        iconLeftClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'input.override', false)
                const clazz = getValueByPath(config, 'input.iconLeftClass', '')
                return getCssClass(clazz, override, 'o-icon-left')
            }
        },
        iconRightClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'input.override', false)
                const clazz = getValueByPath(config, 'input.iconRightClass', '')
                return getCssClass(clazz, override, 'o-icon-right')
            }
        },
        counterClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'input.override', false)
                const clazz = getValueByPath(config, 'input.counterClass', '')
                return getCssClass(clazz, override, 'o-input-counter')
            }
        },
        counterInvisibleClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'input.override', false)
                const clazz = getValueByPath(config, 'input.counterInvisibleClass', '')
                return getCssClass(clazz, override, 'o-input-counter-invisible')
            }
        },
    },
    data() {
        return {
            newValue: this.value,
            newType: this.type,
            newAutocomplete: this.autocomplete || getValueByPath(config, 'autocompletete', 'off'),
            isPasswordVisible: false
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                this.newValue = value
                this.$emit('input', value)
                !this.isValid && this.checkHtml5Validity()
            }
        },
        rootClasses() {
            return [
                this.rootClass,
                this.expanded && this.controlExpandedClass,
                (this.icon && this.hasIconRight) && `${this.controlIconLeftClass} ${this.controlIconRightClass}`,
                (!this.icon && this.hasIconRight) && this.controlIconRightClass,
                this.icon && this.controlIconLeftClass
            ]
        },
        inputClasses() {
            return [
                this.inputClass,
                this.statusVariant && ('o-color-' + this.statusVariant),
                this.size && ('o-size-' + this.size),
                this.rounded && this.roundedClass
            ]
        },
        hasIconRight() {
            return this.passwordReveal || (this.statusIcon && this.statusVariantIcon) || this.iconRight
        },
        rightIcon() {
            if (this.passwordReveal) {
                return this.passwordVisibleIcon
            } else if (this.iconRight) {
                return this.iconRight
            }
            return this.statusVariantIcon
        },
        rightIconType() {
            if (this.passwordReveal || this.iconRight) {
                return
            }
            return this.statusVariant
        },

        /**
        * Icon name (MDI) based on the type.
        */
        statusVariantIcon() {
            switch (this.statusVariant) {
                case 'success': return 'check'
                case 'danger': return 'alert-circle'
                case 'info': return 'information'
                case 'warning': return 'alert'
                default: return ''
            }
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
        value(value) {
            this.newValue = value
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
            } else if (this.iconRightClickable) {
                this.iconClick('icon-right-click', event)
            }
        }
    }
}
</script>
