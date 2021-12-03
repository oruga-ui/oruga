<template>
    <div
        :class="slideClasses"
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
        slideClasses() {
            return [
                this.computedClass('itemClass', 'o-car__item'),
                {[this.computedClass('itemActiveClass', 'o-car__item--active')]: this.parent.activeIndex === this.index}
            ]
        },
        itemStyle() {
            return `width: ${this.parent.itemWidth}px;`
        }
    },
    methods: {
        onClick(event) {
            if (this.isActive) {
                this.parent.$emit('click', event)
            }
            if (this.parent.asIndicator) {
                this.parent.activeIndex = this.index
                this.parent.$emit('switch', this.index)
            }
        }
    }
}
</script>
