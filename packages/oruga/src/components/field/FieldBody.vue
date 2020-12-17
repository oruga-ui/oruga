<script>
export default {
    name: 'OFieldBody',
    inject: {
        $field: { name: '$field', default: false }
    },
    configField: 'field',
    computed: {
        parent() {
            return this.$field
        }
    },
    render(h) {
        let first = true
        return h(
            'div',
            { attrs: { 'class': this.parent.bodyHorizontalClasses } },
            this.$slots.default.map((element) => {
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
                    { attrs: { variant: this.parent.newVariant, message } }, [element])
            })
        )
    }
}
</script>
