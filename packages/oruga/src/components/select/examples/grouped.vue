<script setup lang="ts">
import { ref } from "vue";

const selected = ref<string>("");
</script>

<template>
    <section>
        <o-field>
            <o-select
                v-model="selected"
                placeholder="Select a character"
                icon="user">
                <optgroup label="Black Sails">
                    <option value="flint">Flint</option>
                    <option value="silver">Silver</option>
                    <option value="vane">Vane</option>
                    <option value="billy">Billy</option>
                    <option value="jack">Jack</option>
                </optgroup>

                <optgroup label="Breaking Bad">
                    <option value="heisenberg">Heisenberg</option>
                    <option value="jesse">Jesse</option>
                    <option value="saul">Saul</option>
                    <option value="mike">Mike</option>
                </optgroup>

                <optgroup label="Game of Thrones">
                    <option value="tyrion-lannister">Tyrion Lannister</option>
                    <option value="jamie-lannister">Jamie Lannister</option>
                    <option value="daenerys-targaryen">
                        Daenerys Targaryen
                    </option>
                    <option value="jon-snow">Jon Snow</option>
                </optgroup>
            </o-select>
        </o-field>

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
