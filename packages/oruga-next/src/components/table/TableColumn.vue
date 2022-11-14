<script lang="ts">
import { defineComponent, h } from 'vue'

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
         * @values left, centered, right
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
        },
        subheading: String
    },
    data() {
        return {
            newKey: undefined,
            thAttrsData: {},
            tdAttrsData: []
        }
    },
    computed: {
        style() {
            return {
                width: toCssDimension(this.width)
            }
        },
        hasDefaultSlot() {
            return this.$slots.default
        },
        hasSearchableSlot() {
            return this.$slots.searchable
        },
        hasHeaderSlot() {
            return this.$slots.header
        },
        isHeaderUnselectable() {
            return !this.headerSelectable && this.sortable
        }
    },
    created() {
        if (!this.$table) {
            throw new Error('You should wrap oTableColumn on a oTable')
        }
        this.newKey = this.$table._nextSequence()
        this.$table._addColumn(this)
    },
    beforeMount() {
        if (typeof this.thAttrs !== 'undefined') {
            this.thAttrsData = this.thAttrs(this)
        }
    },
    beforeUnmount() {
        this.$table._removeColumn(this)
    },
    render() {
        // renderless
        return h('span', { 'data-id': this.newKey }, this.label)
    }
})
</script>
