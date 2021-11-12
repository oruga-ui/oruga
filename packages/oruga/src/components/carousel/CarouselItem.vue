<template>
    <transition :name="transition">
        <div v-show="isActive" class="o-car__item">
            <slot />
        </div>
    </transition>
</template>

<script>
import {default as InjectedChildMixin, Sorted} from '../../utils/InjectedChildMixin'

/**
 * @displayName Carousel Item
 */
export default {
    name: 'OCarouselItem',
    mixins: [InjectedChildMixin('carousel', Sorted)],
    data() {
        return {
            transitionName: null
        }
    },
    computed: {
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
