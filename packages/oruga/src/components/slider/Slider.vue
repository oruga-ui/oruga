<template>
    <div
        @click="onSliderClick"
        :class="rootClasses">
        <div
            :class="trackClass"
            ref="slider">
            <div
                :class="fillClass"
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
                ref="button1"
                role="slider"
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
                ref="button2"
                v-if="isRange"
                role="slider"
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

<script>
import SliderThumb from './SliderThumb'
import SliderTick from './SliderTick'

import config from '../../utils/config'
import { getValueByPath, getCssClass } from '../../utils/helpers'

export default {
    name: 'OSlider',
    components: {
        [SliderThumb.name]: SliderThumb,
        [SliderTick.name]: SliderTick
    },
    provide() {
        return {
            $slider: this
        }
    },
    props: {
        value: {
            type: [Number, Array],
            default: 0
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        step: {
            type: Number,
            default: 1
        },
        variant: {
            type: String,
            default: ''
        },
        size: String,
        ticks: {
            type: Boolean,
            default: false
        },
        tooltip: {
            type: Boolean,
            default: true
        },
        tooltipVariant: String,
        rounded: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        lazy: {
            type: Boolean,
            default: false
        },
        customFormatter: Function,
        ariaLabel: [String, Array],
        biggerSliderFocus: {
            type: Boolean,
            default: false
        },
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'slider.override', false)
                const clazz = getValueByPath(config, 'slider.rootClass', '')
                return getCssClass(clazz, override, 'o-slider')
            }
        },
        trackClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'slider.override', false)
                const clazz = getValueByPath(config, 'slider.trackClass', '')
                return getCssClass(clazz, override, 'o-slider-track')
            }
        },
        fillClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'slider.override', false)
                const clazz = getValueByPath(config, 'slider.fillClass', '')
                return getCssClass(clazz, override, 'o-slider-fill')
            }
        },
        roundedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'slider.override', false)
                const clazz = getValueByPath(config, 'slider.roundedClass', '')
                return getCssClass(clazz, override, 'o-slider-rounded')
            }
        },
        draggingClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'slider.override', false)
                const clazz = getValueByPath(config, 'slider.draggingClass', '')
                return getCssClass(clazz, override, 'o-slider-dragging')
            }
        },
        disabledClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'slider.override', false)
                const clazz = getValueByPath(config, 'slider.disabledClass', '')
                return getCssClass(clazz, override, 'o-slider-disabled')
            }
        },
        biggerSliderFocusClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'slider.override', false)
                const clazz = getValueByPath(config, 'slider.biggerSliderFocusClass', '')
                return getCssClass(clazz, override, 'o-slider-focus')
            }
        },
        wrapperThumbClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'slider.override', false)
                const clazz = getValueByPath(config, 'slider.wrapperThumbClass', '')
                return getCssClass(clazz, override, 'o-slider-wrapper-thumb')
            }
        },
        thumbClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'slider.override', false)
                const clazz = getValueByPath(config, 'slider.thumbClass', '')
                return getCssClass(clazz, override, 'o-slider-thumb')
            }
        },
        thumbDraggingClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'slider.override', false)
                const clazz = getValueByPath(config, 'slider.thumbDraggingClass', '')
                return getCssClass(clazz, override, 'o-slider-thumb-dragging')
            }
        },
        tickClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'slider.override', false)
                const clazz = getValueByPath(config, 'slider.tickClass', '')
                return getCssClass(clazz, override, 'o-slider-tick')
            }
        },
        tickHiddenClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'slider.override', false)
                const clazz = getValueByPath(config, 'slider.tickHiddenClass', '')
                return getCssClass(clazz, override, 'o-slider-tick-hidden')
            }
        },
        tickLabelClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'slider.override', false)
                const clazz = getValueByPath(config, 'slider.tickLabelClass', '')
                return getCssClass(clazz, override, 'o-slider-tick-label')
            }
        }
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
        },
        rootClasses() {
            return [
                this.rootClass,
                this.size && 'o-size-' + this.size,
                this.variant && 'o-color-' + this.variant,
                this.rounded && this.roundedClass,
                this.dragging && this.draggingClass,
                this.disabled && this.disabledClass,
                this.biggerSliderFocus && this.biggerSliderFocusClass,
            ]
        }
    },
    watch: {
        /**
        * When v-model is changed set the new active step.
        */
        value(value) {
            this.setValues(value)
        },
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
                this.emitValue('input')
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
                this.emitValue('input')
            }
        },
        emitValue(value) {
            this.$emit(value, this.isRange
                ? [this.minValue, this.maxValue]
                : this.value1)
        }
    },
    created() {
        this.isThumbReversed = false
        this.isTrackClickDisabled = false
        this.setValues(this.value)
    }
}
</script>
