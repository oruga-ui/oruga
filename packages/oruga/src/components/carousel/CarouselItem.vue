<template>
    <div
        :class="itemClasses"
        @click="onClick"
        :style="itemStyle">
        <slot />
    </div>
</template>

<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import {default as InjectedChildMixin, Sorted} from '../../utils/InjectedChildMixin'

/**
 * @displayName Carousel Item
 */
export default {
    name: 'OCarouselItem',
    config: 'carousel',
    mixins: [InjectedChildMixin('carousel', Sorted), BaseComponentMixin],
    props: {
        itemClass: [String, Function, Array],
        itemActiveClass: [String, Function, Array]
    },
    computed: {
        itemClasses() {
            return [
                this.computedClass('itemClass', 'o-car__item'),
                {[this.computedClass('itemActiveClass', 'o-car__item--active')]: this.isActive}
            ]
        },
        itemStyle() {
            return `width: ${this.parent.itemWidth}px;`
        },
        isActive() {
            return this.parent.activeIndex === this.index
        }
    },
    methods: {
        onClick(event) {
            if (this.isActive) {
                this.parent.$emit('click', event)
            }
            if (this.parent.asIndicator) {
                this.parent.activeIndex = this.index
                this.parent.$emit('input', this.index)
            }
        }
    }
}
</script>
