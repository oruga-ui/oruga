---
title: BDatetimepicker
---

# BDatetimepicker

---

## Props

| Prop name            | Description                                                 | Type           | Values                                            | Default                                                                                                                                                           |
| -------------------- | ----------------------------------------------------------- | -------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appendToBody         |                                                             | boolean        | -                                                 |                                                                                                                                                                   |
| autocomplete         | Native options to use in HTML5 validation                   | string         | -                                                 |                                                                                                                                                                   |
| datepicker           |                                                             | object         | -                                                 |                                                                                                                                                                   |
| datetimeCreator      |                                                             | func           | -                                                 | (date) => {<br> if (typeof config.defaultDatetimeCreator === 'function') {<br> return config.defaultDatetimeCreator(date)<br> } else {<br> return date<br> }<br>} |
| datetimeFormatter    |                                                             | func           | -                                                 |                                                                                                                                                                   |
| datetimeParser       |                                                             | func           | -                                                 |                                                                                                                                                                   |
| disabled             |                                                             | boolean        | -                                                 |                                                                                                                                                                   |
| editable             |                                                             | boolean        | -                                                 | false                                                                                                                                                             |
| expanded             | Makes input full width when inside a grouped or addon field | boolean        | -                                                 |                                                                                                                                                                   |
| focusable            |                                                             | boolean        | -                                                 | true                                                                                                                                                              |
| horizontalTimePicker |                                                             | boolean        | -                                                 |                                                                                                                                                                   |
| icon                 | Icon name to be added                                       | string         | -                                                 |                                                                                                                                                                   |
| iconPack             | Icon pack to use                                            | string         | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                                                   |
| inline               |                                                             | boolean        | -                                                 |                                                                                                                                                                   |
| maxDatetime          |                                                             | date           | -                                                 |                                                                                                                                                                   |
| maxlength            | Same as native maxlength, plus character counter            | number\|string | -                                                 |                                                                                                                                                                   |
| minDatetime          |                                                             | date           | -                                                 |                                                                                                                                                                   |
| mobileNative         |                                                             | boolean        | -                                                 | true                                                                                                                                                              |
| openOnFocus          |                                                             | boolean        | -                                                 |                                                                                                                                                                   |
| placeholder          |                                                             | string         | -                                                 |                                                                                                                                                                   |
| position             |                                                             | string         | -                                                 |                                                                                                                                                                   |
| rounded              | Makes the element rounded                                   | boolean        | -                                                 |                                                                                                                                                                   |
| statusIcon           | Show status icon using field and variant prop               | boolean        | -                                                 | () => {<br> return getValueByPath(config, "statusIcon", true);<br>}                                                                                               |
| timepicker           |                                                             | object         | -                                                 |                                                                                                                                                                   |
| tzOffset             |                                                             | number         | -                                                 | 0                                                                                                                                                                 |
| useHtml5Validation   | Enable html 5 native validation                             | boolean        | -                                                 | () => {<br> return getValueByPath(config, "useHtml5Validation", true);<br>}                                                                                       |
| validationMessage    | The message which is shown when a validation error occurs   | string         | -                                                 |                                                                                                                                                                   |
| value                |                                                             | date           | -                                                 |                                                                                                                                                                   |

## Events

| Event name   | Properties | Description |
| ------------ | ---------- | ----------- |
| change-month |            |
| change-year  |            |
| blur         |            |
| focus        |            |
| input        |            |

## Slots

| Name  | Description | Bindings |
| ----- | ----------- | -------- |
| left  |             |          |
| right |             |          |
