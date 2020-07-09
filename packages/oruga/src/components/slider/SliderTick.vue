<template>
    <div
        :class="rootClasses"
        :style="tickStyle">
        <span v-if="$slots.default" :class="tickLabelClasses">
            <slot/>
        </span>
    </div>
</template>

<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin'

/**
 * @displayName SliderTick
 */
export default {
    name: 'OSliderTick',
    mixins: [BaseComponentMixin],
    inject: {
        $slider: { name: '$slider', default: false }
    },
    props: {
        /** Value of single tick */
        value: {
            variant: Number,
            default: 0
        },
        tickClass: String,
        tickHiddenClass: String,
        tickLabelClass: String
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('slider', 'tickClass', 'o-slider-tick'),
                { [this.computedClass('slider', 'tickHiddenClass', 'o-slider-tick-hidden')]: this.hidden },
            ]
        },
        tickLabelClasses() {
            return [
                this.computedClass('slider', 'tickLabelClass', 'o-slider-tick-label')
            ]
        },
        position() {
            const pos = (this.value - this.$parent.min) /
                (this.$parent.max - this.$parent.min) * 100
            return (pos >= 0 && pos <= 100) ? pos : 0
        },
        hidden() {
            return this.value === this.$parent.min || this.value === this.$parent.max
        },
        tickStyle() {
            return { 'left': this.position + '%' }
        }
    },
    created() {
        if (!this.$slider) {
            this.$destroy()
            throw new Error('You should wrap oSliderTick on a oSlider')
        }
    }
}
</script>
