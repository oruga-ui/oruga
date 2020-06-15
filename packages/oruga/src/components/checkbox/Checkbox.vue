<template>
    <label
        :class="rootClasses"
        ref="label"
        :disabled="disabled"
        @click="focus"
        @keydown.prevent.enter="$refs.label.click()">
        <input
            v-model="computedValue"
            :indeterminate.prop="indeterminate"
            type="checkbox"
            ref="input"
            @click.stop
            :disabled="disabled"
            :required="required"
            :name="name"
            :value="nativeValue"
            :true-value="trueValue"
            :false-value="falseValue">
        <span :class="checkClass" />
        <span :class="labelClass"><slot/></span>
    </label>
</template>

<script>
import CheckRadioMixin from '../../utils/CheckRadioMixin.js'
import config from '../../utils/config'
import { getValueByPath, getCssClass } from '../../utils/helpers'

export default {
    name: 'OCheckbox',
    mixins: [CheckRadioMixin],
    props: {
        indeterminate: Boolean,
        trueValue: {
            type: [String, Number, Boolean],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean],
            default: false
        },
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'checkbox.override', false)
                const clazz = getValueByPath(config, 'checkbox.rootClass', '')
                return getCssClass(clazz, override, 'o-checkbox')
            }
        },
        disabledClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'checkbox.override', false)
                const clazz = getValueByPath(config, 'checkbox.disabledClass', '')
                return getCssClass(clazz, override, 'o-checkbox-disabled')
            }
        },
        checkClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'checkbox.override', false)
                const clazz = getValueByPath(config, 'checkbox.checkClass', '')
                return getCssClass(clazz, override, 'o-checkbox-check')
            }
        },
        labelClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'checkbox.override', false)
                const clazz = getValueByPath(config, 'checkbox.labelClass', '')
                return getCssClass(clazz, override, 'o-checkbox-label')
            }
        }
    },
    computed: {
        rootClasses() {
            return [
                this.rootClass,
                this.size && ('o-size-' + this.size),
                this.disabled && this.disabledClass
            ]
        },
        checkClasses() {
            return [
                this.checkClass,
                this.variant && ('o-color-' + this.variant)
            ]
        }
    }
}
</script>

<style lang="scss">
@import "../../scss/oruga.scss";

.o-checkbox {
    outline: none;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    @include unselectable;
    margin-right: $checkbox-margin-sibiling;
    & + .o-checkbox:last-child {
        margin-right: 0;
    }
    input[type=checkbox] {
        position: absolute;
        left: 0;
        opacity: 0;
        outline: none;
        z-index: -1;
        + .o-checkbox-check {
            width: $checkbox-size;
            height: $checkbox-size;
            flex-shrink: 0;
            border-radius: $checkbox-border-radius;
            border: $checkbox-border-width solid $checkbox-border-color;
            transition: background $speed-slow $easing;
            background: $checkbox-background-color
        }
        &:checked + .o-checkbox-check {
            background: $checkbox-active-background-color url(checkmark($checkbox-checkmark-color)) no-repeat center center;
            border-color: $checkbox-active-background-color;
            @each $name, $pair in $colors {
                $color: nth($pair, 1);
                $color-invert: nth($pair, 2);
                &.o-color-#{$name} {
                    background: $color url(checkmark($color-invert)) no-repeat center center;
                    border-color: $color;
                }
            }
        }
        &:indeterminate + .o-checkbox-check {
            background: $checkbox-active-background-color url(indeterminate($checkbox-checkmark-color)) no-repeat center center;
            border-color: $checkbox-active-background-color;
            @each $name, $pair in $colors {
                $color: nth($pair, 1);
                $color-invert: nth($pair, 2);
                &.o-color-#{$name} {
                    background: $color url(indeterminate($color-invert)) no-repeat center center;
                    border-color: $color;
                }
            }
        }
        &:focus {
            + .o-checkbox-check {
                box-shadow: $checkbox-focus-sibiling-box-shadow;
            }
            &:checked + .o-checkbox-check {
                box-shadow: $checkbox-checked-box-shadow-length rgba($checkbox-active-background-color, $checkbox-checked-box-shadow-opacity);
                @each $name, $pair in $colors {
                    $color: nth($pair, 1);
                    &.o-color#{$name} {
                        box-shadow: $checkbox-checked-box-shadow-length rgba($color, $checkbox-checked-box-shadow-opacity);
                    }
                }
            }
        }
    }
    .o-checkbox-label {
        padding: $checkbox-label-padding;
    }
    &.o-checkbox-button {
        display: flex;
    }
    &[disabled] {
        opacity: $checkbox-disabled-opacity;
    }
    &:hover {
        input[type=checkbox]:not(:disabled) + .o-checkbox-check {
            border-color: $checkbox-active-background-color;
            @each $name, $pair in $colors {
                $color: nth($pair, 1);
                &.o-color-#{$name} {
                    border-color: $color;
                }
            }
        }
    }
    @each $name, $value in $sizes {
        &.o-size-#{$name} {
            font-size: $value;
        }
    }
}
</style>
