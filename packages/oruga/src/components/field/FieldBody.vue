<script>
import { createElement } from '../../utils/vue-utils'

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
    render(h) {
        let first = true
        return createElement(
            h,
            'div', 
            { attrs: { 'class': this.parent.contentHorizontalClasses } }, 
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
                return createElement(
                    h,
                    this.parent.rootClass,
                    { attrs: { variant: this.parent.newVariant, message } }, [element])
            })
        )
    }
}
</script>
