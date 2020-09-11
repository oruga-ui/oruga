<script>
import VueComponentMixin from '../../utils/VueComponentMixin'
import { toCssDimension } from '../../utils/helpers'

export default {
    name: 'OTableColumn',
    mixins: [VueComponentMixin],
    inject: {
        $table: { name: '$table', default: false }
    },
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
            newKey: this.customKey || this.label
        }
    },
    computed: {
        style() {
            return {
                width: toCssDimension(this.width)
            }
        },
        hasDefaultSlot() {
            return this.existsSlot('default', true)
        },
        hasSearchableSlot() {
            return this.existsSlot('searchable', true)
        },
        hasHeaderSlot() {
            return this.existsSlot('header', true)
        },
        hasSubheadingSlot() {
            return this.existsSlot('subheading', true)
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
            this.$destroy()
            throw new Error('You should wrap oTableColumn on a oTable')
        }
        this.$table.refreshSlots()
    },
    render() {
        // renderless
        return
    }
}
</script>
