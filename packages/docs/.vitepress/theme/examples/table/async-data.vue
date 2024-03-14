<script setup>
import { ref, onMounted } from "vue";

const data = ref([]);
const total = ref(0);
const loading = ref(false);
const sortField = ref("vote_count");
const sortOrder = ref("desc");
const defaultSortOrder = ref("desc");
const page = ref(1);
const perPage = ref(20);

const loadAsyncData = () => {
    const params = [
        "api_key=bb6f51bef07465653c3e553d6ab161a8",
        "language=en-US",
        "include_adult=false",
        "include_video=false",
        `sort_by=${sortField.value}.${sortOrder.value}`,
        `page=${page.value}`,
    ].join("&");
    loading.value = true;
    fetch(`https://api.themoviedb.org/3/discover/movie?${params}`)
        .then((response) => response.json())
        .then((result) => {
            // api.themoviedb.org manage max 1000 pages
            let currentTotal = result.total_results;
            if (result.total_results / perPage.value > 100)
                currentTotal = perPage.value * 100;

            total.value = currentTotal;
            data.value = result.results.map((item) => {
                item.release_date = item.release_date
                    ? item.release_date.replace(/-/g, "/")
                    : null;
                return item;
            });
            // cap results for usability
            if (data.value.length > 10) data.value = data.value.slice(0, 5);
            loading.value = false;
        })
        .catch((error) => {
            data.value = [];
            total.value = 0;
            loading.value = false;
            throw error;
        });
};

/*
 * Handle page-change event
 */
const onPageChange = (p) => {
    page.value = p;
    loadAsyncData();
};

/*
 * Handle sort event
 */
const onSort = (field, order) => {
    sortField.value = field;
    sortOrder.value = order;
    loadAsyncData();
};

/*
 * Type style in relation to the value
 */
const type = (value) => {
    const number = parseFloat(value);
    if (number < 6) {
        return "is-danger";
    } else if (number >= 6 && number < 8) {
        return "is-warning";
    } else if (number >= 8) {
        return "is-success";
    }
};

onMounted(() => {
    loadAsyncData();
});
</script>

<template>
    <section>
        <o-table
            :data="data"
            :loading="loading"
            paginated
            backend-pagination
            :total="total"
            :per-page="perPage"
            backend-sorting
            :default-sort-direction="defaultSortOrder"
            :default-sort="[sortField, sortOrder]"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
            @page-change="onPageChange"
            @sort="onSort">
            <o-table-column
                v-slot="props"
                field="original_title"
                label="Title"
                sortable>
                {{ props.row.original_title }}
            </o-table-column>
            <o-table-column
                v-slot="props"
                field="vote_average"
                label="Vote Average"
                numeric
                sortable>
                <span class="tag" :class="type(props.row.vote_average)">
                    {{ props.row.vote_average }}
                </span>
            </o-table-column>
            <o-table-column
                v-slot="props"
                field="vote_count"
                label="Vote Count"
                numeric
                sortable>
                {{ props.row.vote_count }}
            </o-table-column>
            <o-table-column
                v-slot="props"
                field="release_date"
                label="Release Date"
                sortable
                centered>
                {{
                    props.row.release_date
                        ? new Date(props.row.release_date).toLocaleDateString()
                        : "unknown"
                }}
            </o-table-column>
            <o-table-column v-slot="props" label="Overview" width="500">
                {{ props.row.overview }}
            </o-table-column>
        </o-table>
    </section>
</template>
