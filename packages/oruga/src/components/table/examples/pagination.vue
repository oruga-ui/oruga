<script setup>
import { ref } from "vue";

const data = ref([
    {
        id: 1,
        user: { first_name: "Jesse", last_name: "Simmons" },
        date: "2016/10/15 13:43:27",
        gender: "Male",
    },
    {
        id: 2,
        user: { first_name: "John", last_name: "Jacobs" },
        date: "2016/12/15 06:00:53",
        gender: "Male",
    },
    {
        id: 3,
        user: { first_name: "Tina", last_name: "Gilbert" },
        date: "2016/04/26 06:26:28",
        gender: "Female",
    },
    {
        id: 4,
        user: { first_name: "Clarence", last_name: "Flores" },
        date: "2016/04/10 10:28:46",
        gender: "Male",
    },
    {
        id: 5,
        user: { first_name: "Anne", last_name: "Lee" },
        date: "2016/12/06 14:38:38",
        gender: "Female",
    },
    {
        id: 6,
        user: { first_name: "Sara", last_name: "Armstrong" },
        date: "2016/09/23 18:50:04",
        gender: "Female",
    },
    {
        id: 7,
        user: { first_name: "Anthony", last_name: "Webb" },
        date: "2016/08/30 23:49:38",
        gender: "Male",
    },
    {
        id: 8,
        user: { first_name: "Andrew", last_name: "Greene" },
        date: "2016/11/20 14:57:47",
        gender: "Male",
    },
    {
        id: 9,
        user: { first_name: "Russell", last_name: "White" },
        date: "2016/07/13 09:29:49",
        gender: "Male",
    },
    {
        id: 10,
        user: { first_name: "Lori", last_name: "Hunter" },
        date: "2016/12/09 01:44:05",
        gender: "Female",
    },
    {
        id: 11,
        user: { first_name: "Ronald", last_name: "Wood" },
        date: "2016/12/04 02:23:48",
        gender: "Male",
    },
    {
        id: 12,
        user: { first_name: "Michael", last_name: "Harper" },
        date: "2016/07/27 13:28:15",
        gender: "Male",
    },
    {
        id: 13,
        user: { first_name: "George", last_name: "Dunn" },
        date: "2017/03/07 12:26:52",
        gender: "Male",
    },
    {
        id: 14,
        user: { first_name: "Eric", last_name: "Rogers" },
        date: "2016/06/07 05:41:52",
        gender: "Male",
    },
    {
        id: 15,
        user: { first_name: "Juan", last_name: "Meyer" },
        date: "2017/02/01 04:56:34",
        gender: "Male",
    },
    {
        id: 16,
        user: { first_name: "Silvia", last_name: "Rosa" },
        date: "2017/01/26 11:50:04",
        gender: "Female",
    },
    {
        id: 17,
        user: { first_name: "Lori", last_name: "Cunningham" },
        date: "2016/05/01 10:00:56",
        gender: "Female",
    },
    {
        id: 18,
        user: { first_name: "Charles", last_name: "Graham" },
        date: "2016/05/31 06:43:30",
        gender: "Male",
    },
    {
        id: 19,
        user: { first_name: "Henry", last_name: "Morrison" },
        date: "2016/09/27 16:15:44",
        gender: "Male",
    },
    {
        id: 20,
        user: { first_name: "Albert", last_name: "Mendoza" },
        date: "2016/08/08 05:29:24",
        gender: "Male",
    },
    {
        id: 21,
        user: { first_name: "Ruby", last_name: "Snyder" },
        date: "2017/04/01 12:04:39",
        gender: "Female",
    },
    {
        id: 22,
        user: { first_name: "Jesse", last_name: "Warren" },
        date: "2016/08/20 01:36:38",
        gender: "Male",
    },
    {
        id: 23,
        user: { first_name: "Carlos", last_name: "Ferguson" },
        date: "2016/05/31 10:40:29",
        gender: "Male",
    },
    {
        id: 24,
        user: { first_name: "Melissa", last_name: "Peters" },
        date: "2016/07/23 00:41:54",
        gender: "Female",
    },
    {
        id: 25,
        user: { first_name: "Arthur", last_name: "Garza" },
        date: "2017/03/11 14:11:37",
        gender: "Male",
    },
    {
        id: 26,
        user: { first_name: "Joe", last_name: "Berry" },
        date: "2016/07/09 15:16:56",
        gender: "Male",
    },
    {
        id: 27,
        user: { first_name: "Joseph", last_name: "Bishop" },
        date: "2016/10/04 19:44:54",
        gender: "Male",
    },
    {
        id: 28,
        user: { first_name: "Sarah", last_name: "Harper" },
        date: "2016/09/23 05:09:11",
        gender: "Female",
    },
    {
        id: 29,
        user: { first_name: "Christopher", last_name: "Fuller" },
        date: "2016/04/12 00:05:35",
        gender: "Male",
    },
]);

const isPaginated = ref(true);
const isPaginationSimple = ref(false);
const paginationPosition = ref("bottom");
const sortIcon = ref("arrow-up");
const sortIconSize = ref("small");
const defaultSortDirection = ref("asc");
const currentPage = ref(1);
const perPage = ref(3);
</script>

<template>
    <section>
        <o-field grouped group-multiline>
            <o-field>
                <o-switch v-model="isPaginated" label="Paginated" />
            </o-field>
            <o-field>
                <o-switch
                    v-model="isPaginationSimple"
                    :disabled="!isPaginated"
                    label="Simple pagination" />
            </o-field>
            <o-field>
                <o-select v-model="defaultSortDirection">
                    <option value="asc">Default sort direction: ASC</option>
                    <option value="desc">Default sort direction: DESC</option>
                </o-select>
            </o-field>
            <o-field>
                <o-select v-model="perPage" :disabled="!isPaginated">
                    <option value="3">3 per page</option>
                    <option value="5">5 per page</option>
                    <option value="10">10 per page</option>
                    <option value="15">15 per page</option>
                    <option value="20">20 per page</option>
                </o-select>
            </o-field>
            <o-field>
                <o-select v-model="paginationPosition" :disabled="!isPaginated">
                    <option value="bottom">bottom pagination</option>
                    <option value="top">top pagination</option>
                    <option value="both">both</option>
                </o-select>
            </o-field>
            <o-field>
                <o-select v-model="sortIcon">
                    <option value="arrow-up">Arrow sort icon</option>
                    <option value="caret-up">Caret sort icon</option>
                    <option value="chevron-up">Chevron sort icon</option>
                </o-select>
            </o-field>
            <o-field>
                <o-select v-model="sortIconSize">
                    <option value="small">Small sort icon</option>
                    <option value="">Regular sort icon</option>
                    <option value="medium">Medium sort icon</option>
                    <option value="large">Large sort icon</option>
                </o-select>
            </o-field>
            <o-field>
                <o-button
                    variant="info"
                    :disabled="!isPaginated"
                    label="Set page to 2"
                    @click="currentPage = 2" />
            </o-field>
        </o-field>

        <p><b>Page:</b> {{ currentPage }}</p>

        <o-table
            v-model:current-page="currentPage"
            :data="data"
            :paginated="isPaginated"
            :per-page="perPage"
            :pagination-simple="isPaginationSimple"
            :pagination-position="paginationPosition"
            :default-sort-direction="defaultSortDirection"
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize"
            default-sort="user.first_name">
            <o-table-column
                v-slot="{ row }"
                field="id"
                label="ID"
                width="40"
                sortable
                numeric>
                {{ row.id }}
            </o-table-column>

            <o-table-column
                v-slot="{ row }"
                field="user.first_name"
                label="First Name"
                sortable>
                {{ row.user.first_name }}
            </o-table-column>

            <o-table-column
                v-slot="{ row }"
                field="user.last_name"
                label="Last Name"
                sortable>
                {{ row.user.last_name }}
            </o-table-column>

            <o-table-column
                v-slot="{ row }"
                field="date"
                label="Date"
                sortable
                position="centered">
                {{ new Date(row.date).toLocaleDateString() }}
            </o-table-column>

            <o-table-column v-slot="{ row }" label="Gender">
                <o-icon
                    pack="fas"
                    :icon="row.gender === 'Male' ? 'mars' : 'venus'" />
                {{ row.gender }}
            </o-table-column>
        </o-table>
    </section>
</template>
