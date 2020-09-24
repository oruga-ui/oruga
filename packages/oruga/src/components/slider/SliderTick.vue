<template>
    <div
        v-if="vueReady"
        :class="rootClasses"
        :style="tickStyle">
        <span v-if="hasDefaultSlot" :class="tickLabelClasses">
            <slot/>
        </span>
    </div>
</template>

<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import VueComponentMixin from '../../utils/VueComponentMixin'

/**
 * @displayName SliderTick
 */
export default {
    name: 'OSliderTick',
    mixins: [VueComponentMixin, BaseComponentMixin],
    inject: {
        $slider: { name: '$slider' }
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
        },
        hasDefaultSlot() {
            return this.existsSlot('default')
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
