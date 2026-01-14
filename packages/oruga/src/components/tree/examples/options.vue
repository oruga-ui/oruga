<script setup lang="ts">
import type { OptionsGroupProp } from "@oruga-ui/oruga-next";

const options: OptionsGroupProp = [
    {
        label: "Documents",
        attrs: {
            icon: "folder",
        },
        options: [
            {
                label: "Work",
                value: "work",
                attrs: {
                    icon: "cog",
                    options: [
                        {
                            label: "Expenses.doc",
                            value: "expenses",
                            attrs: {
                                icon: "file",
                            },
                        },
                        {
                            label: "Resume.doc",
                            value: "resume",
                            attrs: {
                                icon: "file",
                            },
                        },
                    ],
                },
            },
            {
                label: "Home",
                value: "home",
                attrs: {
                    icon: "home",
                    options: [
                        {
                            label: "Invoices.txt",
                            value: "invoices",
                            attrs: {
                                icon: "file",
                            },
                        },
                    ],
                },
            },
        ],
    },
    {
        label: "Events",
        value: "events",
        attrs: {
            icon: "calendar",
        },
        options: [
            {
                label: "Meeting",
                value: "meeting",
                attrs: {
                    icon: "calendar-plus",
                },
            },
            {
                label: "Product Launch",
                value: "product-launch",
                attrs: {
                    icon: "calendar-plus",
                },
            },
            {
                label: "Report Review",
                value: "report-review",
                attrs: {
                    icon: "calendar-plus",
                },
            },
        ],
    },
    {
        label: "Movies",
        value: "movies",
        attrs: {
            icon: "star",
        },
        options: [
            {
                label: "Al Pacino",
                value: "al-pacion",
                attrs: {
                    icon: "star",
                    options: [
                        {
                            label: "Scarface",
                            value: "scarface",
                            attrs: {
                                icon: "video",
                            },
                        },
                        {
                            label: "Serpico",
                            value: "serpico",
                            attrs: {
                                icon: "video",
                            },
                        },
                    ],
                },
            },
            {
                label: "Robert De Niro",
                value: "robert-de-niro",
                attrs: {
                    icon: "star",
                    options: [
                        {
                            label: "Goodfellas",
                            value: "goodfellas",
                            attrs: {
                                icon: "video",
                            },
                        },
                        {
                            label: "Untouchables",
                            value: "untouchables",
                            attrs: {
                                icon: "video",
                            },
                        },
                    ],
                },
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
