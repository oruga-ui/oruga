<template>
    <component
        :is="computedTag"
        v-bind="$attrs"
        :type="computedNativeType"
        :class="rootClasses"
        v-on="$listeners"
    >
        <o-icon
            v-if="iconLeft"
            :pack="iconPack"
            :icon="iconLeft"
            :size="size"
        />
        <span v-if="label">{{ label }}</span>
        <span v-else-if="$slots.default">
            <slot />
        </span>
        <o-icon
            v-if="iconRight"
            :pack="iconPack"
            :icon="iconRight"
            :size="size"
        />
    </component>
</template>

<script>
import Icon from '../icon/Icon'
import config from '../../utils/config'
import { getValueByPath, getCssClass } from '../../utils/helpers'

export default {
    name: 'OButton',
    components: {
        [Icon.name]: Icon
    },
    inheritAttrs: false,
    props: {
        variant: [String, Object],
        size: String,
        label: String,
        iconPack: String,
        iconLeft: String,
        iconRight: String,
        rounded: {
            type: Boolean,
            default: () => {
                return getValueByPath(config, 'button.rounded', false)
            }
        },
        outlined: Boolean,
        expanded: Boolean,
        inverted: Boolean,
        nativeType: {
            type: String,
            default: 'button',
            validator: (value) => {
                return [
                    'button',
                    'submit',
                    'reset'
                ].indexOf(value) >= 0
            }
        },
        tag: {
            type: String,
            default: 'button'
        },
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'button.override', false)
                const clazz = getValueByPath(config, 'button.rootClass', '')
                return getCssClass(clazz, override, 'o-button')
            }
        },
        outlinedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'button.override', false)
                const clazz = getValueByPath(config, 'button.outlinedClass', '')
                return getCssClass(clazz, override, 'o-button-outlined')
            }
        },
        invertedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'button.override', false)
                const clazz = getValueByPath(config, 'button.invertedClass', '')
                return getCssClass(clazz, override, 'o-button-inverted')
            }
        },
        expandedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'button.override', false)
                const clazz = getValueByPath(config, 'button.expandedClass', '')
                return getCssClass(clazz, override, 'o-button-expanded')
            }
        },
        roundedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'button.override', false)
                const clazz = getValueByPath(config, 'button.roundedClass', '')
                return getCssClass(clazz, override, 'o-button-rounded')
            }
        },
    },
    computed: {
        rootClasses() {
            return [
                this.rootClass,
                this.size && ('o-size-' + this.size), 
                this.variant && ('o-color-' + this.variant),
                this.outlined && this.outlinedClass,
                this.inverted && this.invertedClass,
                this.expanded && this.expandedClass, 
                this.rounded && this.roundedClass
            ]
        },
        computedTag() {
            if (this.$attrs.disabled !== undefined && this.$attrs.disabled !== false) {
                return 'button'
            }
            return this.tag
        },
        computedNativeType() {
            if (this.tag === 'a') {
                return
            }
            return this.nativeType
        }
    }
}
</script>

<style lang="scss">
@import "../../scss/variables.scss";

.o-button {
    -moz-appearance: none;
    -webkit-appearance: none;
    display: inline-flex;
    position: relative;
    cursor: pointer;
    text-align: center;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
    vertical-align: top;
    user-select: none;
    text-decoration: none;
    background-color: $button-background-color;
    color: $button-color;
    padding: $button-padding;
    border: $button-border;
    border-radius: $button-border-radius;
    box-shadow: $button-box-shadow;
    font-size: $button-font-size;
    line-height: $button-line-height;
    @each $name, $pair in $colors {
        $color: nth($pair, 1);
        $color-invert: nth($pair, 2);
        &.o-color-#{$name} {
            background-color: $color;
            border-color: transparent;
            color: $color-invert;
            &:hover {
                background-color: darken($color, 2.5%)
            }
            &.o-button-outlined {
                background-color: transparent;
                border-color: $color;
                color: $color;
                &:hover {
                    background-color: $color;
                    border-color: transparent;
                    color: $color-invert;
                }
            }
            &.o-button-inverted {
                background-color: $color-invert;
                border-color: $color-invert;
                color: $color;
                &:hover {
                    background-color: darken($color-invert, 5%)
                }
            }
            &.o-button-inverted {
                background-color: $color-invert;
                border-color: $color-invert;
                color: $color;
                &:hover {
                    background-color: darken($color-invert, 5%)
                }
            }
            &.o-button-inverted.o-button-outlined {
                background-color: transparent;
                border-color: $color-invert;
                color: $color-invert;
                &:hover {
                    background-color: $color-invert;
                    border-color: $color-invert;
                    color: $color;
                }
            }
        }
    }
    @each $name, $value in $sizes {
        &.o-size-#{$name} {
            font-size: $value;
        }
    }
    &.o-button-expanded {
        width: 100%;
    }
    &.o-button-rounded {
        border-radius: 9999px;
    }
    > .o-icon:first-child:not(:last-child) {
        margin-left: $button-margin-border-to-icon;
        margin-right: $button-margin-icon-to-text;
    }
    > .o-icon:last-child:not(:first-child) {
        margin-left: $button-margin-icon-to-text;
        margin-right: $button-margin-border-to-icon;
    }
}
</style>