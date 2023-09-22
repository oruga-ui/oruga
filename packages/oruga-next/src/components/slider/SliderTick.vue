<script lang="ts">
import { defineComponent } from "vue";

import BaseComponentMixin from "../../mixins/BaseComponentMixin";

/**
 * @displayName Slider Tick
 */
export default defineComponent({
    name: "OSliderTick",
    mixins: [BaseComponentMixin],
    configField: "slider",
    inject: ["$slider"],
    props: {
        /** Value of single tick */
        value: {
            variant: Number,
            default: 0,
        },
        tickClass: [String, Function, Array],
        tickHiddenClass: [String, Function, Array],
        tickLabelClass: [String, Function, Array],
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass("tickClass", "o-slide__tick"),
                {
                    [this.computedClass(
                        "tickHiddenClass",
                        "o-slide__tick--hidden",
                    )]: this.hidden,
                },
            ];
        },
        tickLabelClasses() {
            return [
                this.computedClass("tickLabelClass", "o-slide__tick-label"),
            ];
        },
        position() {
            const pos =
                ((this.value - this.$parent.min) /
                    (this.$parent.max - this.$parent.min)) *
                100;
            return pos >= 0 && pos <= 100 ? pos : 0;
        },
        hidden() {
            return (
                this.value === this.$parent.min ||
                this.value === this.$parent.max
            );
        },
        tickStyle() {
            return { left: this.position + "%" };
        },
    },
    created() {
        if (!this.$slider) {
            throw new Error("You should wrap oSliderTick on a oSlider");
        }
    },
});
</script>

<template>
    <div :class="rootClasses" :style="tickStyle">
        <span v-if="$slots.default" :class="tickLabelClasses">
            <slot />
        </span>
    </div>
</template>
