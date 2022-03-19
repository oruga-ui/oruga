import { defineComponent, h, Transition, vShow, withDirectives } from 'vue'
import { default as InjectedChildMixin, Sorted } from './InjectedChildMixin'

export default (parentCmp: string) => defineComponent({
    mixins: [InjectedChildMixin(parentCmp, Sorted)],
    props: {
        /**
         * Item value (it will be used as v-model of wrapper component)
         */
        value: [String, Number],
        /**
         * Item label
         */
        label: String,
        /**
         * Icon on the left
         */
        icon: String,
        /**
         * Icon pack
         */
        iconPack: String,
        /**
         * Show/hide item
         */
        visible: {
            type: Boolean,
            default: true
        },
        /**
         * Header class of the item
         */
        headerClass: [String, Array, Object]
    },
    data() {
        return {
            transitionName: undefined,
            newValue: this.value
        }
    },
    computed: {
        isActive(): boolean {
            return this.parent.activeItem === this
        },
        elementClasses() {
            return []
        }
    },
    methods: {
        /**
         * Activate element, alter animation name based on the index.
         */
        activate(oldIndex: number) {
            this.transitionName = this.index < oldIndex
                ? this.parent.vertical ? 'slide-down' : 'slide-next'
                : this.parent.vertical ? 'slide-up' : 'slide-prev'
        },

        /**
         * Deactivate element, alter animation name based on the index.
         */
        deactivate(newIndex: number) {
            this.transitionName = newIndex < this.index
                ? this.parent.vertical ? 'slide-down' : 'slide-next'
                : this.parent.vertical ? 'slide-up' : 'slide-prev'
        }
    },
    render() {
        // if destroy apply v-if
        if (this.parent.destroyOnHide) {
            if (!this.isActive || !this.visible) return
        }
        const content = this.$slots.default ? this.$slots.default() : []
        const vnode = withDirectives(
            h('div',
                {
                    class: this.elementClasses,
                    id: `${parentCmp}-${this.newValue}`
                },
                content
            ),
            [ [vShow, this.isActive && this.visible] ]
        )
        // check animated prop
        if (this.parent.animated) {
            return h(Transition,
                {
                    'name': this.transitionName,
                    'onBeforeEnter': () => { this.parent.isTransitioning = true },
                    'onAfterEnter': () => { this.parent.isTransitioning = false }
                },
                () => ([vnode])
            )
        }
        return vnode
    }
})
