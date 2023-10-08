---
title: Pagination
---

# Pagination

<div class="vp-doc">

> A responsive and flexible pagination

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-pagination />

</div>
<div class="vp-example">

## Class props

<inspector-pagination-viewer />

</div>

<div class="vp-doc">

## Pagination component

> A responsive and flexible pagination

```html
<o-pagination></o-pagination>
```

### Props

| Prop name         | Description                                                         | Type    | Values                                            | Default                                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------- | ------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaCurrentLabel  |                                                                     | string  | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                           |
| ariaNextLabel     |                                                                     | string  | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                           |
| ariaPageLabel     |                                                                     | string  | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                           |
| ariaPreviousLabel |                                                                     | string  | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                           |
| current           | Current page number, use v-model:current to make it two-way binding | number  | -                                                 | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                          |
| iconNext          | Icon to use for next button                                         | string  | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;iconNext: "chevron-right", <br>}</code> |
| iconPack          | Icon pack to use                                                    | string  | `mdi`, `fa`, `fas and any other custom icon pack` | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                           |
| iconPrev          | Icon to use for previous button                                     | string  | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;iconPrev: "chevron-left", <br>}</code>  |
| mobileBreakpoint  | Mobile breakpoint as max-width value                                | string  | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                           |
| order             | Buttons order, optional                                             | string  | `centered`, `right`, `left`                       | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;order: "right", <br>}</code>            |
| override          |                                                                     | boolean | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                           |
| perPage           | Items count for each page                                           | number  | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;perPage: 20<br>}</code>                 |
| rangeAfter        | Number of pagination items to show after current page               | number  | -                                                 | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                          |
| rangeBefore       | Number of pagination items to show before current page              | number  | -                                                 | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                          |
| rounded           | Rounded button styles                                               | boolean | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                           |
| simple            | Simple style                                                        | boolean | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                           |
| size              | Pagination size, optional                                           | string  | `small`, `medium`, `large`                        | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                           |
| total             | Total count of items                                                | number  | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                           |

### Events

| Event name     | Properties | Description |
| -------------- | ---------- | ----------- |
| update:active  |            |
| change         |            |
| update:current |            |

### Slots

| Name     | Description | Bindings   |
| -------- | ----------- | ---------- |
| previous |             | <br/><br/> |
| next     |             | <br/><br/> |
| default  |             | <br/><br/> |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                             | Default                     |
| ----------------------------------------- | --------------------------- |
| $pagination-disabled-opacity              | $base-disabled-opacity      |
| $pagination-ellipsis-color                | $grey-light                 |
| $pagination-link-border-color             | $grey-lighter               |
| $pagination-link-border-radius            | $base-border-radius         |
| $pagination-link-border                   | 1px solid transparent       |
| $pagination-link-color                    | #363636                     |
| $pagination-link-current-background-color | $primary                    |
| $pagination-link-current-border-color     | $primary                    |
| // !!!$pagination-link-current-color      | #fff                        |
| $pagination-link-height                   | 2.25em                      |
| $pagination-link-hover-border-color       | $grey-light                 |
| $pagination-link-line-height              | $base-line-height           |
| $pagination-link-margin                   | 0.25rem                     |
| $pagination-link-min-width                | 2.25em                      |
| $pagination-link-padding                  | 0.5em 0.5em                 |
| $pagination-margin                        | -0.25rem                    |
| $pagination-rounded-border-radius         | $base-rounded-border-radius |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_pagination.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                             | Default                     |
| ----------------------------------------- | --------------------------- |
| $pagination-disabled-opacity              | $base-disabled-opacity      |
| $pagination-ellipsis-color                | $grey-light                 |
| $pagination-link-border-color             | $grey-lighter               |
| $pagination-link-border-radius            | $base-border-radius         |
| $pagination-link-border                   | 1px solid transparent       |
| $pagination-link-color                    | #363636                     |
| $pagination-link-current-background-color | $primary                    |
| $pagination-link-current-border-color     | $primary                    |
| // !!!$pagination-link-current-color      | #fff                        |
| $pagination-link-height                   | 2.25em                      |
| $pagination-link-hover-border-color       | $grey-light                 |
| $pagination-link-line-height              | $base-line-height           |
| $pagination-link-margin                   | 0.25rem                     |
| $pagination-link-min-width                | 2.25em                      |
| $pagination-link-padding                  | 0.5em 0.5em                 |
| $pagination-margin                        | -0.25rem                    |
| $pagination-rounded-border-radius         | $base-rounded-border-radius |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_pagination.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable            | Default |
| ------------------------ | ------- |
| $pagination-items-spacer | 0.5rem  |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_pagination.scss)

</div>

</div>
