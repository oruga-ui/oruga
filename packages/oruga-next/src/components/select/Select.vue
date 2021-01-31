<template>
    <div :class="rootClasses">
        <select
            v-bind="$attrs"
            v-model="computedValue"
            :class="selectClasses"
            ref="select"
            :multiple="multiple"
            :size="nativeSize"
            @blur="$emit('blur', $event) && checkHtml5Validity()"
            @focus="$emit('focus', $event)">

            <template v-if="placeholder">
                <option
                    v-if="placeholderVisible"
                    :value="null"
                    :class="placeholderClasses"
                    disabled
                    hidden>
                    {{ placeholder }}
                </option>
            </template>

            <slot/>

        </select>

        <o-icon
            v-if="icon"
            :class="iconLeftClasses"
            :icon="icon"
            :pack="iconPack"
            :size="size" />

         <o-icon
            v-if="iconRight && !multiple"
            :class="iconRightClasses"
            :icon="iconRight"
            :pack="iconPack"
            :size="size" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Icon from '../icon/Icon.vue'

import FormElementMixin from '../../utils/FormElementMixin'
import BaseComponentMixin from '../../utils/BaseComponentMixin'

/**
 * Select an item in a dropdown list. Use with Field to access all functionalities
 * @displayName Select
 * @example ./examples/Select.md
 * @style _select.scss
 */
export default defineComponent({
    name: 'OSelect',
    components: {
        [Icon.name]: Icon
    },
    mixins: [BaseComponentMixin, FormElementMixin],
    configField: 'select',
    inheritAttrs: false,
    provide() {
        return {
            $elementRef: 'select'
        }
    },
    emits: ['update:modelValue', 'focus', 'blur'],
    props: {
        /** @model */
        modelValue: {
            type: [String, Number, Boolean, Object, Array],
            default: null
        },
        /**
         * Vertical size of input, optional
         * @values small, medium, large
         */
        size: String,
        /**
         * 	Icon name to be added on the right side
         */
        iconRight: String,
        /** Text when nothing is selected */
        placeholder: String,
        multiple: Boolean,
        /** Same as native size */
        nativeSize: [String, Number],
        rootClass: [String, Function, Array],
        iconLeftSpaceClass: [String, Function, Array],
        iconRightSpaceClass: [String, Function, Array],
        roundedClass: [String, Function, Array],
        multipleClass: [String, Function, Array],
        expandedClass: [String, Function, Array],
        iconLeftClass: [String, Function, Array],
        iconRightClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        variantClass: [String, Function, Array],
        placeholderClass: [String, Function, Array],
        arrowClass: [String, Function, Array]
    },
    data() {
        return {
            selected: this.modelValue
        }
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-ctrl-sel'),
                { [this.computedClass('expandedClass', 'o-ctrl-sel--expanded')]: this.expanded },
            ]
        },
        selectClasses() {
            return [
                this.computedClass('selectClass', 'o-sel'),
                { [this.computedClass('roundedClass', 'o-sel--rounded')]: this.rounded },
                { [this.computedClass('multipleClass', 'o-sel--multiple')]: this.multiple },
                { [this.computedClass('sizeClass', 'o-sel--', this.size)]: this.size },
                { [this.computedClass('variantClass', 'o-sel--', this.statusVariant)]: this.statusVariant },
                { [this.computedClass('iconLeftSpaceClass', 'o-sel-iconspace-left')]: this.icon },
                { [this.computedClass('iconRightSpaceClass', 'o-sel-iconspace-right')]: this.iconRight },
                { [this.computedClass('placeholderClass', 'o-sel--placeholder')]: this.placeholderVisible },
                { [this.computedClass('arrowClass', 'o-sel-arrow')]: !this.iconRight && !this.multiple }
            ]
        },
        iconLeftClasses() {
            return [
                this.computedClass('iconLeftClass', 'o-sel__icon-left')
            ]
        },
        iconRightClasses() {
            return [
                this.computedClass('iconRightClass', 'o-sel__icon-right')
            ]
        },
        placeholderVisible() {
            return this.computedValue === null
        },
        computedValue: {
            get() {
                return this.selected
            },
            set(value) {
                this.selected = value
                this.$emit('update:modelValue', value)
                !this.isValid && this.checkHtml5Validity()
            }
        }
    },
    watch: {
        /**
        * When v-model is changed:
        *   1. Set the selected option.
        *   2. If it's invalid, validate again.
        */
        modelValue(value) {
            this.selected = value
            !this.isValid && this.checkHtml5Validity()
        }
    }
})
</script>
