<script setup lang="ts">
import { ref } from "vue";

const selected = ref(new Date());
const locale = ref(); // Browser locale
const openOnFocus = ref(true);
const stayOpen = ref(false);
const showWeekNumber = ref(false);
</script>

<template>
    <section>
        <o-field grouped>
            <o-field label="Locale">
                <o-select v-model="locale" placeholder="Locale">
                    <option :value="undefined"></option>
                    <option value="de-DE">de-DE</option>
                    <option value="en-CA">en-CA</option>
                    <option value="en-GB">en-GB</option>
                    <option value="en-US">en-US</option>
                    <option value="es-ES">es-ES</option>
                    <option value="es-MX">es-MX</option>
                    <option value="fr-CA">fr-CA</option>
                    <option value="fr-FR">fr-FR</option>
                    <option value="it-IT">it-IT</option>
                    <option value="ja-JP">ja-JP</option>
                    <option value="pt-BR">pt-BR</option>
                    <option value="ru-RU">ru-RU</option>
                </o-select>
            </o-field>
            <o-field label="Open on focus">
                <o-switch v-model="openOnFocus" />
            </o-field>
            <o-field label="Stay open">
                <o-switch v-model="stayOpen" />
            </o-field>
            <o-field label="Show week number">
                <o-switch v-model="showWeekNumber" />
            </o-field>
        </o-field>

        <o-field label="Select a date">
            <o-datepicker
                v-model="selected"
                placeholder="Click to select..."
                icon="calendar"
                :locale="locale"
                :stay-open="stayOpen"
                :open-on-focus="openOnFocus"
                :show-week-number="showWeekNumber" />
        </o-field>

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
