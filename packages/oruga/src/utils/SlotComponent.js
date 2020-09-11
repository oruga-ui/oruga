import { isVueComponent } from './helpers'
import { getSlotInstance } from './vue-utils'

export default {
    name: 'OSlotComponent',
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
        if (isVueComponent(this.component)) {
            this.component.$on(this.event, this.refresh)
        }
    },
    beforeDestroy() {
        if (isVueComponent(this.component)) {
            this.component.$off(this.event, this.refresh)
        }
    },
    render(createElement) {
        if (isVueComponent(this.component)) {
            const slot = getSlotInstance(this.component, this.name, this.scoped, this.props)
            return createElement(this.tag, {}, slot)
        }
    }
}
