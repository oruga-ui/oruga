<script>
export default {
    name: 'OFieldBody',
    inject: {
        $field: { name: '$field', default: false }
    },
    computed: {
        parent() {
            return this.$field
        }
    },
    render(createElement) {
        let first = true
        return createElement('div', { attrs: { 'class': this.parent.contentHorizontalClass } }, this.$slots.default.map((element) => {
            // skip returns and comments
            if (!element.tag) {
                return element
            }
            let message
            if (first) {
                message = this.parent.newMessage
                first = false
            }
            return createElement(this.parent.rootClass, { attrs: { type: this.parent.newVariant, message } }, [element])
        }))
    }
}
</script>
