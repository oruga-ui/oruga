import { defineComponent } from 'vue'

import Icon from '../components/icon/Icon.vue'
import SlotComponent from './SlotComponent'
import { default as ProviderParentMixin, Sorted } from './ProviderParentMixin'

export default (cmp: string) => defineComponent({
    mixins: [ProviderParentMixin(cmp, Sorted)],
    components: {
        [Icon.name]: Icon,
        [SlotComponent.name]: SlotComponent
    },
    emits: ['update:modelValue'],
    props: {
        /** @model */
        modelValue: [String, Number],
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
            activeId: this.modelValue,
            contentHeight: 0,
            isTransitioning: false
        }
    },
    computed: {
        activeItem(): any {
            return this.activeId !== undefined && this.activeId !== null
                ? this.childItems.filter((i: any) => i.newValue === this.activeId)[0] : this.items[0]
        },
        items(): any[] {
            return this.sortedItems
        }
    },
    watch: {
        /**
         * When v-model is changed set the new active tab.
         */
        modelValue(value) {
            if (this.activeId !== value) {
                this.performAction(value)
            }
        }
    },
    methods: {
        /**
        * Child click listener, emit input event and change active child.
        */
        childClick(child: any) {
            if (this.activeId !== child.newValue) {
                this.performAction(child.newValue)
                this.$emit('update:modelValue', this.activeId)
            }
        },
        /**
        * Activate next child and deactivate prev child
        */
        performAction(newId: number) {
            const oldValue = this.activeId
            const oldTab = oldValue !== undefined && oldValue !== null
                ? this.childItems.filter((i: any) => i.newValue === oldValue)[0] : this.items[0]
            this.activeId = newId
            if (oldTab && this.activeItem) {
                oldTab.deactivate(this.activeItem.index)
                this.activeItem.activate(oldTab.index)
            }
        }
    }
})
