<script setup lang="ts">
import type { DropdownOptions } from "@oruga-ui/oruga-next";

const options: DropdownOptions<string> = [
    {
        label: "Google",
        value: "google",
        href: "https://google.com",
        target: "_blank",
    },
    {
        label: "Yahoo",
        value: "yahoo",
        href: "https://yahoo.com",
        target: "_blank",
    },
    {
        label: "DuckDuckGo ",
        value: "duckduckgo",
        href: "https://duckduckgo.com",
        target: "_blank",
    },
    {
        label: "Bind",
        value: "bing",
        href: "https://bing.com",
        target: "_blank",
    },
];
</script>

<template>
    <section>
        <o-dropdown :options="options" aria-label="search engine menu">
            <template #trigger="{ active }">
                <o-button
                    variant="primary"
                    label="Open Menu!"
                    :icon-right="active ? 'caret-up' : 'caret-down'" />
            </template>
        </o-dropdown>
    </section>
</template>
