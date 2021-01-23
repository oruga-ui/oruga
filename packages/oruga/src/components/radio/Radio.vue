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
            :class="checkClasses"
            :disabled="disabled"
            :required="required"
            :name="name"
            :value="nativeValue">
        <span :class="labelClasses"><slot/></span>
    </label>
</template>

<script>
import CheckRadioMixin from '../../utils/CheckRadioMixin'
import BaseComponentMixin from '../../utils/BaseComponentMixin'

/**
 * Select an option from a set
 * @displayName Radio
 * @example ./examples/Radio.md
 * @style _radio.scss
 */
export default {
    name: 'ORadio',
    mixins: [BaseComponentMixin, CheckRadioMixin],
    configField: 'radio',
    props: {
        rootClass: [String, Function, Array],
        disabledClass: [String, Function, Array],
        checkCheckedClass: [String, Function, Array],
        checkClass: [String, Function, Array],
        labelClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        variantClass: [String, Function, Array]
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-radio'),
                { [this.computedClass('sizeClass', 'o-radio--', this.size)]: this.size },
                { [this.computedClass('disabledClass', 'o-radio--disabled')]: this.disabled },
                { [this.computedClass('variantClass', 'o-radio--', this.variant)]: this.variant }

            ]
        },
        checkClasses() {
            return [
                this.computedClass('checkClass', 'o-radio__check'),
                { [this.computedClass('checkCheckedClass', 'o-radio__check--checked')]: this.value === this.nativeValue },
            ]
        },
        labelClasses() {
            return [
                this.computedClass('labelClass', 'o-radio__label')
            ]
        }
    }
}
</script>
