import { getSlotInstance, isVue2 } from './vue-utils'
import VueComponentMixin from './VueComponentMixin'

export default {
    name: 'OSlotComponent',
    mixins: [VueComponentMixin()],
    props: {
        component: {
            type: Object,
            required: true
        },
        name: {
            type: String,
            default: 'default'
        },
        scoped: {
            type: Boolean
        },
        props: {
            type: Object
        },
        tag: {
            type: String,
            default: 'div'
        },
        event: {
            type: String,
            default: 'hook:updated'
        }
    },
    methods: {
        refresh() {
            this.$forceUpdate()
        }
    },
    created() {
        if (isVue2()) {
            this.component.$on(this.event, this.refresh)
        }
    },
    beforeDestroy() {
        if (isVue2()) {
            this.component.$off(this.event, this.refresh)
        }
    },
    render() {
        if (!this.vueReady) return
        const slot = getSlotInstance(this.component, this.name, this.scoped, this.props)
        return this.$createElement(this.tag, {}, slot)
    }
}
