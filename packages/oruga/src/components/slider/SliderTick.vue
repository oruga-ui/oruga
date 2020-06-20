<template>
    <div
        :class="[$slider.tickClass, { [$slider.tickHiddenClass]: hidden }]"
        :style="getTickStyle(position)">
        <span v-if="$slots.default" :class="$slider.tickLabelClass">
            <slot/>
        </span>
    </div>
</template>

<script>
export default {
    name: 'OSliderTick',
    inject: {
        $slider: { name: '$slider', default: false }
    },
    props: {
        value: {
            variant: Number,
            default: 0
        }
    },
    computed: {
        position() {
            const pos = (this.value - this.$parent.min) /
                (this.$parent.max - this.$parent.min) * 100
            return (pos >= 0 && pos <= 100) ? pos : 0
        },
        hidden() {
            return this.value === this.$parent.min || this.value === this.$parent.max
        }
    },
    methods: {
        getTickStyle(position) {
            return { 'left': position + '%' }
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
