<template>
    <div
        :class="slideClasses"
        @mouseup="checkAsIndicator"
        @touchend="checkAsIndicator"
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
        itemsClass: [String, Function, Array],
        itemActiveClass: [String, Function, Array]
    },
    computed: {
        slideClasses() {
            return [
                this.computedClass('itemClass', 'o-car__item'),
                {[this.computedClass('itemActiveClass', 'o-car__item--active')]: this.isActive}
            ]
        },
        itemStyle() {
            return `width: ${this.parent.itemWidth}px;`
        },
        isActive() {
            return this.parent.scrollIndex === this.index
        }
    },
    methods: {
        checkAsIndicator(event) {
            this.parent.checkAsIndicator(this.index, event)
        }
    }
}
</script>
