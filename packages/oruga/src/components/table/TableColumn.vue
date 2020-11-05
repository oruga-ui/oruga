<script>
import { toCssDimension } from '../../utils/helpers'

export default {
    name: 'OTableColumn',
    inject: ['$table'],
    props: {
        label: String,
        customKey: [String, Number],
        field: String,
        meta: [String, Number, Boolean, Function, Object, Array],
        width: [Number, String],
        numeric: Boolean,
        centered: Boolean,
        searchable: Boolean,
        sortable: Boolean,
        visible: {
            type: Boolean,
            default: true
        },
        subheading: [String, Number],
        customSort: Function,
        sticky: Boolean,
        headerSelectable: Boolean,
        headerClass: String,
        cellClass: String
    },
    data() {
        return {
            newKey: this.$table._nextSequence()
        }
    },
    computed: {
        style() {
            return {
                width: toCssDimension(this.width)
            }
        },
        hasDefaultSlot() {
            return this.$scopedSlots.default
        },
        hasSearchableSlot() {
            return this.$scopedSlots.searchable
        },
        hasHeaderSlot() {
            return this.$scopedSlots.header
        },
        hasSubheadingSlot() {
            return this.$scopedSlots.subheading
        },
        /**
         * Return if column header is un-selectable
         */
        isHeaderUnselectable() {
            return !this.headerSelectable && this.sortable
        }
    },
    created() {
        if (!this.$table) {
            throw new Error('You should wrap oTableColumn on a oTable')
        }
        this.$table._addColumn(this)
    },
    beforeDestroy() {
        this.$table._removeColumn(this)
    },
    render() {
        // renderless
        return this.$createElement('span', { domProps: { 'data-id': this.newKey } }, this.label)
    }
}
</script>
