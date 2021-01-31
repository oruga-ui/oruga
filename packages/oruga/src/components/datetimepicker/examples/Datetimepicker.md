
## Examples

::: demo
```html
<template>
    <section>
        <o-field grouped group-multiline>
            <div class="control">
                <o-switch v-model="showWeekNumber">Show week number</o-switch>
            </div>
            <div class="control">
                <o-switch v-model="enableSeconds">Enable seconds</o-switch>
            </div>
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

<script>
export default {
    data() {
        return {
            showWeekNumber: false,
            enableSeconds: false,
            hourFormat: undefined, // Browser locale
            locale: undefined // Browser locale
        }
    }
}
</script>
```
:::

### Footer slot

::: demo
```html
<template>
    <o-field label="Select datetime">
        <o-datetimepicker v-model="datetime"
            placeholder="Click to select...">
            <div class="buttons-footer">
                <o-button variant="primary"
                    @click="datetime = new Date()">
                    <o-icon icon="calendar"></o-icon>
                    <span>Today</span>
                </o-button>
                <o-button variant="danger"
                    @click="datetime = null">
                    <o-icon icon="times"></o-icon>
                    <span>Clear</span>
                </o-button>
            </div>
        </o-datetimepicker>
    </o-field>
</template>

<script>
    export default {
        data() {
            return {
                datetime: new Date()
            }
        }
    }
</script>

<style>
.buttons-footer {
    margin-top: 1rem;
}
```
:::

### Inline


::: demo
```html
<template>
    <o-datetimepicker v-model="datetime" inline></o-datetimepicker>
</template>

<script>
    export default {
        data() {
            return {
                datetime: new Date()
            }
        }
    }
</script>
```
:::
