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
                    v-if="computedValue == null"
                    :value="null"
                    disabled
                    hidden>
                    {{ placeholder }}
                </option>
            </template>

            <slot/>

        </select>

        <o-icon
            v-if="icon"
            :class="iconLeftClass"
            :icon="icon"
            :pack="iconPack"
            :size="size"/>

         <o-icon
            v-if="iconRight"
            :class="iconRightClass"
            :icon="iconRight"
            :pack="iconPack"
            :size="size"
            both />
    </div>
</template>

<script>
import Icon from '../icon/Icon'

import FormElementMixin from '../../utils/FormElementMixin'
import config from '../../utils/config'
import { getValueByPath, getCssClass } from '../../utils/helpers'

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
    mixins: [FormElementMixin],
    inheritAttrs: false,
    provide() {
        return {
            $elementRef: 'select'
        }
    },
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array],
            default: null
        },
        iconRight: {
            type: String,
            default: 'caret-down'
        },
        placeholder: String,
        multiple: Boolean,
        nativeSize: [String, Number],
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'select.override', false)
                const clazz = getValueByPath(config, 'select.inputClass', '')
                return getCssClass(clazz, override, 'o-control-select')
            }
        },
        emptyClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'select.override', false)
                const clazz = getValueByPath(config, 'select.emptyClass', '')
                return getCssClass(clazz, override, 'o-select-empty')
            }
        },
        controlExpandedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'select.override', false)
                const clazz = getValueByPath(config, 'select.controlExpandedClass', '')
                return getCssClass(clazz, override, 'o-control-select-expanded')
            }
        },
        controlIconLeftClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'select.override', false)
                const clazz = getValueByPath(config, 'select.controlIconLeftClass', '')
                return getCssClass(clazz, override, 'o-control-select-icons-left')
            }
        },
        controlIconRightClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'select.override', false)
                const clazz = getValueByPath(config, 'select.controlIconRightClass', '')
                return getCssClass(clazz, override, 'o-control-select-icons-right')
            }
        },
        roundedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'select.override', false)
                const clazz = getValueByPath(config, 'select.roundedClass', '')
                return getCssClass(clazz, override, 'o-select-rounded')
            }
        },
        multipleClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'select.override', false)
                const clazz = getValueByPath(config, 'select.multipleClass', '')
                return getCssClass(clazz, override, 'o-select-multiple')
            }
        },
        emptyClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'select.override', false)
                const clazz = getValueByPath(config, 'select.emptyClass', '')
                return getCssClass(clazz, override, 'o-select-empty')
            }
        },
        expandedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'select.override', false)
                const clazz = getValueByPath(config, 'select.expandedClass', '')
                return getCssClass(clazz, override, 'o-select-expanded')
            }
        },
        iconLeftClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'select.override', false)
                const clazz = getValueByPath(config, 'select.iconLeftClass', '')
                return getCssClass(clazz, override, 'o-icon-left')
            }
        },
        iconRightClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'select.override', false)
                const clazz = getValueByPath(config, 'select.iconRightClass', '')
                return getCssClass(clazz, override, 'o-icon-right')
            }
        }
    },
    data() {
        return {
            selected: this.value
        }
    },
    computed: {
        rootClasses() {
            return [
                this.rootClass,
                this.icon && this.controlIconLeftClass,
                this.iconRight && this.controlIconRightClass,
                this.expanded && this.controlExpandedClass
            ]
        },
        selectClasses() {
            return [
                this.selectClass,
                this.size && ('o-size-' + this.size),
                this.statusVariant && 'o-color-' + this.statusVariant, 
                this.rounded && this.roundedClass, 
                this.selected === null && this.emtpyClass, 
                this.multiple && this.multipleClass, 
                this.expanded && this.expandedClass
            ]
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
        },
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
