<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import config from '../../utils/config'
import { getValueByPath } from '../../utils/helpers'
import { createElement, getScopedSlot } from '../../utils/vue-utils'

/**
 * An easy way to toggle what you want
 * @displayName Collapse
 * @example ./examples/Collapse.md
 */
export default {
    name: 'OCollapse',
    mixins: [BaseComponentMixin],
    props: {
        /**
         * Whether collapse is open or not, use the .sync modifier (Vue 2.x) or v-model:open (Vue 3.x) to make it two-way binding
         */
        open: {
            type: Boolean,
            default: true
        },
        /**
         * Custom animation (transition name)
         */
        animation: {
            type: String,
            default: () => {
                return getValueByPath(config, 'collapse.animation', 'fade')
            }
        },
        /**
         * Custom animation (transition name)
         */
        ariaId: {
            type: String,
            default: ''
        },
        /**
         * Trigger position
         * @values top, bottom
         */
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
    render() {
        alert('b')
        const h = this.$createElement
        const trigger = createElement(h, 'div', {
            staticClass: this.computedClass('collapse', 'triggerClass', 'o-collapse-trigger'),
            on: { click: this.toggle }
        }, getScopedSlot(this, 'trigger')
            ? [getScopedSlot(this, 'trigger')({ open: this.isOpen })]
            : [this.$slots.trigger]
        )
        const content = createElement(h, 'transition', { props: { name: this.animation } }, [
            createElement(h, 'div', {
                staticClass: this.computedClass('collapse', 'contentClass', 'o-collapse-content'),
                attrs: { 'id': this.ariaId, 'aria-expanded': this.isOpen },
                directives: [{
                    name: 'show',
                    value: this.isOpen
                }]
            }, this.$slots.default)
        ])
        return createElement(h, 'div',
            { staticClass: this.computedClass('collapse', 'rootClass', 'o-collapse') },
            this.position === 'top' ? [trigger, content] : [content, trigger])
    }
}
</script>
