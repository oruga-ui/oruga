<template>
    <label
        :class="rootClasses"
        ref="label"
        :disabled="disabled"
        @click="focus"
        @keydown.prevent.enter="$refs.label.click()">
        <input
            v-model="computedValue"
            type="radio"
            ref="input"
            @click.stop
            :disabled="disabled"
            :required="required"
            :name="name"
            :value="nativeValue">
        <span :class="checkClasses" />
        <span :class="labelClass"><slot/></span>
    </label>
</template>

<script>
import CheckRadioMixin from '../../utils/CheckRadioMixin.js'
import config from '../../utils/config'
import { getValueByPath, getCssClass } from '../../utils/helpers'

export default {
    name: 'ORadio',
    mixins: [CheckRadioMixin],
    props: {
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'radio.override', false)
                const clazz = getValueByPath(config, 'radio.rootClass', '')
                return getCssClass(clazz, override, 'o-radio')
            }
        },
        disabledClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'radio.override', false)
                const clazz = getValueByPath(config, 'radio.disabledClass', '')
                return getCssClass(clazz, override, 'o-radio-disabled')
            }
        },
        checkClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'radio.override', false)
                const clazz = getValueByPath(config, 'radio.o-radio-checkClass', '')
                return getCssClass(clazz, override, 'o-radio-check')
            }
        },
        labelClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'radio.override', false)
                const clazz = getValueByPath(config, 'radio.labelClass', '')
                return getCssClass(clazz, override, 'o-radio-label')
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
                this.variant && ('o-variant-' + this.variant)
            ]
        }
    }
}
</script>

<style lang="scss">
@import "../../scss/variables.scss";

.o-radio {
    outline: none;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    &:not(.radio-button) {
        margin-right: $radio-margin-right;
        & + .o-radio:last-child {
            margin-right: 0;
        }
    }
    input[type=radio] {
        position: absolute;
        left: 0;
        opacity: 0;
        outline: none;
        z-index: -1;
        + .o-radio-check {
            display: flex;
            flex-shrink: 0;
            position: relative;
            cursor: pointer;
            width: $radio-size;
            height: $radio-size;
            transition: background $speed-slow $easing;
            border-radius: 50%;
            border: 2px solid $grey;
            &:before {
                content: "";
                display: flex;
                position: absolute;
                left: 50%;
                margin-left: calc(-#{$radio-size}/2);
                bottom: 50%;
                margin-bottom: calc(-#{$radio-size}/2);
                width: $radio-size;
                height: $radio-size;
                transition: transform $speed-slow $easing;
                border-radius: 50%;
                transform: scale(0);
                background-color: $radio-active-background-color;
            }
            @each $name, $pair in $colors {
                $color: nth($pair, 1);
                &.o-color#{$name}:before {
                    background: $color;
                }
            }
        }
        &:checked + .o-radio-check {
            border-color: $radio-active-background-color;
            @each $name, $pair in $colors {
                $color: nth($pair, 1);
                &.o-color#{$name} {
                    border-color: $color;
                }
            }
            &:before {
                transform: scale(.5);
            }
        }
        &:focus {
            + .o-radio-check {
                box-shadow: $radio-focus-box-shadow;
            }
            &:checked + .o-radio-check {
                box-shadow: 0 0 0.5em rgba($radio-active-background-color, 0.8);
                @each $name, $pair in $colors {
                    $color: nth($pair, 1);
                    &.o-color#{$name} {
                        box-shadow: 0 0 0.5em rgba($color, 0.8);
                    }
                }
            }
        }
    }
    .o-radio-label {
        padding-left: $control-padding-horizontal;
    }
    &.o-radio-button {
        display: flex;
    }
    &[disabled] {
        opacity: 0.5;
    }
    &:hover {
        input[type=radio]:not(:disabled) + .o-radio-check {
            border-color: $radio-active-background-color;
            @each $name, $pair in $colors {
                $color: nth($pair, 1);
                &.o-color#{$name} {
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