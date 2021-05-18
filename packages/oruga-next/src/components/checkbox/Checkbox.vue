<template>
    <label
        :class="rootClasses"
        ref="label"
        :disabled="disabled"
        @click.stop="focus"
        @keydown.prevent.enter="$refs.label.click()">
        <o-icon
             v-if="iconCheck"
            :icon="iconCheck"
            :pack="iconPack"
            :size="size"
            :class="iconCheckClasses"
        />
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
            :autocomplete="autocomplete"
            :value="nativeValue"
            :true-value="trueValue"
            :false-value="falseValue">
        <span :class="labelClasses"><slot/></span>
    </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Icon from '../icon/Icon.vue'

import BaseComponentMixin from '../../utils/BaseComponentMixin'
import CheckRadioMixin from '../../utils/CheckRadioMixin'

import { getOptions } from '../../utils/config'
import { getValueByPath } from '../../utils/helpers'

/**
 * Select a single or grouped options
 * @displayName Checkbox
 * @example ./examples/Checkbox.md
 * @style _checkbox.scss
 */
export default defineComponent({
    name: 'OCheckbox',
    components: {
        [Icon.name]: Icon
    },
    mixins: [BaseComponentMixin, CheckRadioMixin],
    configField: 'checkbox',
    emits: [
        'input'
    ],
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
        iconCheck: {
            type: String,
            default: () => { return getValueByPath(getOptions(), 'checkbox.iconCheck', undefined) }
        },
        /* Same as native autocomplete */
        autocomplete: String,
        rootClass: [String, Function, Array],
        disabledClass: [String, Function, Array],
        checkClass: [String, Function, Array],
        checkCheckedClass: [String, Function, Array],
        checkIndeterminateClass: [String, Function, Array],
        labelClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        variantClass: [String, Function, Array],
        iconCheckClass: [String, Function, Array],
        iconCheckCheckedClass: [String, Function, Array]
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
            return this.computedValue === this.trueValue
                || Array.isArray(this.computedValue) && this.computedValue.indexOf(this.nativeValue) !== -1
        },
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-chk'),
                { [this.computedClass('checkedClass', 'o-chk--checked')] : this.isChecked },
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
        },
        iconCheckClasses() {
            return [
                this.computedClass('iconCheckClass', 'o-chk__icon'),
                { [this.computedClass('iconCheckCheckedClass', 'o-chk__icon--checked')] : this.isChecked },
            ]
        }
    }
})
</script>
