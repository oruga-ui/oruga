<script setup lang="ts">
import { ref } from "vue";

const selectedOption = ref();
</script>

<template>
    <section class="odocs-spaced">
        <o-dropdown
            v-model="selectedOption"
            inline
            selectable
            aria-label="inline example">
            <template #trigger>
                <o-button label="Inline" />
            </template>

            <o-dropdown-item :value="1" label="Action " />
            <o-dropdown-item :value="2" label="Another action " />
            <o-dropdown-item :value="3" label="Something else " />
        </o-dropdown>

        <p><b>Selected:</b> {{ selectedOption }}</p>
    </section>
</template>
