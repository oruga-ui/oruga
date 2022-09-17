import type { DefineComponent } from 'vue';
import { defineComponent, h } from 'vue';

export default defineComponent({
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
        props: {
            type: Object
        },
        tag: {
            type: String,
            default: 'div'
        }
    },
    render() {
        const slot = (this.component as DefineComponent).$slots[this.name](this.props)
        return h(this.tag, {}, slot)
    }
})
