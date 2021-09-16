<template>
    <label
        :class="rootClasses"
        ref="label"
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

<script lang="ts">
import { defineComponent } from 'vue'

import CheckRadioMixin from '../../utils/CheckRadioMixin'
import BaseComponentMixin from '../../utils/BaseComponentMixin'

import Icon from '../icon/Icon.vue'

import { getValueByPath } from '../../utils/helpers'
import { getOptions } from '../../utils/config'

/**
 * Select an option from a set
 * @displayName Radio
 * @example ./examples/Radio.md
 * @style _radio.scss
 */
export default defineComponent({
    name: 'ORadio',
    components: {
        [Icon.name]: Icon
    },
    mixins: [BaseComponentMixin, CheckRadioMixin],
    configField: 'radio',
    emits: [
        'input'
    ],
    props: {
        /**
		 * Icon pack to use
		 * @values mdi, fa, fas and any other custom icon pack
		 */
        iconPack: {
            type: String,
            default: () => { return getValueByPath(getOptions(), 'radio.iconPack', undefined) }
        },
        iconCheck: {
            type: String,
            default: () => { return getValueByPath(getOptions(), 'radio.iconCheck', undefined) }
        },
        rootClass: [String, Function, Array],
        disabledClass: [String, Function, Array],
        checkCheckedClass: [String, Function, Array],
        checkClass: [String, Function, Array],
        labelClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        variantClass: [String, Function, Array],
        iconCheckClass: [String, Function, Array],
        iconCheckCheckedClass: [String, Function, Array]
    },
    computed: {
        isChecked() {
            return this.modelValue === this.nativeValue
        },
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-radio'),
                { [this.computedClass('checkedClass', 'o-radio--checked')] : this.isChecked },
                { [this.computedClass('sizeClass', 'o-radio--', this.size)]: this.size },
                { [this.computedClass('disabledClass', 'o-radio--disabled')]: this.disabled },
                { [this.computedClass('variantClass', 'o-radio--', this.variant)]: this.variant }

            ]
        },
        checkClasses() {
            return [
                this.computedClass('checkClass', 'o-radio__check'),
                { [this.computedClass('checkCheckedClass', 'o-radio__check--checked')]: this.isChecked },
            ]
        },
        labelClasses() {
            return [
                this.computedClass('labelClass', 'o-radio__label')
            ]
        },
        iconCheckClasses() {
            return [
                this.computedClass('iconCheckClass', 'o-radio__icon'),
                { [this.computedClass('iconCheckCheckedClass', 'o-radio__icon--checked')]: this.isChecked },
            ]
        }
    }
})
</script>
