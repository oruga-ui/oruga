<script>
import { toCssDimension } from '../../utils/helpers'
export default {
    name: 'OSkeleton',
    functional: true,
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
        size: String
    },
    render(createElement, { props }) {
        if (!props.active) return
        const items = []
        const width = props.width
        const height = props.height
        for (let i = 0; i < props.count; i++) {
            items.push(createElement('div', {
                staticClass: 'o-skeleton-item',
                class: { 'o-skeleton-rounded': props.rounded },
                key: i,
                style: {
                    height: toCssDimension(height),
                    width: toCssDimension(width),
                    borderRadius: props.circle ? '50%' : null
                }
            }))
        }
        return createElement('div', {
            staticClass: 'o-skeleton',
            class: [ 
                props.size && ('o-size-' + props.size),
                props.position && ('o-skeleton-' + props.position),
                props.animated && 'o-skeleton-animated'
            ]
        }, items)
    }
}
</script>
