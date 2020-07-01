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
            :disabled="disabled"
            :required="required"
            :name="name"
            :value="nativeValue">
        <span :class="checkClasses" />
        <span :class="labelClass"><slot/></span>
    </label>
</template>

<script>
import CheckRadioMixin from '../../utils/CheckRadioMixin.js'
import config from '../../utils/config'
import { getValueByPath, getCssClass } from '../../utils/helpers'

/**
 * Select an option from a set
 * @displayName Radio
 * @example ./examples/Radio.md
 * @style _radio.scss
 */
export default {
    name: 'ORadio',
    mixins: [CheckRadioMixin],
    props: {
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'radio.override', false)
                const clazz = getValueByPath(config, 'radio.rootClass', '')
                return getCssClass(clazz, override, 'o-radio')
            }
        },
        disabledClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'radio.override', false)
                const clazz = getValueByPath(config, 'radio.disabledClass', '')
                return getCssClass(clazz, override, 'o-radio-disabled')
            }
        },
        checkClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'radio.override', false)
                const clazz = getValueByPath(config, 'radio.o-radio-checkClass', '')
                return getCssClass(clazz, override, 'o-radio-check')
            }
        },
        labelClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'radio.override', false)
                const clazz = getValueByPath(config, 'radio.labelClass', '')
                return getCssClass(clazz, override, 'o-radio-label')
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
