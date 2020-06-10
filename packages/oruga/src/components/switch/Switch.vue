<template>
    <label
        :class="rootClasses"
        ref="label"
        :disabled="disabled"
        @click="focus"
        @keydown.prevent.enter="$refs.label.click()"
        @mousedown="isMouseDown = true"
        @mouseup="isMouseDown = false"
        @mouseout="isMouseDown = false"
        @blur="isMouseDown = false">
        <input
            v-model="computedValue"
            type="checkbox"
            ref="input"
            @click.stop
            :disabled="disabled"
            :name="name"
            :required="required"
            :value="nativeValue"
            :true-value="trueValue"
            :false-value="falseValue">
        <span :class="checkClasses"/>
        <span class="o-switch-label"><slot/></span>
    </label>
</template>

<script>
import { getValueByPath, getCssClass } from '../../utils/helpers'
import config from '../../utils/config'

export default {
    name: 'OSwitch',
    props: {
        value: [String, Number, Boolean],
        nativeValue: [String, Number, Boolean],
        disabled: Boolean,
        variant: String,
        passiveVariant: String,
        name: String,
        required: Boolean,
        size: String,
        trueValue: {
            type: [String, Number, Boolean],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean],
            default: false
        },
        rounded: {
            type: Boolean,
            default: true
        },
        outlined: {
            type: Boolean,
            default: false
        },
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'switch.override', false)
                const clazz = getValueByPath(config, 'switch.rootClass', '')
                return getCssClass(clazz, override, 'o-switch')
            }
        },
        disabledClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'switch.override', false)
                const clazz = getValueByPath(config, 'switch.disabledClass', '')
                return getCssClass(clazz, override, 'o-switch-disabled')
            }
        },
        checkClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'switch.override', false)
                const clazz = getValueByPath(config, 'switch.checkClass', '')
                return getCssClass(clazz, override, 'o-switch-check')
            }
        },
        roundedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'switch.override', false)
                const clazz = getValueByPath(config, 'switch.roundedClass', '')
                return getCssClass(clazz, override, 'o-switch-rounded')
            }
        },
        outlinedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'switch.override', false)
                const clazz = getValueByPath(config, 'switch.outlinedClass', '')
                return getCssClass(clazz, override, 'o-switch-label')
            }
        },
        labelClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'switch.override', false)
                const clazz = getValueByPath(config, 'switch.labelClass', '')
                return getCssClass(clazz, override, 'o-switch-label')
            }
        }
    },
    data() {
        return {
            newValue: this.value,
            isMouseDown: false
        }
    },
    computed: {
        rootClasses() {
            return [
                this.rootClass,
                this.size && 'o-size-' + this.size,
                this.disabled && this.disabledClass,
                this.rounded && this.roundedClass,
                this.outlined && this.outlinedClass
            ]
        },
        checkClasses() {
            return [
                this.checkClass,
                this.variant && ('o-color-' + this.variant),
                (this.isMouseDown && !this.disabled) && 'o-switch-elastic',
                (this.passiveVariant && 'o-color-' + this.passiveVariant + '-passive'),
            ]
        },
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                this.newValue = value
                this.$emit('input', value)
            }
        }
    },
    watch: {
        /**
        * When v-model change, set internal value.
        */
        value(value) {
            this.newValue = value
        }
    },
    methods: {
        focus() {
            // MacOS FireFox and Safari do not focus when clicked
            this.$refs.input.focus()
        }
    }
}
</script>

<style lang="scss">
@import "../../scss/variables.scss";

$switch-width-number: 2.75 !default;
$switch-width: $switch-width-number * 1em !default;
$switch-padding: 0.2em !default;
$switch-active-background-color: $primary !default;
$switch-background: grey !default;

.o-switch {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    position: relative;
    input[type=checkbox] {
        position: absolute;
        left: 0;
        opacity: 0;
        outline: none;
        z-index: -1;
        + .o-switch-check {
            display: flex;
            align-items: center;
            flex-shrink: 0;
            width: $switch-width;
            height: #{$switch-width / 2 + $switch-padding};
            padding: $switch-padding;
            background: $grey-light;
            border-radius: 9999px;
            transition: background $speed-slow $easing, box-shadow $speed-slow $easing;
            @each $name, $pair in $colors {
                $color: nth($pair, 1);
                &.color-#{$name}-passive, &:hover {
                    background: $color;
                }
                &.input[type=checkbox] + &.check {
                    background: 'pink';
                }
            }    
            &:before {
                content: "";
                display: block;
                border-radius: 9999px;
                width: #{($switch-width - $switch-padding * 2) / 2};
                height: #{($switch-width - $switch-padding * 2) / 2};
                background: $switch-background;
                box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);
                transition: transform $speed-slow $easing;
                will-change: transform;
                transform-origin: left;
            }
            &.o-switch-elastic:before {
                transform: scaleX(1.5);
                border-radius: 9999px;
            }
        }
        &:checked + .o-switch-check {
            background: $switch-active-background-color;
            @each $name, $pair in $colors {
                $color: nth($pair, 1);
                &.o-color-#{$name} {
                    background: $color;
                }
            }
            &:before {
                transform: translate3d(100%, 0, 0);
            }
            &.o-switch-elastic:before {
                // Might be a little offset if base font is not 16px
                transform: translate3d(50%, 0, 0) scaleX(1.5);
            }
        }
        &:focus, &:active {
            outline: none;
            + .o-switch-check {
                box-shadow: 0 0 0.5em rgba($grey, 0.6);
                @each $name, $pair in $colors {
                    $color: nth($pair, 1);
                    &.o-color-#{$name}o- {
                        box-shadow: 0 0 0.5em rgba($color, 0.8);
                    }
                }
            }
            &:checked + .o-switch-check {
                box-shadow: 0 0 0.5em rgba($switch-active-background-color, 0.8);
                @each $name, $pair in $colors {
                    $color: nth($pair, 1);
                    &.o-color-#{$name} {
                        box-shadow: 0 0 0.5em rgba($color, 0.8);
                    }
                }
            }
        }
    }
    .o-switch-label {
        padding-left: $control-padding-horizontal;
    }
    &:hover {
        input[type=checkbox] + .o-switch-check {
            background: rgba($grey-light, 0.9);
            @each $name, $pair in $colors {
                $color: nth($pair, 1);
                &.o-color-#{$name}o- {
                    background: rgba($color, 0.9);
                }
            }
        }
        input[type=checkbox]:checked + .o-switch-check {
            background: rgba($switch-active-background-color, 0.9);
            @each $name, $pair in $colors {
                $color: nth($pair, 1);
                &.color-#{$name} {
                    background: rgba($color, 0.9);
                }
            }
        }
    }
    &.o-switch-rounded {
        input[type=checkbox] {
            + .o-switch-check {
                border-radius: 9999px;
                &:before {
                    border-radius: 9999px;
                }
            }
            &.o-switch-elastic:before {
                transform: scaleX(1.5);
                border-radius: 9999px;
            }
        }
    }
    &.o-switch-outlined {
        input[type=checkbox] {
            + .o-switch-check {
                background: transparent;
                border: .1rem solid $grey-light;
                @each $name, $pair in $colors {
                    $color: nth($pair, 1);
                    &.o-color-#{$name}o- {
                        border: .1rem solid rgba($color, 0.9);
                        &:before {
                            background: $color
                        }
                        &:hover {
                            border-color: rgba($color, 0.9);
                        }
                    }
                }
                &:before {
                    background: $grey-light;
                }
            }
            &:checked + .o-switch-check {
                border-color: $switch-active-background-color;
                @each $name, $pair in $colors {
                    $color: nth($pair, 1);
                    &.o-color-#{$name} {
                        background: transparent;
                        border-color: $color;
                        &:before {
                            background: $color;
                        }
                    }
                }
                &:before {
                    background: $switch-active-background-color;
                }
            }
        }
        &:hover {
            input[type=checkbox] + .o-switch-check {
                background: transparent;
                border-color: rgba($grey-light, 0.9);
            }
            input[type=checkbox]:checked + .o-switch-check {
                background: transparent;
                border-color: rgba($switch-active-background-color, 0.9);
                @each $name, $pair in $colors {
                    $color: nth($pair, 1);
                    &.is-#{$name} {
                        border-color: rgba($color, 0.9);
                    }
                }
            }
        }
    }
    @each $name, $value in $sizes {
        &.o-size-#{$name} {
            font-size: $value;
        }
    }
    &[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
        color: $grey;
    }
}

</style>