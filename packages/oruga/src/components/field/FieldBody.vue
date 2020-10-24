<script>
import VueComponentMixin from '../../utils/VueComponentMixin'
import {normalizeClass,} from '@vue/shared'

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
