<script setup lang="ts">
import type { OptionsProp } from "@oruga-ui/oruga-next";

const options: OptionsProp = [
    {
        label: "Pictures",
        value: 0,
        attrs: {
            icon: "image",
        },
    },
    {
        label: "Music",
        value: 1,
        attrs: {
            icon: "music",
        },
    },
    {
        label: "Articles",
        value: 2,
        attrs: {
            icon: "pen",
        },
    },
    {
        label: "Words",
        value: 3,
    },
    {
        label: "Videos",
        value: 4,
        attrs: {
            icon: "video",
            disabled: true,
        },
    },
];
</script>

<template>
    <section>
        <o-tabs size="small" type="boxed" :options="options" />

        <o-tabs size="medium" type="boxed" :options="options" />

        <o-tabs size="large" type="boxed" :options="options" />
    </section>
</template>
