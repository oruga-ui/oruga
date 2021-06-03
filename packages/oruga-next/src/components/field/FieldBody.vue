<script lang="ts">
import { defineComponent, h, resolveComponent } from "vue"

export default defineComponent({
    name: 'OFieldBody',
    inject: ['$field'],
    configField: 'field',
    computed: {
        parent() {
            return this.$field
        }
    },
    render() {
        let first = true
        const slot = this.$slots.default()
        const children = slot.length === 1 && Array.isArray(slot[0].children) ? slot[0].children : slot
        return h(
            'div',
            { class: this.parent.bodyHorizontalClasses },
            children.map((element) => {
                let message
                if (first) {
                    message = this.parent.newMessage
                    first = false
                }
                // @ts-ignore (Why props null ??)
                return h(resolveComponent('OField'),
                    { variant: this.parent.newVariant, message }, () => [element])
            })
        )
    }
})
</script>
