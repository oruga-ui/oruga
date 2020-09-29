import Icon from '../components/icon/Icon'
import SlotComponent from '../utils/SlotComponent'
import { default as ProviderParentMixin, Sorted } from './ProviderParentMixin'
import { bound } from './helpers'
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
        /** @model */
        modelValue: modelValueDef,
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
            activeId: this.modelValue, // Internal state
            defaultSlots: [],
            contentHeight: 0,
            isTransitioning: false
        }
    },
    computed: {
        activeItem() {
            return this.activeId === undefined ? this.items[0]
                : (this.activeId === null ? null
                    : this.childItems.filter((i) => i.newValue === this.activeId))[0]
        },
        items() {
            return this.sortedItems
        }
    },
    watch: {
        /**
         * When v-model is changed set the new active tab.
         */
        modelValue(value) {
            if (typeof value === 'number') {
                // Backward compatibility: converts the index value to an id
                value = bound(value, 0, this.items.length - 1)
                this.activeId = this.items[value].newValue
            } else {
                this.activeId = value
            }
        },
        /**
         * Sync internal state with external state
         */
        activeId(val, oldValue) {
            const oldTab = oldValue !== undefined && oldValue !== null
                ? this.childItems.filter((i) => i.newValue === oldValue)[0] : null

            if (oldTab && this.activeItem) {
                oldTab.deactivate(this.activeItem.index)
                this.activeItem.activate(oldTab.index)
            }

            val = this.activeItem
                ? (typeof this.modelValue === 'number' ? this.items.indexOf(this.activeItem) : this.activeItem.newValue)
                : undefined

            if (val !== this.value) {
                this.emitModelValue(val)
            }
        }
    },
    methods: {
        /**
        * Child click listener, emit input event and change active child.
        */
        childClick(child) {
            this.activeId = child.newValue
        }
    },
    mounted() {
        if (typeof this.modelValue === 'number') {
            // Backward compatibility: converts the index value to an id
            const value = bound(this.modelValue, 0, this.items.length - 1)
            this.activeId = this.items.length ? this.items[value].newValue : undefined
        } else {
            this.activeId = this.modelValue
        }
    }
})
