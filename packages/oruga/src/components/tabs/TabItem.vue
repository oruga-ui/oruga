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
        itemHeaderClass: String,
        itemHeaderActiveClass: String,
        itemHeaderDisabledClass: String
    },
    computed: {
        elementClasses() {
            return [
                this.computedClass('tabs', 'itemClass', 'o-tab-item__content')
            ]
        },
        headerClasses() {
            return [
                this.headerClass || this.computedClass('tabs', 'itemHeaderClass', 'o-tabs__nav-item'),
                { [this.computedClass('tabs', 'itemHeaderActiveClass', 'o-tabs__nav-item--active')]: this.isActive },
                { [this.computedClass('tabs', 'itemHeaderDisabledClass', 'o-tabs__nav-item--disabled')]: this.disabled }
            ]
        }
    }
}
</script>
