<script setup lang="ts">
import { ref } from "vue";
import type { OptionsProp, OptionsPropWithGroups } from "@oruga-ui/oruga-next";

const options: OptionsProp = [
    {
        label: "Jesse Simmons",
        value: {
            id: 1,
            user: { first_name: "Jesse", last_name: "Simmons" },
            date: "2016/10/15 13:43:27",
            gender: "Male",
        },
    },
    {
        label: "John Jacobs",
        value: {
            id: 2,
            user: { first_name: "John", last_name: "Jacobs" },
            date: "2016/12/15 06:00:53",
            gender: "Male",
        },
    },
    {
        label: "Tina Gilbert",
        value: {
            id: 3,
            user: { first_name: "Tina", last_name: "Gilbert" },
            date: "2016/04/26 06:26:28",
            gender: "Female",
        },
    },
    {
        label: "Clarence Flores",
        value: {
            id: 4,
            user: { first_name: "Clarence", last_name: "Flores" },
            date: "2016/04/10 10:28:46",
            gender: "Male",
        },
    },
    {
        label: "Anne Lee",
        value: {
            id: 5,
            user: { first_name: "Anne", last_name: "Lee" },
            date: "2016/12/06 14:38:38",
            gender: "Female",
        },
    },
    {
        label: "Sara Armstrong",
        value: {
            id: 6,
            user: { first_name: "Sara", last_name: "Armstrong" },
            date: "2016/09/23 18:50:04",
            gender: "Female",
        },
    },
    {
        label: "Anthony Webb",
        value: {
            id: 7,
            user: { first_name: "Anthony", last_name: "Webb" },
            date: "2016/08/30 23:49:38",
            gender: "Male",
        },
    },
    {
        label: "Andrew Greene",
        value: {
            id: 8,
            user: { first_name: "Andrew", last_name: "Greene" },
            date: "2016/11/20 14:57:47",
            gender: "Male",
        },
    },
    {
        label: "Russell White",
        value: {
            id: 9,
            user: { first_name: "Russell", last_name: "White" },
            date: "2016/07/13 09:29:49",
            gender: "Male",
        },
    },
    {
        label: "Lori Hunter",
        value: {
            id: 10,
            user: { first_name: "Lori", last_name: "Hunter" },
            date: "2016/12/09 01:44:05",
            gender: "Female",
        },
    },
    {
        label: "Ronald Wood",
        value: {
            id: 11,
            user: { first_name: "Ronald", last_name: "Wood" },
            date: "2016/12/04 02:23:48",
            gender: "Male",
        },
    },
    {
        label: "Michael Harper",
        value: {
            id: 12,
            user: { first_name: "Michael", last_name: "Harper" },
            date: "2016/07/27 13:28:15",
            gender: "Male",
        },
    },
    {
        label: "George Dunn",
        value: {
            id: 13,
            user: { first_name: "George", last_name: "Dunn" },
            date: "2017/03/07 12:26:52",
            gender: "Male",
        },
    },
    {
        label: "Eric Rogers",
        value: {
            id: 14,
            user: { first_name: "Eric", last_name: "Rogers" },
            date: "2016/06/07 05:41:52",
            gender: "Male",
        },
    },
    {
        label: "Juan Meyer",
        value: {
            id: 15,
            user: { first_name: "Juan", last_name: "Meyer" },
            date: "2017/02/01 04:56:34",
            gender: "Male",
        },
    },
    {
        label: "Silvia Rosa",
        value: {
            id: 16,
            user: { first_name: "Silvia", last_name: "Rosa" },
            date: "2017/01/26 11:50:04",
            gender: "Female",
        },
    },
    {
        label: "Lori Cunningham",
        value: {
            id: 17,
            user: { first_name: "Lori", last_name: "Cunningham" },
            date: "2016/05/01 10:00:56",
            gender: "Female",
        },
    },
    {
        label: "Charle Graham",
        value: {
            id: 18,
            user: { first_name: "Charles", last_name: "Graham" },
            date: "2016/05/31 06:43:30",
            gender: "Male",
        },
    },
    {
        label: "Henry Morrison",
        value: {
            id: 19,
            user: { first_name: "Henry", last_name: "Morrison" },
            date: "2016/09/27 16:15:44",
            gender: "Male",
        },
    },
    {
        label: "Albert Mendoza",
        value: {
            id: 20,
            user: { first_name: "Albert", last_name: "Mendoza" },
            date: "2016/08/08 05:29:24",
            gender: "Male",
        },
    },
    {
        label: "Ruby Snyder",
        value: {
            id: 21,
            user: { first_name: "Ruby", last_name: "Snyder" },
            date: "2017/04/01 12:04:39",
            gender: "Female",
        },
    },
];

const selected = ref(options[3].value);

const groupOptions: OptionsPropWithGroups<string> = [
    {
        label: "Black Sails",
        attrs: { disabled: true },
        options: [
            { label: "Flint", value: "flint" },
            { label: "Silver", value: "silver" },
            { label: "Vane", value: "vane" },
            { label: "Billy", value: "billy" },
            { label: "Jack", value: "silver", attrs: { disabled: true } },
        ],
    },
    {
        label: "Breaking Bad",
        attrs: { disabled: true },
        options: {
            heisenberg: "Heisenberg",
            jesse: "Jesse",
            saul: "Saul",
            mike: "Mike",
        },
    },
    {
        label: "Game of Thrones",
        attrs: { disabled: true },
        options: [
            "Tyrion Lannister",
            "Jamie Lannister",
            "Daenerys Targaryen",
            "Jon Snow",
        ],
    },
];

const groupSelected = ref();
</script>

<template>
    <section class="odocs-spaced">
        <o-field grouped>
            <o-field label="Find a name">
                <o-autocomplete
                    v-model="selected"
                    :options="options"
                    placeholder="e.g. Anne"
                    open-on-focus
                    selectable-header
                    selectable-footer>
                    <template #empty> No results found </template>
                    <template #header> Header </template>
                    <template #footer> Footer </template>
                </o-autocomplete>

                <p><b>Selected:</b> {{ selected }}</p>
            </o-field>

            <o-field label="Find a grouped name">
                <o-autocomplete
                    v-model="groupSelected"
                    :options="groupOptions"
                    open-on-focus>
                    <template #header>List Groups</template>
                </o-autocomplete>

                <p><b>Selected:</b> {{ groupSelected }}</p>
            </o-field>
        </o-field>
    </section>
</template>
