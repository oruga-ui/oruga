<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin.js'
import TabbedChildMixin from '../../utils/TabbedChildMixin.js'

/**
 * @displayName Tab Item
 */
export default {
    name: 'OTabItem',
    mixins: [BaseComponentMixin, TabbedChildMixin('tab')],
    props: {
        /**
         * Item will be disabled
         */
        disabled: Boolean
    },
    computed: {
        elementClasses() {
            return [
                this.computedClass('tabs', 'rootClass', 'o-tab-item')
            ]
        },
        headerClasses() {
            return [
                this.headerClass,
                { [this.computedClass('tabs', 'headerActiveClass', 'o-tab-active')]: this.isActive },
                { [this.computedClass('tabs', 'headerDisabledClass', 'o-tab-disabled')]: this.disabled }
            ]
        }
    }
}
</script>
