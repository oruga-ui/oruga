---
title: Timepicker
---

# Timepicker

> An input with a simple dropdown/modal for selecting a time, uses native timepicker for mobile

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/timepicker/examples/Timepicker.md" class="docgen-edit-link">edit on github</a>

## Examples

::: demo

```html
<template>
  <section>
    <o-field grouped group-multiline>
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
    <o-field label="Select time">
      <o-timepicker rounded placeholder="Click to select..." icon="clock" :enable-seconds="enableSeconds" :hour-format="hourFormat" :locale="locale"> </o-timepicker>
    </o-field>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        hourFormat: undefined, // Browser locale
        enableSeconds: false,
        locale: undefined // Browser locale
      }
    }
  }
</script>
```

:::

### Min/Max date

::: demo

```html
<template>
  <o-field label="Select time">
    <o-timepicker placeholder="Click to select..." :min-time="minTime" :max-time="maxTime"> </o-timepicker>
  </o-field>
</template>

<script>
  export default {
    data() {
      const min = new Date()
      min.setHours(9)
      min.setMinutes(0)
      const max = new Date()
      max.setHours(18)
      max.setMinutes(0)
      return {
        minTime: min,
        maxTime: max
      }
    }
  }
</script>
```

:::

### Footer

::: demo

```html
<template>
  <o-field label="Select time">
    <o-timepicker v-model="time" placeholder="Click to select...">
      <o-button label="Now" variant="primary" icon-left="clock" @click="time = new Date()" />
      <o-button label="Clear" variant="danger" icon-left="times" outlined @click="time = null" />
    </o-timepicker>
  </o-field>
</template>

<script>
  export default {
    data() {
      return {
        time: new Date()
      }
    }
  }
</script>
```

:::

### Granularity

::: demo

```html
<template>
  <o-field label="Select timepicker">
    <o-timepicker placeholder="Click to select" icon="clock" :incrementMinutes="minutesGranularity" :incrementHours="hoursGranularity"> </o-timepicker>
  </o-field>
</template>
<script>
  export default {
    data() {
      return {
        minutesGranularity: 15,
        hoursGranularity: 2
      }
    }
  }
</script>
```

:::

### Inline

::: demo

```html
<template>
  <o-timepicker v-model="time" inline></o-timepicker>
</template>

<script>
  export default {
    data() {
      return {
        time: new Date()
      }
    }
  }
</script>
```

:::

## Props

| Prop name             | Description                                                        | Type           | Values                                            | Default                                                                                                                                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------ | -------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appendToBody          |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| autocomplete          | Native options to use in HTML5 validation                          | string         | -                                                 |                                                                                                                                                                                                                                                         |
| defaultMinutes        |                                                                    | number         | -                                                 |                                                                                                                                                                                                                                                         |
| defaultSeconds        |                                                                    | number         | -                                                 |                                                                                                                                                                                                                                                         |
| disabled              |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| dropdownClasses       | Classes to apply on internal dropdown (@see o-dropdown style docs) | object         | -                                                 |                                                                                                                                                                                                                                                         |
| editable              |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| enableSeconds         |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| expanded              | Makes input full width when inside a grouped or addon field        | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| focusable             |                                                                    | boolean        | -                                                 | true                                                                                                                                                                                                                                                    |
| hourFormat            |                                                                    | string         | -                                                 |                                                                                                                                                                                                                                                         |
| icon                  | Icon name to be added                                              | string         | -                                                 |                                                                                                                                                                                                                                                         |
| iconPack              | Icon pack to use                                                   | string         | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                                                                                                                                         |
| incrementHours        |                                                                    | number         | -                                                 | 1                                                                                                                                                                                                                                                       |
| incrementMinutes      |                                                                    | number         | -                                                 | 1                                                                                                                                                                                                                                                       |
| incrementSeconds      |                                                                    | number         | -                                                 | 1                                                                                                                                                                                                                                                       |
| inline                |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| inputClasses          | Classes to apply on internal input (@see o-input style docs)       | object         | -                                                 |                                                                                                                                                                                                                                                         |
| maxTime               |                                                                    | date           | -                                                 |                                                                                                                                                                                                                                                         |
| maxlength             | Same as native maxlength, plus character counter                   | number\|string | -                                                 |                                                                                                                                                                                                                                                         |
| minTime               |                                                                    | date           | -                                                 |                                                                                                                                                                                                                                                         |
| mobileBreakpoint      | Mobile breakpoint as max-width value                               | string         | -                                                 |                                                                                                                                                                                                                                                         |
| mobileNative          |                                                                    | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> timepicker {<br>&nbsp;&nbsp;mobileNative: true<br>}</code>                                                                                                             |
| openOnFocus           |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| override              |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| placeholder           |                                                                    | string         | -                                                 |                                                                                                                                                                                                                                                         |
| position              |                                                                    | string         | -                                                 |                                                                                                                                                                                                                                                         |
| resetOnMeridianChange |                                                                    | boolean        | -                                                 | false                                                                                                                                                                                                                                                   |
| rounded               | Makes the element rounded                                          | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| statusIcon            | Show status icon using field and variant prop                      | boolean        | -                                                 | () => {<br> return getValueByPath(config, "statusIcon", true);<br>}                                                                                                                                                                                     |
| timeCreator           |                                                                    | func           | -                                                 | () => {<br> const timeCreator = getValueByPath(config, 'timepicker.timeCreator', undefined)<br> if (typeof timeCreator === 'function') {<br> return timeCreator()<br> } else {<br> return new Date()<br> }<br>}                                         |
| timeFormatter         |                                                                    | func           | -                                                 | (date, vm) => {<br> const timeFormatter = getValueByPath(config, 'timepicker.timeFormatter', undefined)<br> if (typeof timeFormatter === 'function') {<br> return timeFormatter(date)<br> } else {<br> return defaultTimeFormatter(date, vm)<br> }<br>} |
| timeParser            |                                                                    | func           | -                                                 | (date, vm) => {<br> const timeParser = getValueByPath(config, 'timepicker.timeParser', undefined)<br> if (typeof timeParser === 'function') {<br> return timeParser(date)<br> } else {<br> return defaultTimeParser(date, vm)<br> }<br>}                |
| unselectableTimes     |                                                                    | array          | -                                                 |                                                                                                                                                                                                                                                         |
| useHtml5Validation    | Enable html 5 native validation                                    | boolean        | -                                                 | () => {<br> return getValueByPath(config, "useHtml5Validation", true);<br>}                                                                                                                                                                             |
| validationMessage     | The message which is shown when a validation error occurs          | string         | -                                                 |                                                                                                                                                                                                                                                         |
| value                 |                                                                    | date           | -                                                 |                                                                                                                                                                                                                                                         |

## Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| blur       |            |
| focus      |            |
| input      |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| trigger |             |          |
| default |             |          |

## Style

| CSS Variable                                  | SASS Variable                           | Default                                               |
| --------------------------------------------- | --------------------------------------- | ----------------------------------------------------- |
| --oruga-timepicker-font-size                  | \$timepicker-font-size                  | \$base-font-size                                      |
| --oruga-timepicker-box-line-height            | \$timepicker-box-line-height            | \$base-line-height                                    |
| --oruga-timepicker-box-padding                | \$timepicker-box-padding                | .375rem 1rem                                          |
| --oruga-timepicker-footer-padding             | \$timepicker-footer-padding             | 0 .5rem                                               |
| --oruga-timepicker-footer-margin              | \$timepicker-footer-margin              | 0.875rem 0 0 0                                        |
| --oruga-timepicker-select-line-height         | \$timepicker-select-line-height         | \$base-line-height                                    |
| --oruga-timepicker-select-padding             | \$timepicker-select-padding             | $control-padding-vertical $control-padding-horizontal |
| --oruga-timepicker-select-color               | \$timepicker-select-color               | #363636                                               |
| --oruga-timepicker-select-font-weight         | \$timepicker-select-font-weight         | 600                                                   |
| --oruga-timepicker-select-placeholder-opacity | \$timepicker-select-placeholder-opacity | \$base-disabled-opacity                               |
| --oruga-timepicker-separator-font-weight      | \$timepicker-separator-font-weight      | 600                                                   |
