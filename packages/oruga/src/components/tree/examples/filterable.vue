<script setup lang="ts">
const options = [
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
        ],
    },
];
</script>

<template>
    <section>
        <o-field label="Filterable Tree">
            <o-tree
                :options="options"
                filterable
                filter-placeholder="Search files"
                empty-label="No matching items" />
        </o-field>
    </section>
</template>
