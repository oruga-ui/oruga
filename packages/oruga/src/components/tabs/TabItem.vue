<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import TabbedChildMixin from '../../utils/TabbedChildMixin'

/**
 * @displayName Tab Item
 */
export default {
    name: 'OTabItem',
    mixins: [BaseComponentMixin, TabbedChildMixin('tab')],
    props: {
        /** Item will be disabled */
        disabled: Boolean,
        itemClass: String,
        itemHeaderActiveClass: String,
        itemHeaderDisabledClass: String
    },
    computed: {
        elementClasses() {
            return [
                this.computedClass('tabs', 'itemClass', 'o-tab-item')
            ]
        },
        headerClasses() {
            return [
                this.headerClass,
                { [this.computedClass('tabs', 'itemHeaderActiveClass', 'o-tab-active')]: this.isActive },
                { [this.computedClass('tabs', 'itemHeaderDisabledClass', 'o-tab-disabled')]: this.disabled }
            ]
        }
    }
}
</script>
