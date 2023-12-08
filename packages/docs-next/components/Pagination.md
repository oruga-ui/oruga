---
title: Pagination
---

# Pagination

<div class="vp-doc">

> A responsive and flexible pagination

<Carbon />
</div>

<div class="vp-example">
</div>
<div class="vp-example">
</div>

<div class="vp-doc">

## Pagination component

> A responsive and flexible pagination

```html
<o-pagination></o-pagination>
```

### Props

| Prop name         | Description                                                          | Type           | Values                                            | Default                                                                                                                                                                 |
| ----------------- | -------------------------------------------------------------------- | -------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaCurrentLabel  | Accessibility label for the current page button.                     | string         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;ariaCurrentLabel: "Current page"<br>}</code>   |
| ariaNextLabel     | Accessibility label for the next page button.                        | string         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;ariaNextLabel: "Next page"<br>}</code>         |
| ariaPageLabel     | Accessibility label for the page button.                             | string         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;ariaPageLabel: "page"<br>}</code>              |
| ariaPreviousLabel | Accessibility label for the previous page button.                    | string         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;ariaPreviousLabel: "Previous page"<br>}</code> |
| current           | Current page number, use v-model:current to make it two-way binding. | number         | -                                                 | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                                 |
| iconNext          | Icon to use for next button                                          | string         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;iconNext: "chevron-right"<br>}</code>          |
| iconPack          | Icon pack to use                                                     | string         | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>                |
| iconPrev          | Icon to use for previous button                                      | string         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;iconPrev: "chevron-left"<br>}</code>           |
| mobileBreakpoint  | Mobile breakpoint as max-width value                                 | string         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code>        |
| order             | Buttons order                                                        | string         | `centered`, `right`, `left`                       | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;order: "right"<br>}</code>                     |
| perPage           | Items count for each page                                            | number\|string | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;perPage: 20<br>}</code>                        |
| rangeAfter        | Number of pagination items to show after current page.               | number         | -                                                 | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                                 |
| rangeBefore       | Number of pagination items to show before current page.              | number         | -                                                 | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                                 |
| rounded           | Rounded button style                                                 | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;rounded: false<br>}</code>                     |
| simple            | Simple style                                                         | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;simple: false<br>}</code>                      |
| size              | Pagination size                                                      | string         | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;size: undefined<br>}</code>                    |
| total             | Total count of items                                                 | number         | -                                                 |                                                                                                                                                                         |

### Events

| Event name     | Properties                                | Description                  |
| -------------- | ----------------------------------------- | ---------------------------- |
| update:current | **value** `number` - updated current prop | current prop two-way binding |
| change         | **value** `number` - current value        | on current change event      |

### Slots

| Name     | Description            | Bindings                                                                                                                                                                                   |
| -------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| previous | Previous button slot   | **number** `number` - page number<br/>**isCurrent** `boolean` - if page is current<br/>**click** `(event:Event): void` - onClick handler<br/>**ariaLabel** `string` - aria-label attribute |
| next     | Next button slot       | **number** `number` - page number<br/>**isCurrent** `boolean` - if page is current<br/>**click** `(event:Event): void` - onClick handler<br/>**ariaLabel** `string` - aria-label attribute |
| default  | Pagination button slot | **number** `number` - page number<br/>**isCurrent** `boolean` - if page is current<br/>**click** `(event:Event): void` - onClick handler<br/>**ariaLabel** `string` - aria-label attribute |

</div>

<div class="vp-doc">
</div>
