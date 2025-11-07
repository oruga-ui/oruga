# Pagination

<section class="odocs-head">

The **Pagination** component is responsive and flexible way to indicate a series of related content exists across multiple pages. It can be used to displays data in paged format and provides navigation between pages. The root element is a [HTML native nav element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) to indicate a navigation section.
The component uses the [Button](/components/Button) component for the navigation elements.

</section>

<section class="odocs-examples">

## Examples

<example-pagination />

</section>

<section class="odocs-specs">

## Pagination Component

> A responsive and flexible paginator navigation.

```html
<o-pagination></o-pagination>
```

### Props

| Prop name         | Description                                                                                                                                         | Type                            | Values                                            | Default                                                                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaCurrentLabel  | Accessibility label for the current page button.                                                                                                    | string                          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;ariaCurrentLabel: "Current page"<br>}</code>   |
| ariaNextLabel     | Accessibility label for the next page button.                                                                                                       | string                          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;ariaNextLabel: "Next page"<br>}</code>         |
| ariaPageLabel     | Accessibility label for the page button.                                                                                                            | string                          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;ariaPageLabel: "Page"<br>}</code>              |
| ariaPreviousLabel | Accessibility label for the previous page button.                                                                                                   | string                          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;ariaPreviousLabel: "Previous page"<br>}</code> |
| buttonTag         | Pagination button tag name                                                                                                                          | DynamicComponent                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;buttonTag: PlainButton<br>}</code>             |
| <s>current</s>    | <div><b>deprecated</b> - will be renamed to `modelValue`</div><div><s>Current page number, use v-model:current to make it two-way binding</s></div> | number                          | -                                                 | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                                 |
| disabled          | Buttons will be disabled                                                                                                                            | boolean                         | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                             |
| iconNext          | Icon to use for next button                                                                                                                         | string                          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;iconNext: "chevron-right"<br>}</code>          |
| iconPack          | Icon pack to use                                                                                                                                    | string                          | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>                |
| iconPrev          | Icon to use for previous button                                                                                                                     | string                          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;iconPrev: "chevron-left"<br>}</code>           |
| mobileBreakpoint  | Mobile breakpoint as `max-width` value                                                                                                              | string                          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code>        |
| <s>order</s>      | <div><b>deprecated</b> - will be renamed to `position`</div><div><s>Buttons order</s></div>                                                         | "centered" \| "left" \| "right" | `centered`, `right`, `left`                       | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;order: undefined<br>}</code>                   |
| override          | Override existing theme classes completely                                                                                                          | boolean                         | -                                                 |                                                                                                                                                                         |
| perPage           | Items count for each page                                                                                                                           | number \| string                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;perPage: 20<br>}</code>                        |
| position          | Buttons position order                                                                                                                              | "centered" \| "left" \| "right" | `centered`, `right`, `left`                       | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;position: "right"<br>}</code>                  |
| rangeAfter        | Number of pagination items to show after current page                                                                                               | number                          | -                                                 | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                                 |
| rangeBefore       | Number of pagination items to show before current page                                                                                              | number                          | -                                                 | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                                 |
| rounded           | Enable rounded button style                                                                                                                         | boolean                         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;rounded: false<br>}</code>                     |
| simple            | Enable simple style                                                                                                                                 | boolean                         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;simple: false<br>}</code>                      |
| size              | Pagination size                                                                                                                                     | string                          | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>pagination: {<br>&nbsp;&nbsp;size: undefined<br>}</code>                    |
| total             | Total count of items                                                                                                                                | number                          | -                                                 |                                                                                                                                                                         |

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

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                               | Default                                 |
| ------------------------------------------- | --------------------------------------- |
| $pagination-spacer                          | calc(0.5 \* h.useVar("control-spacer")) |
| $pagination-disabled-opacity                | h.useVar("control-disabled-opacity")    |
| $pagination-ellipsis-color                  | h.useVar("grey-light")                  |
| $pagination-button-color                    | h.useVar("font-color")                  |
| $pagination-button-font-size                | h.useVar("font-size")                   |
| $pagination-button-font-weight              | h.useVar("font-weight")                 |
| $pagination-button-line-height              | h.useVar("line-height")                 |
| $pagination-button-height                   | 2.25em                                  |
| $pagination-button-min-width                | $pagination-button-height               |
| $pagination-button-padding                  | h.useVar("control-spacer")              |
| $pagination-button-box-shadow               | none                                    |
| $pagination-button-border-width             | h.useVar("control-border-width")        |
| $pagination-button-border-color             | h.useVar("control-border-color")        |
| $pagination-button-border-style             | solid                                   |
| $pagination-button-border-radius            | h.useVar("border-radius")               |
| $pagination-button-border-radius-rounded    | h.useVar( "border-radius-rounded")      |
| $pagination-button-background-color         | h.useVar( "control-brackground-color")  |
| $pagination-button-hover-color              | $pagination-button-color                |
| $pagination-button-hover-background-color   | $pagination-button-background-color     |
| $pagination-button-hover-border-color       | $pagination-button-border-color         |
| $pagination-button-current-color            | h.useVar("white")                       |
| $pagination-button-current-background-color | h.useVar("primary")                     |
| $pagination-button-current-border-color     | h.useVar("primary")                     |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_pagination.scss)

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

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_pagination.scss)

</div>

</section>
