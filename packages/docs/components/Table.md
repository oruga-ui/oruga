---
title: Table
---

# Table

> Base component, contains and wrap all the other components.

---

## Demo

::: demo
<template>
<section>
        <o-field grouped group-multiline>
            <o-select v-model="defaultSortDirection">
                <option value="asc">Default sort direction: ASC</option>
                <option value="desc">Default sort direction: DESC</option>
            </o-select>
            <o-select v-model="perPage" :disabled="!isPaginated">
                <option value="5">5 per page</option>
                <option value="10">10 per page</option>
                <option value="15">15 per page</option>
                <option value="20">20 per page</option>
            </o-select>
            <div class="control">
                <o-button @click="currentPage = 2" :disabled="!isPaginated">Set page to 2</o-button>
            </div>
            <div class="control is-flex">
                <o-switch v-model="isPaginated">Paginated</o-switch>
            </div>
            <div class="control is-flex">
                <o-switch v-model="isPaginationSimple" :disabled="!isPaginated">Simple pagination</o-switch>
            </div>
            <o-select v-model="paginationPosition" :disabled="!isPaginated">
                <option value="bottom">bottom pagination</option>
                <option value="top">top pagination</option>
                <option value="both">both</option>
            </o-select>
            <o-select v-model="sortIcon">
                <option value="arrow-up">Arrow sort icon</option>
                <option value="menu-up">Caret sort icon</option>
                <option value="chevron-up">Chevron sort icon </option>
            </o-select>
            <o-select v-model="sortIconSize">
                <option value="small">Small sort icon</option>
                <option value="">Regular sort icon</option>
                <option value="medium">Medium sort icon</option>
                <option value="large">Large sort icon</option>
            </o-select>
        </o-field>
        <o-table
            :data="data"
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :pagination-simple="isPaginationSimple"
            :pagination-position="paginationPosition"
            :default-sort-direction="defaultSortDirection"
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize"
            default-sort="user.first_name"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">
                <o-table-column field="id" label="ID" width="40" sortable numeric v-slot="props">
                    {{ props.row.id }}
                </o-table-column>
                <o-table-column field="user.first_name" label="First Name" sortable v-slot="props">
                    {{ props.row.user.first_name }}
                </o-table-column>
                <o-table-column field="user.last_name" label="Last Name" sortable v-slot="props">
                    {{ props.row.user.last_name }}
                </o-table-column>
                <o-table-column field="date" label="Date" sortable centered v-slot="props">
                    <span class="tag is-success">
                        {{ new Date(props.row.date).toLocaleDateString() }}
                    </span>
                </o-table-column>
                <o-table-column label="Gender" v-slot="props">
                    <span>
                        <o-icon pack="fas"
                            :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
                        </o-icon>
                        {{ props.row.gender }}
                    </span>
                </o-table-column>
        </o-table>
    </section>
</template>

<script>
export default {
    data() {
        return {
            data: require('../data/sample.json'),
            isPaginated: true,
            isPaginationSimple: false,
            paginationPosition: 'bottom',
            defaultSortDirection: 'asc',
            sortIcon: 'arrow-up',
            sortIconSize: 'small',
            currentPage: 1,
            perPage: 5
        }
    }
}
</script>

:::

