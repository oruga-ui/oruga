<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import config from '../../utils/config'
import { getValueByPath } from '../../utils/helpers'

/**
 * An easy way to toggle what you want
 * @displayName Collapse
 * @example ./examples/Collapse.md
 */
export default {
    name: 'OCollapse',
    mixins: [BaseComponentMixin],
    props: {
        open: {
            type: Boolean,
            default: true
        },
        animation: {
            type: String,
            default: () => {
                return getValueByPath(config, 'collapse.animation', 'fade')
            }
        },
        ariaId: {
            type: String,
            default: ''
        },
        position: {
            type: String,
            default: 'top',
            validator(value) {
                return [
                    'top',
                    'bottom'
                ].indexOf(value) > -1
            }
        },
        rootClass: String,
        triggerClass: String,
        contentClass: String
    },
    data() {
        return {
            isOpen: this.open
        }
    },
    watch: {
        open(value) {
            this.isOpen = value
        }
    },
    methods: {
        /**
        * Toggle and emit events
        */
        toggle() {
            this.isOpen = !this.isOpen
            this.$emit('update:open', this.isOpen)
            this.$emit(this.isOpen ? 'open' : 'close')
        }
    },
    render(createElement) {
        const trigger = createElement('div', {
            staticClass: this.computedClass('collapse', 'triggerClass', 'o-collapse-trigger'),
            on: { click: this.toggle }
        }, this.$scopedSlots.trigger
            ? [this.$scopedSlots.trigger({ open: this.isOpen })]
            : [this.$slots.trigger]
        )
        const content = createElement('transition', { props: { name: this.animation } }, [
            createElement('div', {
                staticClass: this.computedClass('collapse', 'contentClass', 'o-collapse-content'),
                attrs: { 'id': this.ariaId, 'aria-expanded': this.isOpen },
                directives: [{
                    name: 'show',
                    value: this.isOpen
                }]
            }, this.$slots.default)
        ])
        return createElement('div', { staticClass: this.computedClass('collapse', 'rootClass', 'o-collapse') },
            this.position === 'top' ? [trigger, content] : [content, trigger])
    }
}
</script>
