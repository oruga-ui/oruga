<template>
    <div
        @click="onSliderClick"
        :class="rootClasses">
        <div
            :class="trackClasses"
            ref="slider">
            <div
                :class="fillClasses"
                :style="barStyle"/>
            <template v-if="ticks">
                <o-slider-tick
                    v-for="(val, key) in tickValues"
                    :key="key"
                    :value="val"/>
            </template>
            <slot/>
            <o-slider-thumb
                v-model="value1"
                :variant="newTooltipVariant"
                :tooltip="tooltip"
                :custom-formatter="customFormatter"
                :indicator="indicator"
                ref="button1"
                role="slider"
                :format="format"
                :locale="locale"
                :tooltip-always="tooltipAlways"
                :aria-valuenow="value1"
                :aria-valuemin="min"
                :aria-valuemax="max"
                aria-orientation="horizontal"
                :aria-label="Array.isArray(ariaLabel) ? ariaLabel[0] : ariaLabel"
                :aria-disabled="disabled"
                @dragstart="onDragStart"
                @dragend="onDragEnd" />
            <o-slider-thumb
                v-model="value2"
                :variant="newTooltipVariant"
                :tooltip="tooltip"
                :custom-formatter="customFormatter"
                :indicator="indicator"
                ref="button2"
                v-if="isRange"
                role="slider"
                :format="format"
                :locale="locale"
                :tooltip-always="tooltipAlways"
                :aria-valuenow="value2"
                :aria-valuemin="min"
                :aria-valuemax="max"
                aria-orientation="horizontal"
                :aria-label="Array.isArray(ariaLabel) ? ariaLabel[1] : ''"
                :aria-disabled="disabled"
                @dragstart="onDragStart"
                @dragend="onDragEnd" />
        </div>
    </div>
</template>

<script lang="ts">
import SliderThumb from './SliderThumb.vue'
import SliderTick from './SliderTick.vue'

import { getOptions } from '../../utils/config'
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import { getValueByPath } from '../../utils/helpers'
import { defineComponent } from 'vue'

/**
 * A slider to select a value or range from a given range
 * @displayName Slider
 * @requires ./SliderTick.vue
 * @style _slider.scss
 */
export default defineComponent({
    name: 'OSlider',
    components: {
        [SliderThumb.name]: SliderThumb,
        [SliderTick.name]: SliderTick
    },
    configField: 'slider',
    mixins: [BaseComponentMixin],
    provide() {
        return {
            $slider: this
        }
    },
    emits: ['update:modelValue', 'change', 'dragging', 'dragstart', 'dragend'],
    props: {
        /** @model */
        modelValue: {
            type: [Number, Array],
            default: 0
        },
        /** Minimum value */
        min: {
            type: Number,
            default: 0
        },
        /** Maximum  value */
        max: {
            type: Number,
            default: 100
        },
        /** Step interval of ticks */
        step: {
            type: Number,
            default: 1
        },
        /**
         * Color of the slider
         * @values primary, info, success, warning, danger, and any other custom color
         */
        variant: {
            type: String
        },
        /**
         * Vertical size of slider, optional
         * @values small, medium, large
         */
        size: String,
        /** Show tick marks */
        ticks: {
            type: Boolean,
            default: false
        },
        /** Show tooltip when thumb is being dragged */
        tooltip: {
            type: Boolean,
            default: () => {
                return getValueByPath(getOptions(), 'slider.tooltip', true)
            }
        },
        /**
         * Color of the tooltip
         * @values primary, info, success, warning, danger, and any other custom color
         */
        tooltipVariant: String,
        /** Rounded thumb */
        rounded: {
            type: Boolean,
            default: () => {
                return getValueByPath(getOptions(), 'slider.rounded', false)
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        /** Update v-model only when dragging is finished */
        lazy: {
            type: Boolean,
            default: false
        },
        /** Function to format the tooltip label for display */
        customFormatter: Function,
        ariaLabel: [String, Array],
        /** Increases slider size on focus */
        biggerSliderFocus: {
            type: Boolean,
            default: false
        },
        indicator: {
            type: Boolean,
            default: false
        },
        format: {
            type: String,
            default: 'raw',
            validator: (value: string) => {
                return [
                    'raw',
                    'percent'
                ].indexOf(value) >= 0
            }
        },
        locale: {
            type: [String, Array],
            default: () => {
                return getValueByPath(getOptions(), 'locale')
            }
        },
        /** Tooltip displays always */
        tooltipAlways: {
            type: Boolean,
            default: false
        },
        rootClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        trackClass: [String, Function, Array],
        fillClass: [String, Function, Array],
        thumbRoundedClass: [String, Function, Array],
        thumbDraggingClass: [String, Function, Array],
        disabledClass: [String, Function, Array],
        thumbWrapperClass: [String, Function, Array],
        thumbClass: [String, Function, Array],
        variantClass: [String, Function, Array]
    },
    data() {
        return {
            value1: null,
            value2: null,
            dragging: false,
            isRange: false
        }
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-slide'),
                { [this.computedClass('sizeClass', 'o-slide--', this.size)]: this.size },
                { [this.computedClass('disabledClass', 'o-slide--disabled')]: this.disabled },
            ]
        },
        trackClasses() {
            return [
                this.computedClass('trackClass', 'o-slide__track'),
            ]
        },
        fillClasses() {
            return [
                this.computedClass('fillClass', 'o-slide__fill'),
                { [this.computedClass('variantClass', 'o-slide__fill--', this.variant)]: this.variant },
            ]
        },
        thumbClasses() {
            return [
                this.computedClass('thumbClass', 'o-slide__thumb'),
                { [this.computedClass('thumbDraggingClass', 'o-slide__thumb--dragging')]: this.dragging },
                { [this.computedClass('thumbRoundedClass', 'o-slide__thumb--rounded')]: this.rounded },

            ]
        },
        thumbWrapperClasses() {
             return [
                this.computedClass('thumbWrapperClass', 'o-slide__thumb-wrapper'),
            ]
        },
        newTooltipVariant() {
            return this.tooltipVariant ? this.tooltipVariant : this.variant
        },
        tickValues() {
            if (!this.ticks || this.min > this.max || this.step === 0) return []
            const result = []
            for (let i = this.min + this.step; i < this.max; i = i + this.step) {
                result.push(i)
            }
            return result
        },
        minValue() {
            return Math.min(this.value1, this.value2)
        },
        maxValue() {
            return Math.max(this.value1, this.value2)
        },
        barSize() {
            return this.isRange
                ? `${100 * (this.maxValue - this.minValue) / (this.max - this.min)}%`
                : `${100 * (this.value1 - this.min) / (this.max - this.min)}%`
        },
        barStart() {
            return this.isRange
                ? `${100 * (this.minValue - this.min) / (this.max - this.min)}%`
                : '0%'
        },
        precision() {
            const precisions = [this.min, this.max, this.step].map((item) => {
                const decimal = ('' + item).split('.')[1]
                return decimal ? decimal.length : 0
            })
            return Math.max(...precisions)
        },
        barStyle() {
            return {
                width: this.barSize,
                left: this.barStart
            }
        }
    },
    watch: {
        value1() {
            this.onInternalValueUpdate()
        },
        value2() {
            this.onInternalValueUpdate()
        },
        min() {
            this.setValues(this.value)
        },
        max() {
            this.setValues(this.value)
        },
        /**
        * When v-model is changed set the new active step.
        */
        modelValue(value) {
            this.setValues(value)
        }
    },
    methods: {
        setValues(newValue) {
            if (this.min > this.max) {
                return
            }
            if (Array.isArray(newValue)) {
                this.isRange = true
                const smallValue = typeof newValue[0] !== 'number' || isNaN(newValue[0])
                    ? this.min
                    : Math.min(Math.max(this.min, newValue[0]), this.max)
                const largeValue = typeof newValue[1] !== 'number' || isNaN(newValue[1])
                    ? this.max
                    : Math.max(Math.min(this.max, newValue[1]), this.min)
                this.value1 = this.isThumbReversed ? largeValue : smallValue
                this.value2 = this.isThumbReversed ? smallValue : largeValue
            } else {
                this.isRange = false
                this.value1 = isNaN(newValue)
                    ? this.min
                    : Math.min(this.max, Math.max(this.min, newValue))
                this.value2 = null
            }
        },
        onInternalValueUpdate() {
            if (this.isRange) {
                this.isThumbReversed = this.value1 > this.value2
            }
            if (!this.lazy || !this.dragging) {
                this.emitValue('update:modelValue')
            }
            if (this.dragging) {
                this.emitValue('dragging')
            }
        },
        sliderSize() {
            return this.$refs.slider.getBoundingClientRect().width
        },
        onSliderClick(event) {
            if (this.disabled || this.isTrackClickDisabled) return
            const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left
            const percent = (event.clientX - sliderOffsetLeft) / this.sliderSize() * 100
            const targetValue = this.min + percent * (this.max - this.min) / 100
            const diffFirst = Math.abs(targetValue - this.value1)
            if (!this.isRange) {
                if (diffFirst < this.step / 2) return
                this.$refs.button1.setPosition(percent)
            } else {
                const diffSecond = Math.abs(targetValue - this.value2)
                if (diffFirst <= diffSecond) {
                    if (diffFirst < this.step / 2) return
                    this.$refs['button1'].setPosition(percent)
                } else {
                    if (diffSecond < this.step / 2) return
                    this.$refs['button2'].setPosition(percent)
                }
            }
            this.emitValue('change')
        },
        onDragStart() {
            this.dragging = true
            this.$emit('dragstart')
        },
        onDragEnd() {
            this.isTrackClickDisabled = true
            setTimeout(() => {
                // avoid triggering onSliderClick after dragend
                this.isTrackClickDisabled = false
            }, 0)
            this.dragging = false
            this.$emit('dragend')
            if (this.lazy) {
                this.emitValue('update:modelValue')
            }
        },
        emitValue(event) {
            const val = this.isRange
                ? [this.minValue, this.maxValue]
                : this.value1
            this.$emit(event, val)
        }
    },
    created() {
        this.isThumbReversed = false
        this.isTrackClickDisabled = false
        this.setValues(this.modelValue)
    }
})
</script>
