<template>
    <transition :name="transition">
        <div v-show="isActive" :class="itemClasses">
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
        itemClasses() {
            return [
                this.computedClass('itemClass', 'o-car__item'),
            ]
        },
        transition() {
            if (this.parent.animated === 'fade') {
                return 'fade'
            } else if (this.parent.transition) {
                return 'slide-' + this.parent.transition
            }
        },
        isActive() {
            return this.parent.activeChild === this.index
        }
    }
}
</script>
