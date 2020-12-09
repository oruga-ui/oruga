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
        <span :class="checkClasses" />
        <span :class="labelClasses"><slot/></span>
    </label>
</template>

<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import CheckRadioMixin from '../../utils/CheckRadioMixin'

/**
 * Select a single or grouped options
 * @displayName Checkbox
 * @example ./examples/Checkbox.md
 * @style _checkbox.scss
 */
export default {
    name: 'OCheckbox',
    mixins: [BaseComponentMixin, CheckRadioMixin],
    configField: 'checkbox',
    props: {
        /**
         * Same as native indeterminate
         */
        indeterminate: Boolean,
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
        rootClass: String,
        disabledClass: String,
        checkClass: String,
        labelClass: String,
        sizeClass: String,
        variantClass: String
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-checkbox'),
                { [this.computedClass('sizeClass', 'o-size-', this.size)]: this.size },
                { [this.computedClass('disabledClass', 'o-checkbox-disabled')]: this.disabled }
            ]
        },
        checkClasses() {
            return [
                this.computedClass('checkClass', 'o-checkbox-check'),
                { [this.computedClass('variantClass', 'o-color-', this.variant)]: this.variant }
            ]
        },
        labelClasses() {
            return [
                this.computedClass('labelClass', 'o-checkbox-label')
            ]
        }
    }
}
</script>
