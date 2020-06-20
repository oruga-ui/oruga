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
            class="o-icon-left"
            :clickable="iconClickable"
            :icon="icon"
            :pack="iconPack"
            :size="size"
            @click.native="iconClick('icon-click', $event)"/>

        <o-icon
            v-if="!loading && hasIconRight"
            class="o-icon-right"
            :clickable="passwordReveal || iconRightClickable"
            :icon="rightIcon"
            :pack="iconPack"
            :size="size"
            :variant="rightIconType"
            both
            @click.native="rightIconClick"/>

        <small
            v-if="maxlength && hasCounter && type !== 'number'"
            class="o-input-counter"
            :class="{ 'o-input-counter-invisible': !isFocused }">
            {{ valueLength }} / {{ maxlength }}
        </small>
    </div>
</template>

<script>
import Icon from '../icon/Icon'
import config from '../../utils/config'
import FormElementMixin from '../../utils/FormElementMixin'
import { getValueByPath, getCssClass } from '../../utils/helpers'

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
        inputClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'input.override', false)
                const clazz = getValueByPath(config, 'input.inputClass', '')
                return getCssClass(clazz, override, 'o-input')
            }
        }
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
            let iconPosition = ''
            if (this.icon && this.hasIconRight) {
                iconPosition = 'o-control-input-icons-left o-control-input-icons-right'
            } else if (!this.icon && this.hasIconRight) {
                iconPosition = 'o-control-input-icons-right'
            } else if (this.icon) {
                iconPosition = 'o-control-input-icons-left'
            }
            return [
                this.rootClass,
                iconPosition,
                this.expanded && 'o-control-input-expanded'
            ]
        },
        inputClasses() {
            return [
                this.inputClass,
                this.statusVariant && ('o-color-' + this.statusVariant),
                this.size && ('o-size-' + this.size),
                this.rounded && 'o-input-rounded'
            ]
        },
        hasIconRight() {
            return this.passwordReveal || this.statusVariantIcon || this.iconRight
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
