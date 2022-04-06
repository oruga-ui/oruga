---
title: Datetimepicker
---

# Datetimepicker

> An input with a simple dropdown/modal for selecting a date and time, uses native datetimepicker for mobile

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga-next/src/components/datetimepicker/examples/Datetimepicker.md" class="docgen-edit-link">edit on github</a>

## Examples

::: demo
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

:::

### Footer slot

::: demo
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
</style>

:::

### Inline

::: demo
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

:::

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_datetimepicker.scss)

<br />

<br />
<br />

## Props

| Prop name          | Description                                                 | Type           | Values                                            | Default                                                                                                                                  |
| ------------------ | ----------------------------------------------------------- | -------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| appendToBody       |                                                             | boolean        | -                                                 |                                                                                                                                          |
| autocomplete       | Native options to use in HTML5 validation                   | string         | -                                                 |                                                                                                                                          |
| datepicker         |                                                             | object         | -                                                 |                                                                                                                                          |
| datetimeCreator    |                                                             | func           | -                                                 | Default function (see source code)                                                                                                       |
| datetimeFormatter  |                                                             | func           | -                                                 |                                                                                                                                          |
| datetimeParser     |                                                             | func           | -                                                 |                                                                                                                                          |
| disabled           |                                                             | boolean        | -                                                 |                                                                                                                                          |
| editable           |                                                             | boolean        | -                                                 | false                                                                                                                                    |
| expanded           | Makes input full width when inside a grouped or addon field | boolean        | -                                                 |                                                                                                                                          |
| icon               | Icon name to be added                                       | string         | -                                                 |                                                                                                                                          |
| iconPack           | Icon pack to use                                            | string         | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                          |
| iconRight          |                                                             | string         | -                                                 |                                                                                                                                          |
| iconRightClickable |                                                             | boolean        | -                                                 |                                                                                                                                          |
| inline             |                                                             | boolean        | -                                                 |                                                                                                                                          |
| locale             |                                                             | string\|array  | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; locale: undefined<br>}</code>          |
| maxDatetime        |                                                             | date           | -                                                 |                                                                                                                                          |
| maxlength          | Same as native maxlength, plus character counter            | number\|string | -                                                 |                                                                                                                                          |
| minDatetime        |                                                             | date           | -                                                 |                                                                                                                                          |
| mobileNative       |                                                             | boolean        | -                                                 | true                                                                                                                                     |
| modelValue         |                                                             | date           | -                                                 |                                                                                                                                          |
| openOnFocus        |                                                             | boolean        | -                                                 |                                                                                                                                          |
| override           |                                                             | boolean        | -                                                 |                                                                                                                                          |
| placeholder        |                                                             | string         | -                                                 |                                                                                                                                          |
| position           |                                                             | string         | -                                                 |                                                                                                                                          |
| rounded            | Makes the element rounded                                   | boolean        | -                                                 |                                                                                                                                          |
| statusIcon         | Show status icon using field and variant prop               | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>         |
| timepicker         |                                                             | object         | -                                                 |                                                                                                                                          |
| useHtml5Validation | Enable html 5 native validation                             | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code> |
| validationMessage  | The message which is shown when a validation error occurs   | string         | -                                                 |                                                                                                                                          |

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| active-change     |            |
| icon-right-click  |            |
| change-month      |            |
| change-year       |            |
| blur              |            |
| focus             |            |
| update:modelValue |            |

## Slots

| Name   | Description | Bindings |
| ------ | ----------- | -------- |
| footer |             |          |
