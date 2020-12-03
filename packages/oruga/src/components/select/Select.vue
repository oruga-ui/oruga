<template>
    <div :class="rootClasses">
        <select
            :class="selectClasses"
            v-model="computedValue"
            ref="select"
            :multiple="multiple"
            :size="nativeSize"
            v-bind="$attrs"
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
            :size="size"/>

         <o-icon
            v-if="iconRight && !multiple"
            :class="iconRightClasses"
            :icon="iconRight"
            :pack="iconPack"
            :size="size"
            both />
    </div>
</template>

<script>
import Icon from '../icon/Icon'

import FormElementMixin from '../../utils/FormElementMixin'
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import config from '../../utils/config'
import { getValueByPath } from '../../utils/helpers'

/**
 * Select an item in a dropdown list. Use with Field to access all functionalities
 * @displayName Select
 * @example ./examples/Select.md
 * @style _select.scss
 */
export default {
    name: 'OSelect',
    components: {
        [Icon.name]: Icon
    },
    mixins: [BaseComponentMixin, FormElementMixin],
    inheritAttrs: false,
    provide() {
        return {
            $elementRef: 'select'
        }
    },
    emits: ['update:modelValue', 'focus', 'blur'],
    props: {
        /** @model */
        value: {
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
        iconRight: {
            type: String,
            default: (vm) => {
                return getValueByPath(config, 'select.iconRight', 'caret-down')
            }
        },
        /** Text when nothing is selected */
        placeholder: String,
        multiple: Boolean,
        /** Same as native size */
        nativeSize: [String, Number],
        rootClass: String,
        iconsLeftClass: String,
        iconsRightClass: String,
        roundedClass: String,
        multipleClass: String,
        emptyClass: String,
        expandedClass: String,
        iconLeftClass: String,
        iconRightClass: String,
        sizeClass: String,
        variantClass: String,
        placeholderClass: String
    },
    data() {
        return {
            selected: this.value
        }
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('select', 'rootClass', 'o-ctrl-sel'),
                { [this.computedClass('select', 'expandedClass', 'o-ctrl-sel--expanded')]: this.expanded },
            ]
        },
        selectClasses() {
            return [
                this.computedClass('select', 'selectClass', 'o-sel'),
                { [this.computedClass('select', 'roundedClass', 'o-sel--rounded')]: this.rounded },
                { [this.computedClass('select', 'multipleClass', 'o-sel--multiple')]: this.multiple },
                { [`${this.computedClass('select', 'sizeClass', 'o-sel--', this.size)}`]: this.size },
                { [`${this.computedClass('select', 'variantClass', 'o-sel--', this.statusVariant)}`]: this.statusVariant },
                { [this.computedClass('select', 'iconsLeftClass', 'o-sel-icons-left')]: this.icon },
                { [this.computedClass('select', 'iconsRightClass', 'o-sel-icons-right')]: this.iconRight },
                { [this.computedClass('select', 'placeholderClass', 'o-sel--placeholder')]: this.placeholderVisible }
            ]
        },
        iconLeftClasses() {
            return [
                this.computedClass('select', 'iconLeftClass', 'o-sel__icon-left')
            ]
        },
        iconRightClasses() {
            return [
                this.computedClass('select', 'iconRightClass', 'o-sel__icon-right')
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
                this.$emit('input', value)
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
        value(value) {
            this.selected = value
            !this.isValid && this.checkHtml5Validity()
        }
    }
}
</script>
