<template>
    <div :class="rootClass">
        <div>
            <slot />
        </div>
        <div>
            <div v-if="paginated">
                <o-pagination
                    :icon-pack="iconPack"
                    :total="total"
                    :per-page="perPage"
                    :simple="paginationSimple"
                    :size="paginationSize"
                    :current="newCurrentPage"
                    :rounded="rounded"
                    @change="pageChanged"
                    :aria-next-label="ariaNextLabel"
                    :aria-previous-label="ariaPreviousLabel"
                    :aria-page-label="ariaPageLabel"
                    :aria-current-label="ariaCurrentLabel" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Pagination from '../pagination/Pagination.vue'

export default defineComponent({
    name: 'OTablePagination',
    components: {
        [Pagination.name]: Pagination
    },
    emits: ['update:currentPage', 'page-change'],
    props: {
        paginated: Boolean,
        total: Number,
        perPage: Number,
        currentPage: Number,
        paginationSimple: Boolean,
        paginationSize: String,
        rounded: Boolean,
        iconPack: String,
        rootClass: [String, Array, Object],
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String
    },
    data() {
        return {
            newCurrentPage: this.currentPage
        }
    },
    watch: {
        currentPage(newVal) {
            this.newCurrentPage = newVal
        }
    },
    methods: {
        /**
        * Paginator change listener.
        */
        pageChanged(page) {
            this.newCurrentPage = page > 0 ? page : 1
            this.$emit('update:currentPage', this.newCurrentPage)
            this.$emit('page-change', this.newCurrentPage)
        }
    }
})
</script>
