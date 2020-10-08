<script>
import VueComponentMixin from '../../utils/VueComponentMixin'

export default {
    name: 'OFieldBody',
    mixins: [VueComponentMixin()],
    inject: {
        $field: { name: '$field', default: false }
    },
    computed: {
        parent() {
            return this.$field
        }
    },
    render() {
        if (!this.vueReady) return
        let first = true
        return this.$createElement(
            'div', 
            { attrs: { 'class': this.parent.contentHorizontalClasses } }, 
            this.getSlotInstance('default').map((element) => {
                // skip returns and comments
                if (!element.tag) {
                    return element
                }
                let message
                if (first) {
                    message = this.parent.newMessage
                    first = false
                }
                return this.$createElement(
                    this.parent.rootClass,
                    { attrs: { variant: this.parent.newVariant, message } }, [element])
            })
        )
    }
}
</script>
