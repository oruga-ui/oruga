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
            :class="checkClasses"
            :disabled="disabled"
            :required="required"
            :name="name"
            :value="nativeValue"
            :true-value="trueValue"
            :false-value="falseValue">
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
        indeterminate: {
            type: Boolean,
            default: false
        },
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
        rootClass: [String, Function],
        disabledClass: [String, Function],
        checkClass: [String, Function],
        checkCheckedClass: [String, Function],
        checkIndeterminateClass: [String, Function],
        labelClass: [String, Function],
        sizeClass: [String, Function],
        variantClass: [String, Function]
    },
    watch: {
        indeterminate: {
            handler(val) {
                this.isIndeterminate = val;
            },
            immediate: true,
        },
    },
    computed: {
        isChecked () {
            return this.computedValue === this.trueValue || Array.isArray(this.computedValue) && this.computedValue.indexOf(this.nativeValue) !== -1
        },
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-chk'),
                { [this.computedClass('sizeClass', 'o-chk--', this.size)]: this.size },
                { [this.computedClass('disabledClass', 'o-chk--disabled')]: this.disabled },
                { [this.computedClass('variantClass', 'o-chk--', this.variant)]: this.variant }
            ]
        },
        checkClasses() {
            return [
                this.computedClass('checkClass', 'o-chk__check'),
                { [this.computedClass('checkCheckedClass', 'o-chk__check--checked')] : this.isChecked },
                { [this.computedClass('checkIndeterminateClass', 'o-chk__check--indeterminate')] : this.isIndeterminate },
            ]
        },
        labelClasses() {
            return [
                this.computedClass('labelClass', 'o-chk__label')
            ]
        }
    }
}
</script>
