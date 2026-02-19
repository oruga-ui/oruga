<script setup lang="ts">
import type { TreeOptions } from "@oruga-ui/oruga-next";

const options: TreeOptions<string> = [
    {
        label: "Documents",
        icon: "folder",
        options: [
            {
                label: "Work",
                value: "work",
                icon: "cog",
                options: [
                    {
                        label: "Expenses.doc",
                        value: "expenses",
                        icon: "file",
                    },
                    {
                        label: "Resume.doc",
                        value: "resume",
                        icon: "file",
                    },
                ],
            },
            {
                label: "Home",
                value: "home",
                icon: "home",
                options: [
                    {
                        label: "Invoices.txt",
                        value: "invoices",
                        icon: "file",
                    },
                ],
            },
        ],
    },
    {
        label: "Events",
        value: "events",
        icon: "calendar",
        options: [
            {
                label: "Meeting",
                value: "meeting",
                icon: "calendar-plus",
            },
            {
                label: "Product Launch",
                value: "product-launch",
                icon: "calendar-plus",
            },
            {
                label: "Report Review",
                value: "report-review",
                icon: "calendar-plus",
            },
        ],
    },
    {
        label: "Movies",
        value: "movies",
        icon: "star",
        options: [
            {
                label: "Al Pacino",
                value: "al-pacion",
                icon: "star",
                options: [
                    {
                        label: "Scarface",
                        value: "scarface",
                        icon: "video",
                    },
                    {
                        label: "Serpico",
                        value: "serpico",
                        icon: "video",
                    },
                ],
            },
            {
                label: "Robert De Niro",
                value: "robert-de-niro",
                icon: "star",
                options: [
                    {
                        label: "Goodfellas",
                        value: "goodfellas",
                        icon: "video",
                    },
                    {
                        label: "Untouchables",
                        value: "untouchables",
                        icon: "video",
                    },
                ],
            },
        ],
    },
];
</script>

<template>
    <section>
        <o-tree :options="options" />
    </section>
</template>
