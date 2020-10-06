import Icon from '../components/icon/Icon'
import SlotComponent from '../utils/SlotComponent'
import { default as ProviderParentMixin, Sorted } from './ProviderParentMixin'
import VueComponentMixin from './VueComponentMixin'

const modelValueDef = [String, Number]

export default (cmp) => ({
    mixins: [VueComponentMixin({vModel: modelValueDef}), ProviderParentMixin(cmp, Sorted)],
    components: {
        [Icon.name]: Icon,
        [SlotComponent.name]: SlotComponent
    },
    emits: ['update:modelValue'],
    props: {
        /**
        * Color of the control, optional
        * @values primary, info, success, warning, danger, and any other custom color
        */
        variant: [String, Object],
        /**
         * Tab size, optional
         * @values small, medium, large
         */
        size: String,
        animated: {
            type: Boolean,
            default: true
        },
        /** Show tab in vertical layout */
        vertical: {
            type: Boolean,
            default: false
        },
        /**
         * Position of the tab, optional
         * @values centered, right
         */
        position: String,
        /** Destroy tab on hide */
        destroyOnHide: {
            type: Boolean,
            default: false
        }
    },
    data() {
        const vm = this
        return {
            activeId: vm.getModel(),
            contentHeight: 0,
            isTransitioning: false
        }
    },
    computed: {
        activeItem() {
            return this.activeId !== undefined && this.activeId !== null
                ? this.childItems.filter((i) => i.newValue === this.activeId)[0] : this.items[0]
        },
        items() {
            return this.sortedItems
        }
    },
    methods: {
        /**
         * When v-model is changed set the new active tab.
         */
        onModelChange(value) {
            this.performAction()
            this.activeId = value
        },
        /**
        * Child click listener, emit input event and change active child.
        */
        childClick(child) {
            if (this.activeId !== child.newValue) {
                this.performAction()
                this.activeId = child.newValue
                this.emitModel(this.activeId)
            }
        },
        /**
        * Activate next child and deactivate prev child
        */
        performAction() {
            const oldValue = this.activeId
            const oldTab = oldValue !== undefined && oldValue !== null
                ? this.childItems.filter((i) => i.newValue === oldValue)[0] : this.items[0]
            if (oldTab && this.activeItem) {
                oldTab.deactivate(this.activeItem.index)
                this.activeItem.activate(oldTab.index)
            }
        }
    }
})
