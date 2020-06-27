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

/**
 * Switch between two opposing states
 * @displayName Switch
 * @style _switch.scss
 */
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
                return getCssClass(clazz, override, 'o-switch-outlined')
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
