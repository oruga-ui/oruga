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
            class="o-icon-left"
            :icon="icon"
            :pack="iconPack"
            :size="size"/>

         <o-icon
            v-if="iconRight"
            class="o-icon-right"
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
        selectClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'select.override', false)
                const clazz = getValueByPath(config, 'select.selectClass', '')
                return getCssClass(clazz, override, 'o-select')
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
                this.icon && 'o-control-select-icons-left',
                this.iconRight && 'o-control-select-icons-right',
                this.expanded && 'o-control-select-expanded'
            ]
        },
        selectClasses() {
            return [
                this.selectClass,
                this.size && 'o-size',
                this.statusVariant && 'o-color-' + this.statusVariant, 
                this.rounded && this.roundedClass, 
                this.selected === null && this.emtpyClass, 
                this.multiple && this.multipleClass, 
                this.expanded && 'o-select-expanded'
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
