<script setup lang="ts">
import { ref } from "vue";

const selected = ref([]);
</script>

<template>
    <section>
        <o-field label="Multiple">
            <o-select v-model="selected" multiple native-size="8">
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
                <option value="vane">Vane</option>
                <option value="billy">Billy</option>
                <option value="jack">Jack</option>
                <option value="heisenberg">Heisenberg</option>
                <option value="jesse">Jesse</option>
                <option value="saul">Saul</option>
                <option value="mike">Mike</option>
            </o-select>
        </o-field>

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
