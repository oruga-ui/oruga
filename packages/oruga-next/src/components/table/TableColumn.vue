<script lang="ts">
import { defineComponent } from 'vue'

import { toCssDimension } from '../../utils/helpers'

/**
 * @displayName Table Column
 */
export default defineComponent({
    name: 'OTableColumn',
    inject: ['$table'],
    props: {
        label: String,
        customKey: [String, Number],
        field: String,
        meta: [String, Number, Boolean, Function, Object, Array],
        width: [Number, String],
        numeric: Boolean,
        /**
         * Optional, position of column content
         * @values centered, right
         */
        position: {
            type: String,
            validator(value: string) {
                return [
                    'left',
                    'centered',
                    'right'
                ].indexOf(value) > -1
            }
        },
        searchable: Boolean,
        sortable: Boolean,
        visible: {
            type: Boolean,
            default: true
        },
        customSort: Function,
        customSearch: Function,
        sticky: Boolean,
        headerSelectable: Boolean,
        /** Adds native attributes to th :th-attrs="(column)" => ({})" */
        thAttrs: {
            type: Function,
            default: () => ({})
        },
        /** Adds native attributes to td :td-attrs="(row, column)" => ({})" */
        tdAttrs: {
            type: Function,
            default: () => ({})
        }
    },
    data() {
        return {
            newKey: undefined
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
        isHeaderUnselectable() {
            return !this.headerSelectable && this.sortable
        }
    },
    created() {
        if (!this.$table) {
            throw new Error('You should wrap oTableColumn on a oTable')
        }
        this.newKey = (this.$table as any)._nextSequence()
        this.$table._addColumn(this)
    },
    beforeDestroy() {
        this.$table._removeColumn(this)
    },
    render() {
        // renderless
        return this.$createElement('span', { domProps: { 'data-id': this.newKey } }, this.label)
    }
})
</script>
