import Icon from '../components/icon/Icon'
import SlotComponent from '../utils/SlotComponent'
import { default as ProviderParentMixin, Sorted } from './ProviderParentMixin'
import { bound } from './helpers'

export default (cmp) => ({
    mixins: [ProviderParentMixin(cmp, Sorted)],
    components: {
        [Icon.name]: Icon,
        [SlotComponent.name]: SlotComponent
    },
    emits: ['update:modelValue'],
    model: {
        prop: 'modelValue',
        event: 'update:modelValue'
    },
    props: {
        /** @model */
        modelValue: {
            type: [String, Number],
            default: undefined
        },
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
    mounted() {
        /*
        if (typeof this.modelValue === 'number') {
            // Backward compatibility: converts the index value to an id
            const value = bound(this.modelValue, 0, this.items.length - 1)
            this.activeId = this.items[value].value
        } else {
            this.activeId = this.value
        }
        */
    },
    computed: {
        activeItem() {
            return this.activeId === undefined ? this.items[0]
                : (this.activeId === null ? null
                    : this.childItems.filter((i) => i.value === this.activeId))[0]
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
                this.activeId = this.items[value].value
            } else {
                this.activeId = value
            }
        },
        /**
         * Sync internal state with external state
         */
        activeId(val, oldValue) {
            const oldTab = oldValue !== undefined && oldValue !== null
                ? this.childItems.filter((i) => i.value === oldValue)[0] : null

            if (oldTab && this.activeItem) {
                oldTab.deactivate(this.activeItem.index)
                this.activeItem.activate(oldTab.index)
            }

            val = this.activeItem
                ? (typeof this.modelValue === 'number' ? this.items.indexOf(this.activeItem) : this.activeItem.value)
                : undefined

            if (val !== this.value) {
                this.$emit('update:modelValue', val)
            }
        }
    },
    methods: {
        /**
        * Child click listener, emit input event and change active child.
        */
        childClick(child) {
            this.activeId = child.value
        }
    }
})
