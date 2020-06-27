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
        <span :class="checkClass" />
        <span :class="labelClass"><slot/></span>
    </label>
</template>

<script>
import CheckRadioMixin from '../../utils/CheckRadioMixin.js'
import config from '../../utils/config'
import { getValueByPath, getCssClass } from '../../utils/helpers'

/**
 * Select a single or grouped options
 * @displayName Checkbox
 * @style _checkbox.scss 
 */
export default {
    name: 'OCheckbox',
    mixins: [CheckRadioMixin],
    props: {
        indeterminate: Boolean,
        trueValue: {
            type: [String, Number, Boolean],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean],
            default: false
        },
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'checkbox.override', false)
                const clazz = getValueByPath(config, 'checkbox.rootClass', '')
                return getCssClass(clazz, override, 'o-checkbox')
            }
        },
        disabledClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'checkbox.override', false)
                const clazz = getValueByPath(config, 'checkbox.disabledClass', '')
                return getCssClass(clazz, override, 'o-checkbox-disabled')
            }
        },
        checkClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'checkbox.override', false)
                const clazz = getValueByPath(config, 'checkbox.checkClass', '')
                return getCssClass(clazz, override, 'o-checkbox-check')
            }
        },
        labelClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'checkbox.override', false)
                const clazz = getValueByPath(config, 'checkbox.labelClass', '')
                return getCssClass(clazz, override, 'o-checkbox-label')
            }
        }
    },
    computed: {
        rootClasses() {
            return [
                this.rootClass,
                this.size && ('o-size-' + this.size),
                this.disabled && this.disabledClass
            ]
        },
        checkClasses() {
            return [
                this.checkClass,
                this.variant && ('o-color-' + this.variant)
            ]
        }
    }
}
</script>
