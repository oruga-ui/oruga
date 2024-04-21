<script setup>
import { ref } from "vue";

const selectedOptions = ref([]);
</script>

<template>
    <section>
        <p class="content"><b>selected</b>: {{ selectedOptions }}</p>
        <o-dropdown v-model="selectedOptions" multiple>
            <template #trigger>
                <o-button
                    variant="primary"
                    type="button"
                    icon-right="caret-down">
                    Selected ({{ selectedOptions.length }})
                </o-button>
            </template>

            <o-dropdown-item value="option1" label="Option 1" />
            <o-dropdown-item value="option2" label="Option 2" />
            <o-dropdown-item value="option3" label="Option 3" />
        </o-dropdown>
    </section>
</template>
