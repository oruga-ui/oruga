<script setup lang="ts">
import { ref } from "vue";

const checkbox = ref(false);
const checkboxCustom = ref("Yes");
</script>

<template>
    <section>
        <o-field>
            <o-checkbox label="Basic" />
        </o-field>
        <o-field>
            <o-checkbox v-model="checkbox">
                {{ checkbox }}
            </o-checkbox>
        </o-field>
        <o-field>
            <o-checkbox
                v-model="checkboxCustom"
                true-value="Yes"
                false-value="No">
                {{ checkboxCustom }}
            </o-checkbox>
        </o-field>
        <o-field>
            <o-checkbox :indeterminate="true"> Indeterminate </o-checkbox>
        </o-field>
        <o-field>
            <o-checkbox label="Disabled" disabled />
        </o-field>
        <o-field>
            <o-checkbox label="Required" required />
        </o-field>
    </section>
</template>
