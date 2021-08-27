<template>
    <label
        :class="rootClasses"
        ref="label"
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
            :false-value="falseValue"
            :aria-labelledby="ariaLabelledby">
        <span :class="elementsWrapperClasses">
            <span :class="checkClasses">
                <span :class="checkSwitchClasses"></span>
            </span>
            <span
                :id="ariaLabelledby"
                :class="labelClasses">
                <slot/>
            </span>
        </span>
    </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import BaseComponentMixin from '../../utils/BaseComponentMixin'

/**
 * Switch between two opposing states
 * @displayName Switch
 * @example ./examples/Switch.md
 * @style _switch.scss
 */
export default defineComponent({
    name: 'OSwitch',
    mixins: [BaseComponentMixin],
    configField: 'switch',
    emits: ['update:modelValue'],
    props: {
        /** @model */
        modelValue: [String, Number, Boolean],
        /**
         * Same as native value
         */
        nativeValue: [String, Number, Boolean],
        disabled: Boolean,
        /**
         * Color of the switch, optional
         * @values primary, info, success, warning, danger, and any other custom color
         */
        variant: String,
         /**
         * Color of the switch when is passive, optional
         * @values primary, info, success, warning, danger, and any other custom color
         */
        passiveVariant: String,
        /** Name attribute on native checkbox */
        name: String,
        required: Boolean,
        /**
         * Vertical size of switch, optional
         * @values small, medium, large
         */
        size: String,
        /**
         * Overrides the returned value when it's checked
         */
        trueValue: {
            type: [String, Number, Boolean],
            default: true
        },
        /**
         * Overrides the returned value when it's not checked
         */
        falseValue: {
            type: [String, Number, Boolean],
            default: false
        },
        /** Rounded style */
        rounded: {
            type: Boolean,
            default: true
        },
        /** Show label on left */
        leftLabel: {
            type: Boolean,
            default: false
        },
        /** Accessibility label to establish relationship between the switch and control label' */
        ariaLabelledby: String,
        rootClass: [String, Function, Array],
        disabledClass: [String, Function, Array],
        checkClass: [String, Function, Array],
        checkCheckedClass: [String, Function, Array],
        checkSwitchClass: [String, Function, Array],
        roundedClass: [String, Function, Array],
        labelClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        variantClass: [String, Function, Array],
        elementsWrapperClass: [String, Function, Array],
        passiveVariantClass: [String, Function, Array],
        leftLabelClass: [String, Function, Array]
    },
    data() {
        return {
            newValue: this.modelValue,
            isMouseDown: false
        }
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-switch'),
                { [this.computedClass('sizeClass', 'o-switch--', this.size)]: this.size },
                { [this.computedClass('disabledClass', 'o-switch--disabled')]: this.disabled },
                { [this.computedClass('variantClass', 'o-switch--', this.variant)]: this.variant },
                { [this.computedClass('passiveVariantClass', 'o-switch--', this.passiveVariant + '-passive')]: this.passiveVariant }
            ]
        },
        checkClasses() {
            return [
                this.computedClass('checkClass', 'o-switch__check'),
                { [this.computedClass('checkCheckedClass', 'o-switch__check--checked')]: (this.newValue === this.trueValue)},
                { [this.computedClass('roundedClass', 'o-switch--rounded')]: this.rounded },
            ]
        },
        elementsWrapperClasses() {
            return [
                this.computedClass('elementsWrapperClass', 'o-switch__wrapper'),
                { [this.computedClass('leftLabelClass', 'o-switch__wrapper--left')]: this.leftLabel },
            ]
        },
        checkSwitchClasses() {
            return [
                this.computedClass('checkSwitchClass', 'o-switch__check-switch'),
                { [this.computedClass('roundedClass', 'o-switch--rounded')]: this.rounded },
            ]
        },
        labelClasses() {
            return [
                this.computedClass('labelClass', 'o-switch__label')
            ]
        },
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                this.newValue = value
                this.$emit('update:modelValue', this.newValue)
            }
        }
    },
    watch: {
        /**
        * When v-model change, set internal value.
        */
        modelValue(value) {
            this.newValue = value
        }
    },
    methods: {
        focus() {
            // MacOS FireFox and Safari do not focus when clicked
            this.$refs.input.focus()
        }
    }
})
</script>
