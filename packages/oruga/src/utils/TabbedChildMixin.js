import { default as InjectedChildMixin, Sorted } from './InjectedChildMixin'

export default (parentCmp) => ({
    mixins: [InjectedChildMixin(parentCmp, Sorted)],
    props: {
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
         * Item value (it will be used as v-model of wrapper component)
         */
        value: {
            type: String,
            default() { return this._uid.toString() }
        },
        /**
         * Header class of the item
         */
        headerClass: {
            type: [String, Array, Object],
            default: null
        }
    },
    data() {
        return {
            transitionName: null
        }
    },
    computed: {
        isActive() {
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
        activate(oldIndex) {
            this.transitionName = this.index < oldIndex
                ? this.parent.vertical ? 'slide-down' : 'slide-next'
                : this.parent.vertical ? 'slide-up' : 'slide-prev'
        },

        /**
         * Deactivate element, alter animation name based on the index.
         */
        deactivate(newIndex) {
            this.transitionName = newIndex < this.index
                ? this.parent.vertical ? 'slide-down' : 'slide-next'
                : this.parent.vertical ? 'slide-up' : 'slide-prev'
        }
    },
    render(createElement) {
        // if destroy apply v-if
        if (this.parent.destroyOnHide) {
            if (!this.isActive || !this.visible) {
                return
            }
        }
        const vnode = createElement('div', {
            directives: [{
                name: 'show',
                value: this.isActive && this.visible
            }],
            attrs: { 'class': this.elementClasses }
        }, this.$slots.default)
        // check animated prop
        if (this.parent.animated) {
            return createElement('transition', {
                props: {
                    'name': this.transitionName
                },
                on: {
                    'before-enter': () => { this.parent.isTransitioning = true },
                    'after-enter': () => { this.parent.isTransitioning = false }
                }
            }, [vnode])
        }
        return vnode
    }
})
