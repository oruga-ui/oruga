# Datetimepicker

<div class="vp-doc">

The **Datetimepicker** input component allow users to select a date and time based on their browser’s locale from a customizable calendar, and type the date directly into the input with full internationalization support.
The input opens a simple dropdown/modal for selecting a date, and uses the native datetimepicker for mobile.
The component is based on the Datepicker component.

</div>

<div class="vp-example">

## Examples

<example-datetimepicker />

</div>

<div class="vp-example">

## Class props

<inspector-datetimepicker-viewer />

</div>

<div class="vp-doc">

## Datetimepicker component

> An input with a simple dropdown/modal for selecting a date and time, uses native datetimepicker for mobile.

```html
<o-datetimepicker></o-datetimepicker>
```

### Props

| Prop name          | Description                                                                                                                                                                      | Type                                                                                                             | Values                                                                                           | Default                                                                                                                                                             |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active             | The active state of the dropdown, use v-model:active to make it two-way binding                                                                                                  | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| creator            | Date creator function, default is `new Date()`                                                                                                                                   | (() =&gt; Date)                                                                                                  | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datetimepicker: {<br>&nbsp;&nbsp;datetimeCreator: undefined<br>}</code> |
| customValidity     | Custom HTML 5 validation error to set on the form control                                                                                                                        | string \| ((currentValue: Date \| null , state: ValidityState) =&gt; string) \| undefined                        | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                                            |
| datepicker         | Define props for the underlying datepicker component                                                                                                                             | DatepickerProps                                                                                                  | -                                                                                                |                                                                                                                                                                     |
| disabled           | Same as native disabled                                                                                                                                                          | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| expanded           | Makes input full width when inside a grouped or addon field                                                                                                                      | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| formatter          | Custom function to format a date into a string                                                                                                                                   | ((date: Date ) =&gt; string) \| undefined                                                                        | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datetimepicker: {<br>&nbsp;&nbsp;dateFormatter: undefined<br>}</code>   |
| icon               | Icon to be shown                                                                                                                                                                 | string                                                                                                           | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datetimepicker: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>            |
| iconPack           | Icon pack to use                                                                                                                                                                 | string                                                                                                           | `mdi`, `fa`, `fas and any other custom icon pack`                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datetimepicker: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>        |
| iconRight          | Icon to be added on the right side                                                                                                                                               | string                                                                                                           | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datetimepicker: {<br>&nbsp;&nbsp;iconRight: undefined<br>}</code>       |
| iconRightClickable | Make the icon right clickable                                                                                                                                                    | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| inline             | Display datetimepicker inline                                                                                                                                                    | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| locale             | Date format locale                                                                                                                                                               | string                                                                                                           | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;locale: undefined<br>}</code>                          |
| maxDatetime        | Max date to select                                                                                                                                                               | Date                                                                                                             | -                                                                                                |                                                                                                                                                                     |
| minDatetime        | Min date to select                                                                                                                                                               | Date                                                                                                             | -                                                                                                |                                                                                                                                                                     |
| mobileNative       | Enable mobile native input if mobile agent                                                                                                                                       | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datetimepicker: {<br>&nbsp;&nbsp;mobileNative: true<br>}</code>         |
| v-model            | The input value state                                                                                                                                                            | Date                                                                                                             | -                                                                                                |                                                                                                                                                                     |
| openOnFocus        | Open dropdown on focus                                                                                                                                                           | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datetimepicker: {<br>&nbsp;&nbsp;openOnFocus: true<br>}</code>          |
| override           | Override existing theme classes completely                                                                                                                                       | boolean                                                                                                          | -                                                                                                |                                                                                                                                                                     |
| parser             | Custom function to parse a string into a date                                                                                                                                    | ((date: string) =&gt; Date ) \| undefined                                                                        | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datetimepicker: {<br>&nbsp;&nbsp;dateParser: undefined<br>}</code>      |
| placeholder        | Input placeholder                                                                                                                                                                | string                                                                                                           | -                                                                                                |                                                                                                                                                                     |
| position           | Position of the dropdown relative to the input                                                                                                                                   | "auto" \| "bottom-left" \| "bottom-right" \| "bottom" \| "left" \| "right" \| "top-left" \| "top-right" \| "top" | `auto`, `top`, `bottom`, `left`, `right`, `top-right`, `top-left`, `bottom-left`, `bottom-right` |                                                                                                                                                                     |
| readonly           | Same as native input readonly                                                                                                                                                    | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| rounded            | Makes the input rounded                                                                                                                                                          | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                         |
| size               | Size of the input control                                                                                                                                                        | string                                                                                                           | `small`, `medium`, `large`                                                                       | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datetimepicker: {<br>&nbsp;&nbsp;size: undefined<br>}</code>            |
| teleport           | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used. | boolean \| object \| string                                                                                      | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datetimepicker: {<br>&nbsp;&nbsp;teleport: false<br>}</code>            |
| timepicker         | Define props for the underlying timepicker component                                                                                                                             | TimepickerProps                                                                                                  | -                                                                                                |                                                                                                                                                                     |
| useHtml5Validation | Enable HTML 5 native validation                                                                                                                                                  | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>                   |

### Events

| Event name         | Properties                                 | Description                      |
| ------------------ | ------------------------------------------ | -------------------------------- |
| change-month       | **value** `number` - month number          | on month change event            |
| change-year        | **value** `number` - year number           | on year change event             |
| icon-click         | **event** `Event` - native event           | on icon click event              |
| icon-right-click   | **event** `Event` - native event           | on icon right click event        |
| update:model-value | **value** `Date` - updated modelValue prop | modelValue prop two-way binding  |
| update:active      | **value** `boolean` - updated active prop  | active prop two-way binding      |
| range-start        | **value** `Date` - range start date        | on range start is selected event |
| range-end          | **value** `Date` - range end date          | on range end is selected event   |
| focus              | **event** `Event` - native event           | on input focus event             |
| blur               | **event** `Event` - native event           | on input blur event              |
| invalid            | **event** `Event` - native event           | on input invalid event           |

### Slots

| Name   | Description                 | Bindings |
| ------ | --------------------------- | -------- |
| footer | Define an additional footer |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable | Default |
| ------------- | ------- |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_datetimepicker.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</div>
