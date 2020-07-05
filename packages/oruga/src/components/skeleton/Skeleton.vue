<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import { toCssDimension } from '../../utils/helpers'

/**
 * A placeholder for content to load
 * @displayName Skeleton
 * @example ./examples/Skeleton.md
 * @style _skeleton.scss
 */
export default {
    name: 'OSkeleton',
    mixins: [BaseComponentMixin],
    props: {
        active: {
            type: Boolean,
            default: true
        },
        animated: {
            type: Boolean,
            default: true
        },
        width: [Number, String],
        height: [Number, String],
        circle: Boolean,
        rounded: {
            type: Boolean,
            default: true
        },
        count: {
            type: Number,
            default: 1
        },
        position: {
            type: String,
            default: '',
            validator(value) {
                return [
                    '',
                    'centered',
                    'right'
                ].indexOf(value) > -1
            }
        },
        size: String,
        rootClass: String,
        animationClass: String,
        positionClass: String,
        itemClass: String,
        itemRoundedClass: String,
        sizeClass: String
    },
    render(createElement) {
        if (!this.active) return
        const items = []
        const width = this.width
        const height = this.height
        for (let i = 0; i < this.count; i++) {
            items.push(createElement('div', {
                staticClass: this.computedClass('skeleton', 'itemClass', 'o-skeleton-item'),
                class: { [this.computedClass('skeleton', 'itemRoundedClass', 'o-skeleton-item-rounded')]: this.rounded },
                key: i,
                style: {
                    height: toCssDimension(height),
                    width: toCssDimension(width),
                    borderRadius: this.circle ? '50%' : null
                }
            }))
        }
        return createElement('div', {
            staticClass: this.computedClass('skeleton', 'rootClass', 'o-skeleton'),
            class: [
                { [`${this.computedClass('skeleton', 'sizeClass', 'o-size-')}${this.size}`]: this.size },
                { [`${this.computedClass('skeleton', 'positionClass', 'o-skeleton-')}${this.position}`]: this.position },
                { [this.computedClass('skeleton', 'animationClass', 'o-skeleton-animated')]: this.animated }
            ]
        }, items)
    }
}
</script>
