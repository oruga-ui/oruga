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

<style lang="scss">
@import "../../scss/oruga.scss";

@mixin steps-size($size) {
    > .o-skeleton-item {
        line-height: $size;
    }
}

.o-skeleton {
    display: inline-flex;
    flex-direction: column;
    vertical-align: middle;
    width: 100%;
    > .o-skeleton-item {
        background: $skeleton-background;
        background-size: 400% 100%;
        width: 100%;
        &.o-skeleton-rounded {
            border-radius: $skeleton-border-radius;
        }
        &::after {
            content: "\00a0";
        }
        + .o-skeleton-item {
            margin-top: $skeleton-margin-top;
        }
    }
    &.o-skeleton-animated {
        > .o-skeleton-item {
            animation: skeleton-loading $skeleton-duration infinite;
        }
    }
    &.o-skeleton-centered {
        align-items: center;
    }
    &.o-skeleton-right {
        align-items: flex-end;
    }
    + .o-skeleton {
        margin-top: $skeleton-margin-top;
    }
    @include steps-size($base-font-size);
    @each $name, $value in $sizes {
        &.o-size-#{$name} {
            @include steps-size($value);
        }
    }
}

@keyframes skeleton-loading {
    0% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0 50%;
    }
}
</style>