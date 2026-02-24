<script setup lang="ts">
import { ref } from "vue";

const selected = ref<string[]>([]);
</script>

<template>
    <section class="odocs-spaced">
        <o-field label="Select multiple cities">
            <o-listbox v-model="selected" multiple>
                <o-list-item label="New York" value="NY" />
                <o-list-item label="Rome" value="RM" />
                <o-list-item label="London" value="LDN" />
                <o-list-item label="Istanbul" value="IST" />
                <o-list-item label="Paris" value="PRS" />
            </o-listbox>
        </o-field>

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
