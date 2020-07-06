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
        <span :class="labelClasses"><slot/></span>
    </label>
</template>

<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin'

/**
 * Switch between two opposing states
 * @displayName Switch
 * @example ./examples/Switch.md
 * @style _switch.scss
 */
export default {
    name: 'OSwitch',
    mixins: [BaseComponentMixin],
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
        rootClass: String,
        disabledClass: String,
        checkClass: String,
        roundedClass: String,
        outlinedClass: String,
        labelClass: String,
        sizeClass: String,
        variantClass: String,
        passiveVariantClass: String,
        animationClass: String
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
                this.computedClass('switch', 'rootClass', 'o-switch'),
                { [`${this.computedClass('switch', 'sizeClass', 'o-size-')}${this.size}`]: this.size },
                { [this.computedClass('switch', 'disabledClass', 'o-switch-disabled')]: this.disabled },
                { [this.computedClass('switch', 'roundedClass', 'o-switch-rounded')]: this.rounded },
                { [this.computedClass('switch', 'outlinedClass', 'o-switch-outlined')]: this.outlined }
            ]
        },
        checkClasses() {
            return [
                this.computedClass('switch', 'checkClass', 'o-switch-check'),
                { [this.computedClass('switch', 'animationClass', 'o-switch-elastic')]: (this.isMouseDown && !this.disabled)},
                { [`${this.computedClass('switch', 'variantClass', 'o-color-')}${this.variant}`]: this.variant },
                { [`${this.computedClass('switch', 'passiveVariantClass', 'o-color-')}${this.passiveVariant}-passive`]: this.passiveVariant }
            ]
        },
        labelClasses() {
            return [
                this.computedClass('switch', 'labelClass', 'o-switch-label')
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
