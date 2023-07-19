<script setup>
import { ref } from "vue";

const showWeekNumber = ref(false);
const enableSeconds = ref(false);
const hourFormat = ref(); // Browser locale
const locale = ref(); // Browser locale
</script>

<template>
    <section>
        <o-field grouped group-multiline>
            <o-field>
                <o-switch v-model="showWeekNumber">Show week number</o-switch>
            </o-field>
            <o-field>
                <o-switch v-model="enableSeconds">Enable seconds</o-switch>
            </o-field>
            <o-field label="Locale">
                <o-select v-model="locale">
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
                    <option value="zn-CN">zn-CN</option>
                </o-select>
            </o-field>
            <o-field label="Hour format">
                <o-select v-model="hourFormat">
                    <option :value="undefined"></option>
                    <option value="12">12</option>
                    <option value="24">24</option>
                </o-select>
            </o-field>
        </o-field>
        <o-field label="Select datetime">
            <o-datetimepicker
                rounded
                placeholder="Click to select..."
                icon="calendar"
                :locale="locale"
                :datepicker="{ showWeekNumber }"
                :timepicker="{ enableSeconds, hourFormat }">
            </o-datetimepicker>
        </o-field>
    </section>
</template>
