---
title: Pagination
---

# Pagination

<div class="vp-doc">

> A responsive and flexible pagination

<Carbon />
</div>

<div class="vp-doc">

## Examples

  <example-pagination />
  
</div>
<div class="vp-doc">

## Class props

<inspector-pagination-viewer />

</div>

<div class="vp-doc">

## Pagination Component

### Props

| Prop name         | Description                                                         | Type    | Values                                            | Default                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------- | ------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaCurrentLabel  |                                                                     | string  | -                                                 |                                                                                                                                                     |
| ariaNextLabel     |                                                                     | string  | -                                                 |                                                                                                                                                     |
| ariaPageLabel     |                                                                     | string  | -                                                 |                                                                                                                                                     |
| ariaPreviousLabel |                                                                     | string  | -                                                 |                                                                                                                                                     |
| current           | Current page number, use v-model:current to make it two-way binding | number  | -                                                 | 1                                                                                                                                                   |
| iconNext          | Icon to use for next button                                         | string  | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> pagination: {<br>&nbsp;&nbsp;iconNext: 'chevron-right'<br>}</code> |
| iconPack          | Icon pack to use                                                    | string  | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                                     |
| iconPrev          | Icon to use for previous button                                     | string  | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> pagination: {<br>&nbsp;&nbsp;iconPrev: 'chevron-left'<br>}</code>  |
| mobileBreakpoint  | Mobile breakpoint as max-width value                                | string  | -                                                 |                                                                                                                                                     |
| order             | Buttons order, optional                                             | string  | `centered`, `right`, `left`                       | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> pagination: {<br>&nbsp;&nbsp;order: 'right'<br>}</code>            |
| override          |                                                                     | boolean | -                                                 |                                                                                                                                                     |
| perPage           | Items count for each page                                           | number  | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> pagination: {<br>&nbsp;&nbsp;perPage: 20<br>}</code>               |
| rangeAfter        | Number of pagination items to show after current page               | number  | -                                                 | 1                                                                                                                                                   |
| rangeBefore       | Number of pagination items to show before current page              | number  | -                                                 | 1                                                                                                                                                   |
| rounded           | Rounded button styles                                               | boolean | -                                                 |                                                                                                                                                     |
| simple            | Simple style                                                        | boolean | -                                                 |                                                                                                                                                     |
| size              | Pagination size, optional                                           | string  | `small`, `medium`, `large`                        |                                                                                                                                                     |
| total             | Total count of items                                                | number  | -                                                 |                                                                                                                                                     |

## Events

| Event name     | Properties | Description |
| -------------- | ---------- | ----------- |
| update:active  |            |
| change         |            |
| update:current |            |

## Slots

| Name     | Description | Bindings   |
| -------- | ----------- | ---------- |
| previous |             | <br/><br/> |
| next     |             | <br/><br/> |
| default  |             | <br/><br/> |

</div>
<div class="vp-doc">

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $pagination-disabled-opacity | $base-disabled-opacity !default |
| $pagination-ellipsis-color | $grey-light !default |
| $pagination-link-border-color | $grey-lighter !default |
| $pagination-link-border-radius | $base-border-radius !default |
| $pagination-link-border | 1px solid transparent !default |
| $pagination-link-color | #363636 !default |
| $pagination-link-current-background-color | $primary !default |
| $pagination-link-current-border-color | $primary !default |
| // !!!$pagination-link-current-color | #fff !default |
| $pagination-link-height | 2.25em !default |
| $pagination-link-hover-border-color | $grey-light !default |
| $pagination-link-line-height | $base-line-height !default |
| $pagination-link-margin | .25rem !default |
| $pagination-link-min-width | 2.25em !default |
| $pagination-link-padding | .5em .5em !default |
| $pagination-margin | -.25rem !default |
| $pagination-rounded-border-radius | $base-rounded-border-radius !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_pagination.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $pagination-disabled-opacity | $base-disabled-opacity !default |
| $pagination-ellipsis-color | $grey-light !default |
| $pagination-link-border-color | $grey-lighter !default |
| $pagination-link-border-radius | $base-border-radius !default |
| $pagination-link-border | 1px solid transparent !default |
| $pagination-link-color | #363636 !default |
| $pagination-link-current-background-color | $primary !default |
| $pagination-link-current-border-color | $primary !default |
| // !!!$pagination-link-current-color | #fff !default |
| $pagination-link-height | 2.25em !default |
| $pagination-link-hover-border-color | $grey-light !default |
| $pagination-link-line-height | $base-line-height !default |
| $pagination-link-margin | .25rem !default |
| $pagination-link-min-width | 2.25em !default |
| $pagination-link-padding | .5em .5em !default |
| $pagination-margin | -.25rem !default |
| $pagination-rounded-border-radius | $base-rounded-border-radius !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_pagination.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $pagination-items-spacer | 0.5rem !default |

📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_pagination.scss)

</div>

</div>
