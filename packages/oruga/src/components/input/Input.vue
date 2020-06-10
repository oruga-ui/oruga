<template>
    <div :class="rootClasses">
        <input
            v-if="type !== 'textarea'"
            ref="input"
            :class="inputClasses"
            :type="newType"
            :autocomplete="newAutocomplete"
            :maxlength="maxlength"
            :value="computedValue"
            v-bind="$attrs"
            @input="onInput"
            @blur="onBlur"
            @focus="onFocus">

        <textarea
            v-else
            ref="textarea"
            :class="inputClasses"
            :maxlength="maxlength"
            :value="computedValue"
            v-bind="$attrs"
            @input="onInput"
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

        /**
        * Input's 'input' event listener, 'nextTick' is used to prevent event firing
        * before ui update, helps when using masks (Cleavejs and potentially others).
        */
        onInput(event) {
            this.$nextTick(() => {
                if (event.target) {
                    this.computedValue = event.target.value
                }
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

<style lang="scss">
@import "../../scss/variables.scss";

.o-control-input {
    position: relative;
    box-sizing: border-box;
    font-size: $base-font-size;
    &.o-control-input-icons-right .o-icon.o-icon-right {
        right: 0;
        height: $input-height;
        position: absolute;
        top: 0;
        width: $input-height;
        z-index: $input-control-icon-zindex;
        &:not(.o-icon-clickable) {
            pointer-events: none;
        }
    }
    &.o-control-input-icons-left .o-icon.o-icon-left {
        left: 0;
        height: $input-height;
        pointer-events: none;
        position: absolute;
        top: 0;
        width: $input-height;
        z-index: $input-control-icon-zindex;
        &:not(.o-icon-clickable) {
            pointer-events: none;
        }
    }
    &.o-control-input-icons-left .o-input {
        padding-left: $input-height;
    }
    &.o-control-input-icons-right .o-input {
        padding-right: $input-height;
    }
    &.o-control-input-expanded {
        flex-grow: 1;
        flex-shrink: 1;
    }
}

.o-input {
    -moz-appearance: none;
    -webkit-appearance: none;
    display: inline-flex;
    position: relative;
    vertical-align: top;
    box-shadow: $input-box-shadow;
    max-width: $input-max-width;
    width: $input-width;
    background-color: $input-background-color;
    border-color: $input-border-color;
    border-radius:$input-border-radius;
    color: $input-color;
    border: $input-border;
    font-size: $base-font-size;
    height: $input-height;
    line-height: $input-line-height;
    padding: $input-padding;
    margin: $input-margin;
    &.o-input-rounded {
        border-radius: 9999px;
    }
    @each $name, $value in $sizes {
        &.o-size-#{$name} {
            font-size: $value;
        }
    }
    @each $name, $pair in $colors {
        $color: nth($pair, 1);
        &.o-color-#{$name} {
            border-color: $color;
        }
    }
    @at-root {
        textarea#{&} {
            display: block;
            max-width: 100%;
            min-width: 100%;
            padding: $input-textarea-padding;
            resize: vertical;
            &:not([rows]) {
                max-height: $input-textarea-max-height;
                min-height: $input-textarea-min-height;
            }
        }
    }
    .o-input-counter {
        display: block;
        float: right;
        font-size: $input-counter-font-size;
        margin: $input-counter-margin;
        &.o-input-counter-invisible {
            visibility: hidden;
        }
    }
}
</style>
