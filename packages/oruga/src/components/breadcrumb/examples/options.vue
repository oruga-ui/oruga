<script setup lang="ts">
import type { BreadcrumnOptions } from "@oruga-ui/oruga-next";

const options: BreadcrumnOptions = [
    {
        label: "Home",
        href: "/",
        disabled: true,
    },
    {
        label: "Docs",
    },
    {
        label: "Breadcrumb",
        active: true,
    },
];
</script>

<template>
    <section>
        <o-breadcrumb :options="options" />
    </section>
</template>
