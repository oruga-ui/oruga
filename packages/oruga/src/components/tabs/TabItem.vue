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
        itemClass: [String, Function],
        itemHeaderClass: [String, Function],
        itemHeaderActiveClass: [String, Function],
        itemHeaderDisabledClass: [String, Function],
        itemHeaderTypeClass: [String, Function],
        itemHeaderIconClass: [String, Function],
        itemHeaderTextClass: [String, Function],
    },
    computed: {
        elementClasses() {
            return [
                this.computedClass('itemClass', 'o-tab-item__content')
            ]
        },
        headerClasses() {
            return [
                { [this.computedClass('itemHeaderClass', 'o-tabs__nav-item-{*}', this.$parent.type)]: this.$parent.type },
                { [this.computedClass('itemHeaderActiveClass', 'o-tabs__nav-item-{*}--active', this.$parent.type)]: this.isActive },
                { [this.computedClass('itemHeaderDisabledClass', 'o-tabs__nav-item-{*}--disabled', this.$parent.type)]: this.disabled },
                { [this.computedClass('itemHeaderTypeClass', 'o-tabs__nav-item-', this.$parent.type)]: this.$parent.type },
            ]
        },
        headerIconClasses() {
            return [
                this.computedClass('itemHeaderIconClass', 'o-tabs__nav-item-icon')
            ]
        },
        headerTextClasses() {
            return [
                this.computedClass('itemHeaderTextClass', 'o-tabs__nav-item-text')
            ]
        }
    }
}
</script>
