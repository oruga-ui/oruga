<script lang="ts">
import { defineComponent, h } from "vue"

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
        return h(
            'div',
            { class: this.parent.bodyHorizontalClasses },
            this.$slots.default().map((element) => {
                // skip returns and comments
                if (!element.tag) {
                    return element
                }
                let message
                if (first) {
                    message = this.parent.newMessage
                    first = false
                }
                return h('o-field',
                    { variant: this.parent.newVariant, message }, [element])
            })
        )
    }
})
</script>
