import Icon from '../components/icon/Icon'
import SlotComponent from '../utils/SlotComponent'
import { default as ProviderParentMixin, Sorted } from './ProviderParentMixin'
import { mod } from './helpers'

export default (cmp) => ({
    mixins: [ProviderParentMixin(cmp, Sorted)],
    components: {
        [Icon.name]: Icon,
        [SlotComponent.name]: SlotComponent
    },
    props: {
        /** @model */
        value: [String, Number],
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
        return {
            activeId: this.value,
            contentHeight: 0,
            isTransitioning: false
        }
    },
    computed: {
        activeItem() {
            return this.activeId !== undefined && this.activeId !== null
                ? this.childItems.filter((i) => i.newValue === this.activeId)[0] : this.items[0]
        },
        activeIndex() {
            return this.childItems.findIndex((item => item.newValue === this.activeId))
        },
        items() {
            return this.sortedItems
        }
    },
    watch: {
        /**
         * When v-model is changed set the new active tab.
         */
        value(value) {
            if (this.activeId !== value) {
                this.performAction(value)
            }
        },
    },
    methods: {
        /**
        * Child click listener, emit input event and change active child.
        */
        childClick(child) {
            if (this.activeId !== child.newValue) {
                this.performAction(child.newValue)
                this.$emit('input', this.activeId)
            }
        },
        /**
         * Select the first 'viable' child, starting at startingIndex and in the direction specified
         * by the boolean parameter forward. In other words, first try to select the child at index 
         * startingIndex, and if it is not visible or it is disabled, then go to the index in the
         * specified direction until either returning to startIndex or finding a viable child item.
        */
        clickFirstViableChild(startingIndex, forward) {
            let direction = forward ? 1 : -1;
            let newIndex = startingIndex
            for(; newIndex !== this.activeIndex; newIndex = mod((newIndex + direction), this.childItems.length)) {
                // Break if the item at this index is viable (not disabled and is visible)
                if(this.childItems[newIndex].visible && !this.childItems[newIndex].disabled) {
                    break
                }
            }
            this.childClick(this.childItems[newIndex])
        },
        /**
         * Go to the next item or wrap around
        */
        next() {
            let newIndex = mod((this.activeIndex + 1), this.childItems.length)
            this.clickFirstViableChild(newIndex, true)
        },
        /**
         * Go to the previous item or wrap around
        */
        prev() {
            let newIndex = mod(this.activeIndex - 1, this.childItems.length )
            this.clickFirstViableChild(newIndex, false)
        },
        /**
         * Go to the first viable item
        */
        homePressed() {
            if (this.childItems.length < 1) {
                return
            }
            this.clickFirstViableChild(0, true)
        },
        /**
         * Go to the last viable item
        */
        endPressed() {
            if (this.childItems.length < 1) {
                return
            }
            this.clickFirstViableChild(this.childItems.length - 1, false)
        },
        /**
        * Activate next child and deactivate prev child
        */
        performAction(newId) {
            const oldValue = this.activeId
            const oldTab = oldValue !== undefined && oldValue !== null
                ? this.childItems.filter((i) => i.newValue === oldValue)[0] : this.items[0]
            this.activeId = newId
            if (oldTab && this.activeItem) {
                oldTab.deactivate(this.activeItem.index)
                this.activeItem.activate(oldTab.index)
            }
        }
    }
})
