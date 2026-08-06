<script setup lang="ts">
import { ref } from "vue";
import type { AutocompleteOptions } from "@oruga-ui/oruga-next";

type Entity = {
    id: number;
    user: {
        first_name: string;
        last_name: string;
    };
    date: string;
    gender: string;
};

const options: AutocompleteOptions<Entity> = [
    {
        label: "Jesse Simmons",
        icon: "user",
        value: {
            id: 1,
            user: { first_name: "Jesse", last_name: "Simmons" },
            date: "2016/10/15 13:43:27",
            gender: "Male",
        },
    },
    {
        label: "John Jacobs",
        icon: "user",
        value: {
            id: 2,
            user: { first_name: "John", last_name: "Jacobs" },
            date: "2016/12/15 06:00:53",
            gender: "Male",
        },
    },
    {
        label: "Tina Gilbert",
        icon: "user",
        value: {
            id: 3,
            user: { first_name: "Tina", last_name: "Gilbert" },
            date: "2016/04/26 06:26:28",
            gender: "Female",
        },
    },
    {
        label: "Clarence Flores",
        icon: "user",
        value: {
            id: 4,
            user: { first_name: "Clarence", last_name: "Flores" },
            date: "2016/04/10 10:28:46",
            gender: "Male",
        },
    },
    {
        label: "Anne Lee",
        icon: "user",
        value: {
            id: 5,
            user: { first_name: "Anne", last_name: "Lee" },
            date: "2016/12/06 14:38:38",
            gender: "Female",
        },
    },
    {
        label: "Sara Armstrong",
        icon: "user",
        value: {
            id: 6,
            user: { first_name: "Sara", last_name: "Armstrong" },
            date: "2016/09/23 18:50:04",
            gender: "Female",
        },
    },
    {
        label: "Anthony Webb",
        icon: "user",
        value: {
            id: 7,
            user: { first_name: "Anthony", last_name: "Webb" },
            date: "2016/08/30 23:49:38",
            gender: "Male",
        },
    },
    {
        label: "Andrew Greene",
        icon: "user",
        value: {
            id: 8,
            user: { first_name: "Andrew", last_name: "Greene" },
            date: "2016/11/20 14:57:47",
            gender: "Male",
        },
    },
    {
        label: "Russell White",
        icon: "user",
        value: {
            id: 9,
            user: { first_name: "Russell", last_name: "White" },
            date: "2016/07/13 09:29:49",
            gender: "Male",
        },
    },
    {
        label: "Lori Hunter",
        icon: "user",
        value: {
            id: 10,
            user: { first_name: "Lori", last_name: "Hunter" },
            date: "2016/12/09 01:44:05",
            gender: "Female",
        },
    },
    {
        label: "Ronald Wood",
        icon: "user",
        value: {
            id: 11,
            user: { first_name: "Ronald", last_name: "Wood" },
            date: "2016/12/04 02:23:48",
            gender: "Male",
        },
    },
    {
        label: "Michael Harper",
        icon: "user",
        value: {
            id: 12,
            user: { first_name: "Michael", last_name: "Harper" },
            date: "2016/07/27 13:28:15",
            gender: "Male",
        },
    },
    {
        label: "George Dunn",
        icon: "user",
        value: {
            id: 13,
            user: { first_name: "George", last_name: "Dunn" },
            date: "2017/03/07 12:26:52",
            gender: "Male",
        },
    },
    {
        label: "Eric Rogers",
        icon: "user",
        value: {
            id: 14,
            user: { first_name: "Eric", last_name: "Rogers" },
            date: "2016/06/07 05:41:52",
            gender: "Male",
        },
    },
    {
        label: "Juan Meyer",
        icon: "user",
        value: {
            id: 15,
            user: { first_name: "Juan", last_name: "Meyer" },
            date: "2017/02/01 04:56:34",
            gender: "Male",
        },
    },
    {
        label: "Silvia Rosa",
        icon: "user",
        value: {
            id: 16,
            user: { first_name: "Silvia", last_name: "Rosa" },
            date: "2017/01/26 11:50:04",
            gender: "Female",
        },
    },
    {
        label: "Lori Cunningham",
        icon: "user",
        value: {
            id: 17,
            user: { first_name: "Lori", last_name: "Cunningham" },
            date: "2016/05/01 10:00:56",
            gender: "Female",
        },
    },
    {
        label: "Charle Graham",
        icon: "user",
        value: {
            id: 18,
            user: { first_name: "Charles", last_name: "Graham" },
            date: "2016/05/31 06:43:30",
            gender: "Male",
        },
    },
    {
        label: "Henry Morrison",
        icon: "user",
        value: {
            id: 19,
            user: { first_name: "Henry", last_name: "Morrison" },
            date: "2016/09/27 16:15:44",
            gender: "Male",
        },
    },
    {
        label: "Albert Mendoza",
        icon: "user",
        value: {
            id: 20,
            user: { first_name: "Albert", last_name: "Mendoza" },
            date: "2016/08/08 05:29:24",
            gender: "Male",
        },
    },
    {
        label: "Ruby Snyder",
        icon: "user",
        value: {
            id: 21,
            user: { first_name: "Ruby", last_name: "Snyder" },
            date: "2017/04/01 12:04:39",
            gender: "Female",
        },
    },
];

const selected = ref();
</script>

<template>
    <section>
        <o-autocomplete
            v-model="selected"
            :options="options"
            placeholder="Find a name..."
            open-on-focus>
        </o-autocomplete>

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
