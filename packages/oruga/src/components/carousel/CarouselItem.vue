<template>
    <transition :name="transition">
        <div
            :class="slideClasses"
            @mouseup="checkAsIndicator"
            @touchend="checkAsIndicator"
            :style="itemStyle">
            <slot />
        </div>
    </transition>
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
    data() {
        return {
            transitionName: null
        }
    },
    computed: {
        slideClasses() {
            return [
                this.computedClass('slideClass', 'o-car__slide'),
                {[this.computedClass('sliceActiveClass', 'o-car__slide--active')]: this.parent.asIndicator ?
                    this.parent.activeItem === this.index : this.parent.scrollIndex === this.index}
            ]
        },
        transition() {
            if (this.parent.animated === 'fade') {
                return 'fade'
            } /*else if (this.parent.transition) {
                return 'slide-' + this.parent.transition
            }*/
        },
        itemStyle() {
            return `width: ${this.parent.itemWidth}px;`
        }
    },
    methods: {
        checkAsIndicator(event) {
            this.parent.checkAsIndicator(this.index, event)
        }
    }
}
</script>
