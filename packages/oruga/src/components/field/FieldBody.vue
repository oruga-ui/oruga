<script>
import VueComponentMixin from '../../utils/VueComponentMixin'
import {normalizeClass} from '../../utils/vue-utils'

export default {
    name: 'OFieldBody',
    mixins: [VueComponentMixin()],
    inject: ['$field'],
    computed: {
        parent() {
            return this.$field
        }
    },
    render() {
        if (!this.vueReady) return
        // Todo add message underneath first child
        return this.$createElement(
            'div',
            {attrs: {'class': normalizeClass(this.parent.contentHorizontalClasses)}},
            [this.$createElement(
                'div',
                {attrs: {'class': normalizeClass([...this.parent.innerFieldClasses, {'o-field': 'true'}])}},
                this.getSlotInstance('default')
            )]
        )
    }
}
</script>
