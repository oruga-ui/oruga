<script lang="ts">
import { defineComponent, h, VNode } from 'vue'

import BaseComponentMixin from '../../utils/BaseComponentMixin'
import { toCssDimension } from '../../utils/helpers'

/**
 * A placeholder for content to load
 * @displayName Skeleton
 * @example ./examples/Skeleton.md
 * @style _skeleton.scss
 */
export default defineComponent({
    name: 'OSkeleton',
    mixins: [BaseComponentMixin],
    props: {
        /** Show or hide loader	 */
        active: {
            type: Boolean,
            default: true
        },
        /** Show a loading animation */
        animated: {
            type: Boolean,
            default: true
        },
        /** Custom width */
        width: [Number, String],
        /** Custom height */
        height: [Number, String],
        /** Show a circle shape */
        circle: Boolean,
        /** Rounded style */
        rounded: {
            type: Boolean,
            default: true
        },
        /** Number of shapes to display */
        count: {
            type: Number,
            default: 1
        },
        /**
         * Skeleton position in relation to the element
         * @values left, centered, right
         */
        position: {
            type: String,
            default: '',
            validator: (value: string) => {
                return [
                    '',
                    'centered',
                    'right'
                ].indexOf(value) > -1
            }
        },
        /**
         * Size of skeleton
         * @values small, medium, large
         */
        size: String,
        rootClass: String,
        animationClass: String,
        positionClass: String,
        itemClass: String,
        itemRoundedClass: String,
        sizeClass: String
    },
    render() {
        if (!this.active) return
        const items: VNode[] = []
        const width = this.width
        const height = this.height
        for (let i = 0; i < this.count; i++) {
            items.push(h(
                'div', 
                {
                    class: [
                        this.computedClass('skeleton', 'itemClass', 'o-skeleton-item'), 
                        { [this.computedClass('skeleton', 'itemRoundedClass', 'o-skeleton-item-rounded')]: this.rounded }
                    ],
                    key: i,
                    style: {
                        height: toCssDimension(height),
                        width: toCssDimension(width),
                        borderRadius: this.circle ? '50%' : null
                    }
                }
            ))
        }
        return h(
            'div',
            {
                class: [
                    this.computedClass('skeleton', 'rootClass', 'o-skeleton'),
                    { [`${this.computedClass('skeleton', 'sizeClass', 'o-size-', true)}${this.size}`]: this.size },
                    { [`${this.computedClass('skeleton', 'positionClass', 'o-skeleton-', true)}${this.position}`]: this.position },
                    { [this.computedClass('skeleton', 'animationClass', 'o-skeleton-animated')]: this.animated }
                ]
            },
            items
        )
    }
})
</script>
