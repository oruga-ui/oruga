<script lang="ts">
import { defineComponent, h } from "vue"

export default defineComponent({
    name: 'OFieldBody',
    inject: ['$field'],
    computed: {
        parent() {
            return this.$field
        }
    },
    render() {
        let first = true
        return h(
            'div', 
            { class: this.parent.contentHorizontalClasses }, 
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
                return h(
                    this.parent.rootClass,
                    { variant: this.parent.newVariant, message }, [element])
            })
        )
    }
})
</script>
