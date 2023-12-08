---
title: Datetimepicker
---

# Datetimepicker

<div class="vp-doc">

> An input with a simple dropdown/modal for selecting a date and time, uses native datetimepicker for mobile

<Carbon />
</div>

<div class="vp-example">
</div>
<div class="vp-example">
</div>

<div class="vp-doc">

## Datetimepicker component

> An input with a simple dropdown/modal for selecting a date and time, uses native datetimepicker for mobile

```html
<o-datetimepicker></o-datetimepicker>
```

### Props

| Prop name          | Description                                                                                                                                                                      | Type                      | Values                                            | Default                                                                                                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| active             | The active state of the dropdown, use v-model:active to make it two-way binding.                                                                                                 | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                          |
| datepicker         | Define props for the underlying datepicker component                                                                                                                             | DatepickerProps           | -                                                 |                                                                                                                                                                                      |
| datetimeCreator    | Date creator function, default is `new Date()`                                                                                                                                   | (date: Date) =&gt; Date   | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datetimepicker: {<br>&nbsp;&nbsp;datetimeCreator: (d: Date) => new Date(d), <br>}</code> |
| datetimeFormatter  | Custom function to format a date into a string                                                                                                                                   | (date: Date) =&gt; string | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datetimepicker: {<br>&nbsp;&nbsp;dateFormatter: defaultFunction<br>}</code>              |
| datetimeParser     | Custom function to parse a string into a date                                                                                                                                    | (date: string) =&gt; Date | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datetimepicker: {<br>&nbsp;&nbsp;dateParser: defaultFunction<br>}</code>                 |
| disabled           | Same as native disabled                                                                                                                                                          | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                          |
| expanded           |                                                                                                                                                                                  | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                          |
| icon               | Icon to be shown                                                                                                                                                                 | string                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datetimepicker: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>                             |
| iconPack           | Icon pack to use                                                                                                                                                                 | string                    | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datetimepicker: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>                         |
| iconRight          | Icon to be added on the right side                                                                                                                                               | string                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datetimepicker: {<br>&nbsp;&nbsp;iconRight: undefined<br>}</code>                        |
| iconRightClickable | Make the icon right clickable                                                                                                                                                    | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                          |
| inline             | Display datetimepicker inline                                                                                                                                                    | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                          |
| locale             | Date format locale                                                                                                                                                               | string                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;locale: undefined<br>}</code>                                           |
| maxDatetime        | Max date to select                                                                                                                                                               | date                      | -                                                 |                                                                                                                                                                                      |
| minDatetime        | Min date to select                                                                                                                                                               | date                      | -                                                 |                                                                                                                                                                                      |
| mobileNative       | Enable mobile native input if mobile agent                                                                                                                                       | boolean                   | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datetimepicker: {<br>&nbsp;&nbsp;mobileNative: true<br>}</code>                          |
| openOnFocus        | Open dropdown on focus                                                                                                                                                           | boolean                   | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datetimepicker: {<br>&nbsp;&nbsp;openOnFocus: true<br>}</code>                           |
| placeholder        | Input placeholder                                                                                                                                                                | string                    | -                                                 |                                                                                                                                                                                      |
| position           | Dropdown position                                                                                                                                                                | string                    | -                                                 |                                                                                                                                                                                      |
| readonly           | Same as native input readonly                                                                                                                                                    | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                          |
| rounded            | Makes the input rounded                                                                                                                                                          | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                          |
| size               | Size of the input control                                                                                                                                                        | string                    | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datetimepicker: {<br>&nbsp;&nbsp;size: undefined<br>}</code>                             |
| teleport           | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used. | boolean\|string\|object   | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datetimepicker: {<br>&nbsp;&nbsp;teleport: false<br>}</code>                             |
| timepicker         | Define props for the underlying timepicker component                                                                                                                             | TimepickerProps           | -                                                 |                                                                                                                                                                                      |
| useHtml5Validation | Enable html 5 native validation                                                                                                                                                  | boolean                   | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>                                    |
| v-model            |                                                                                                                                                                                  | date                      | -                                                 |                                                                                                                                                                                      |
| validationMessage  | The message which is shown when a validation error occurs                                                                                                                        | string                    | -                                                 |                                                                                                                                                                                      |

### Events

| Event name        | Properties                                           | Description                      |
| ----------------- | ---------------------------------------------------- | -------------------------------- |
| change-month      | **value** `number` - month number                    | on month change event            |
| change-year       | **value** `number` - year number                     | on year change event             |
| icon-click        | **event** `Event` - native event                     | on icon click event              |
| icon-right-click  | **event** `Event` - native event                     | on icon right click event        |
| update:modelValue | **value** `Date \| Date[]` - updated modelValue prop | modelValue prop two-way binding  |
| update:active     | **value** `boolean` - updated active prop            | active prop two-way binding      |
| range-start       | **value** `Date` - range start date                  | on range start is selected event |
| range-end         | **value** `Date` - range end date                    | on range end is selected event   |
| focus             | **event** `Event` - native event                     | on input focus event             |
| blur              | **event** `Event` - native event                     | on input blur event              |
| invalid           | **event** `Event` - native event                     | on input invalid event           |

### Slots

| Name   | Description                 | Bindings |
| ------ | --------------------------- | -------- |
| footer | Define an additional footer |          |

</div>

<div class="vp-doc">
</div>
