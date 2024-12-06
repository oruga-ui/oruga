<script setup lang="ts">
import { ref } from "vue";

const selectedOption = ref();

const selectedOptions = ref([]);
</script>

<template>
    <section class="odocs-spaced">
        <o-field grouped>
            <o-field label="Single Selection">
                <o-dropdown
                    v-model:model-value="selectedOption"
                    selectable
                    stay-open
                    select-on-close>
                    <template #trigger="{ value }">
                        <o-button
                            variant="primary"
                            type="button"
                            icon-right="caret-down">
                            Selected ({{ value }})
                        </o-button>
                    </template>

                    <o-dropdown-item value="option1" label="Option 1" />
                    <o-dropdown-item value="option2" label="Option 2" />
                    <o-dropdown-item value="option3" label="Option 3" />
                </o-dropdown>

                <p><b>Selected:</b> {{ selectedOption }}</p>
            </o-field>

            <o-field label="Multiple Selection">
                <o-dropdown
                    v-model:model-value="selectedOptions"
                    selectable
                    multiple>
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

                <p><b>Selected:</b> {{ selectedOptions }}</p>
            </o-field>
        </o-field>
    </section>
</template>
