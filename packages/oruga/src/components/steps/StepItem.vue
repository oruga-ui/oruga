<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin.js'
import TabbedChildMixin from '../../utils/TabbedChildMixin.js'
import { getStyleValue } from '../../utils/helpers'

export default {
    name: 'OStepItem',
    mixins: [BaseComponentMixin, TabbedChildMixin('step')],
    props: {
        /** Step marker content (when there is no icon) */
        step: [String, Number],
        /** Default style for the step, optional This will override parent type. Could be used to set a completed step to "success" for example */
        variant: [String, Object],
        /** Item can be used directly to navigate. If undefined, previous steps are clickable while the others are not */
        clickable: {
            type: Boolean,
            default: undefined
        },
        itemClass: String,
        variantClass: String,
        itemActiveClass: String,
        itemPreviousClass: String
    },
    computed: {
        elementClasses() {
            return [
                this.computedClass('steps', 'itemClass', 'o-step-item')
            ]
        },
        itemClasses() {
            return [
                this.headerClass,
                this.computedClass('steps', 'itemClass', 'o-step-item'),
                { [`${this.computedClass('steps', 'variantClass', 'o-color-', true)}${getStyleValue(this.variant) || this.parent.$props.variant}`]: getStyleValue(this.variant) || this.parent.$props.variant },
                { [this.computedClass('steps', 'itemActiveClass', 'o-step-item-active')]: this.isActive },
                { [this.computedClass('steps', 'itemPreviousClass', 'o-step-item-previous')]: this.parent.activeItem.index > this.index }
            ]
        }
    }
}
</script>
