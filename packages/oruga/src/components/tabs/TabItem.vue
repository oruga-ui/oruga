<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import TabbedChildMixin from '../../utils/TabbedChildMixin'

/**
 * @displayName Tab Item
 */
export default {
    name: 'OTabItem',
    mixins: [BaseComponentMixin, TabbedChildMixin('tab')],
    configField: 'tabs',
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
                this.computedClass('itemClass', 'o-tab-item__content')
            ]
        },
        headerClasses() {
            return [
                this.headerClass || this.computedClass('itemHeaderClass', 'o-tabs__nav-item'),
                { [this.computedClass('itemHeaderActiveClass', 'o-tabs__nav-item--active')]: this.isActive },
                { [this.computedClass('itemHeaderDisabledClass', 'o-tabs__nav-item--disabled')]: this.disabled }
            ]
        }
    }
}
</script>
