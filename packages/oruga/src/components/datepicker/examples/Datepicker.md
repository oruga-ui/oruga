## Examples

::: demo
```html
<template>
    <section>
        <o-field grouped group-multiline>
            <o-field>
               <o-switch v-model="showWeekNumber">Show week number</o-switch>
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
                </o-select>
            </o-field>
        </o-field>
        <o-field label="Select a date">
            <o-datepicker
                v-model="selected"
                :show-week-number="showWeekNumber"
                :locale="locale"
                placeholder="Click to select..."
                icon="calendar"
                trap-focus>
            </o-datepicker>
        </o-field>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                selected: new Date(),
                showWeekNumber: false,
                locale: undefined // Browser locale
            }
        }
    }
</script>
```
:::
