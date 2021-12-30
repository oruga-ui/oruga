<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import TabbedChildMixin from '../../utils/TabbedChildMixin'
import { getOptions } from '../../utils/config'
import { getValueByPath } from '../../utils/helpers'

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
        /**
         * Tabs item tag name
         */
        tag: {
            type: String,
            default: () => {
                return getValueByPath(getOptions(), 'tabs.itemTag', 'button')
            }
        },
        itemClass: [String, Function, Array],
        itemHeaderClass: [String, Function, Array],
        itemHeaderActiveClass: [String, Function, Array],
        itemHeaderDisabledClass: [String, Function, Array],
        itemHeaderTypeClass: [String, Function, Array],
        itemHeaderIconClass: [String, Function, Array],
        itemHeaderTextClass: [String, Function, Array]
    },
    computed: {
        elementClasses() {
            return [
                this.computedClass('itemClass', 'o-tab-item__content')
            ]
        },
        headerClasses() {
            return [
                this.computedClass('itemHeaderClass', 'o-tabs__nav-item'),
                { [this.computedClass('itemHeaderActiveClass', 'o-tabs__nav-item-{*}--active', this.parent.type)]: this.isActive },
                { [this.computedClass('itemHeaderDisabledClass', 'o-tabs__nav-item-{*}--disabled', this.parent.type)]: this.disabled },
                { [this.computedClass('itemHeaderTypeClass', 'o-tabs__nav-item-', this.parent.type)]: this.parent.type },
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
