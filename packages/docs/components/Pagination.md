# Pagination

<section class="odocs-head">

The **Pagination** component is responsive and flexible way to indicate a series of related content exists across multiple pages.

</section>

<section class="odocs-examples">

## Examples

<example-pagination />

</section>

<section class="odocs-specs">

## Pagination component

> A responsive and flexible pagination.

```html
<o-pagination></o-pagination>
```

### Props

| Prop name         | Description                                                         | Type                            | Values                                            | Default                                                                                                                                                                 |
| ----------------- | ------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaCurrentLabel  | Accessibility label for the current page button.                    | string                          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;ariaCurrentLabel: "Current page"<br>}</code>   |
| ariaNextLabel     | Accessibility label for the next page button.                       | string                          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;ariaNextLabel: "Next page"<br>}</code>         |
| ariaPageLabel     | Accessibility label for the page button.                            | string                          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;ariaPageLabel: "Page"<br>}</code>              |
| ariaPreviousLabel | Accessibility label for the previous page button.                   | string                          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;ariaPreviousLabel: "Previous page"<br>}</code> |
| buttonTag         | Pagination button tag name                                          | DynamicComponent                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;buttonTag: PlainButton<br>}</code>             |
| current           | Current page number, use v-model:current to make it two-way binding | number                          | -                                                 | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                                 |
| iconNext          | Icon to use for next button                                         | string                          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;iconNext: "chevron-right"<br>}</code>          |
| iconPack          | Icon pack to use                                                    | string                          | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>                |
| iconPrev          | Icon to use for previous button                                     | string                          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;iconPrev: "chevron-left"<br>}</code>           |
| mobileBreakpoint  | Mobile breakpoint as `max-width` value                              | string                          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code>        |
| order             | Buttons order                                                       | "centered" \| "left" \| "right" | `centered`, `right`, `left`                       | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;order: "right"<br>}</code>                     |
| override          | Override existing theme classes completely                          | boolean                         | -                                                 |                                                                                                                                                                         |
| perPage           | Items count for each page                                           | number \| string                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;perPage: 20<br>}</code>                        |
| rangeAfter        | Number of pagination items to show after current page               | number                          | -                                                 | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                                 |
| rangeBefore       | Number of pagination items to show before current page              | number                          | -                                                 | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                                 |
| rounded           | Enable rounded button style                                         | boolean                         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;rounded: false<br>}</code>                     |
| simple            | Enable simple style                                                 | boolean                         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;simple: false<br>}</code>                      |
| size              | Pagination size                                                     | string                          | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;size: undefined<br>}</code>                    |
| total             | Total count of items                                                | number                          | -                                                 |                                                                                                                                                                         |

### Events

| Event name     | Properties                                                                        | Description                  |
| -------------- | --------------------------------------------------------------------------------- | ---------------------------- |
| update:current | **value** `number` - updated current prop                                         | current prop two-way binding |
| change         | **value** `number` - current value                                                | on current change event      |
| next           | **event** `Event` - native click event<br/>**value** `number` - new current value | on next button event click   |
| previous       | **event** `Event` - native click event<br/>**value** `number` - new current value | on previous button event     |

### Slots

| Name     | Description            | Bindings                                                                                                                                                                                    |
| -------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| previous | Previous button slot   | **number** `number` - page number<br/>**isCurrent** `boolean` - if page is current<br/>**onClick** `(event: Event): void` - click handler<br/>**ariaLabel** `string` - aria-label attribute |
| next     | Next button slot       | **number** `number` - page number<br/>**isCurrent** `boolean` - if page is current<br/>**onClick** `(event: Event): void` - click handler<br/>**ariaLabel** `string` - aria-label attribute |
| default  | Pagination button slot | **number** `number` - page number<br/>**isCurrent** `boolean` - if page is current<br/>**onClick** `(event: Event): void` - click handler<br/>**ariaLabel** `string` - aria-label attribute |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-pagination-viewer />

</section>

<section class="odocs-style">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                               | Default                                      |
| ------------------------------------------- | -------------------------------------------- |
| $pagination-disabled-opacity                | var(--#{$prefix}base-disabled-opacity)       |
| $pagination-ellipsis-color                  | var(--#{$prefix}grey-light)                  |
| $pagination-button-border-color             | var(--#{$prefix}grey-light)                  |
| $pagination-button-border-radius            | var(--#{$prefix}base-border-radius)          |
| $pagination-button-border                   | 1px solid transparent                        |
| $pagination-button-color                    | var(--#{$prefix}black)                       |
| $pagination-button-background-color         | transparent                                  |
| $pagination-button-background-color-hover   | var( --#{$prefix}grey-lighter)               |
| $pagination-button-current-background-color | var(--#{$prefix}primary)                     |
| $pagination-button-current-border-color     | var(--#{$prefix}primary)                     |
| $pagination-button-current-color            | #fff                                         |
| $pagination-button-height                   | 2.25em                                       |
| $pagination-button-hover-border-color       | var(--#{$prefix}grey-light)                  |
| $pagination-button-line-height              | var(--#{$prefix}base-line-height)            |
| $pagination-button-margin                   | 0.25rem                                      |
| $pagination-button-min-width                | 2.25em                                       |
| $pagination-button-padding                  | 0.5em 0.5em                                  |
| $pagination-margin                          | -0.25rem                                     |
| $pagination-rounded-border-radius           | var( --#{$prefix}base-border-radius-rounded) |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_pagination.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable            | Default |
| ------------------------ | ------- |
| $pagination-items-spacer | 0.5rem  |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_pagination.scss)

</div>

</section>
