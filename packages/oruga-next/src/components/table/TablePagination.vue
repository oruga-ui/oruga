<template>
    <div :class="rootClass">
        <div>
            <slot />
        </div>
        <div>
            <o-pagination
                v-if="paginated"
                v-bind="$attrs"
                :current="newCurrentPage"
                @change="pageChanged"/>
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
        currentPage: Number,
        rootClass: [String, Array, Object],
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
