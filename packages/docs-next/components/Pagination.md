---
title: Pagination
---

# Pagination

> A responsive and flexible pagination

> <CarbonAds />

---

## Examples

 <example-pagination />

## Class props

<br />

<inspector-pagination-viewer />

<br />
<br />

## Props

| Prop name         | Description                                                         | Type           | Values                                            | Default                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------- | -------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaCurrentLabel  |                                                                     | string         | -                                                 |                                                                                                                                                     |
| ariaNextLabel     |                                                                     | string         | -                                                 |                                                                                                                                                     |
| ariaPageLabel     |                                                                     | string         | -                                                 |                                                                                                                                                     |
| ariaPreviousLabel |                                                                     | string         | -                                                 |                                                                                                                                                     |
| current           | Current page number, use v-model:current to make it two-way binding | number\|string | -                                                 | 1                                                                                                                                                   |
| iconNext          | Icon to use for next button                                         | string         | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> pagination: {<br>&nbsp;&nbsp;iconNext: 'chevron-right'<br>}</code> |
| iconPack          | Icon pack to use                                                    | string         | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                                     |
| iconPrev          | Icon to use for previous button                                     | string         | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> pagination: {<br>&nbsp;&nbsp;iconPrev: 'chevron-left'<br>}</code>  |
| mobileBreakpoint  | Mobile breakpoint as max-width value                                | string         | -                                                 |                                                                                                                                                     |
| order             | Buttons order, optional                                             | string         | `centered`, `right`, `left`                       |                                                                                                                                                     |
| override          |                                                                     | boolean        | -                                                 |                                                                                                                                                     |
| perPage           | Items count for each page                                           | number\|string | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> pagination: {<br>&nbsp;&nbsp;perPage: 20<br>}</code>               |
| rangeAfter        | Number of pagination items to show after current page               | number\|string | -                                                 | 1                                                                                                                                                   |
| rangeBefore       | Number of pagination items to show before current page              | number\|string | -                                                 | 1                                                                                                                                                   |
| rounded           | Rounded button styles                                               | boolean        | -                                                 |                                                                                                                                                     |
| simple            | Simple style                                                        | boolean        | -                                                 |                                                                                                                                                     |
| size              | Pagination size, optional                                           | string         | `small`, `medium`, `large`                        |                                                                                                                                                     |
| total             | Total count of items                                                | number\|string | -                                                 |                                                                                                                                                     |

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

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/__pagination.scss.scss)

| CSS Variable                                     | SASS Variable                              | Default                      |
| ------------------------------------------------ | ------------------------------------------ | ---------------------------- |
| --oruga-pagination-disabled-opacity              | \$pagination-disabled-opacity              | \$base-disabled-opacity      |
| --oruga-pagination-ellipsis-color                | \$pagination-ellipsis-color                | \$grey-light                 |
| --oruga-pagination-link-border-color             | \$pagination-link-border-color             | \$grey-lighter               |
| --oruga-pagination-link-border-radius            | \$pagination-link-border-radius            | \$base-border-radius         |
| --oruga-pagination-link-border                   | \$pagination-link-border                   | 1px solid transparent        |
| --oruga-pagination-link-color                    | \$pagination-link-color                    | #363636                      |
| --oruga-pagination-link-current-background-color | \$pagination-link-current-background-color | \$primary                    |
| --oruga-pagination-link-current-border-color     | \$pagination-link-current-border-color     | \$primary // !!!             |
| --oruga-pagination-link-current-color            | \$pagination-link-current-color            | #fff                         |
| --oruga-pagination-link-height                   | \$pagination-link-height                   | 2.25em                       |
| --oruga-pagination-link-hover-border-color       | \$pagination-link-hover-border-color       | \$grey-light                 |
| --oruga-pagination-link-line-height              | \$pagination-link-line-height              | \$base-line-height           |
| --oruga-pagination-link-margin                   | \$pagination-link-margin                   | .25rem                       |
| --oruga-pagination-link-min-width                | \$pagination-link-min-width                | 2.25em                       |
| --oruga-pagination-link-padding                  | \$pagination-link-padding                  | .5em .5em                    |
| --oruga-pagination-margin                        | \$pagination-margin                        | -.25rem                      |
| --oruga-pagination-rounded-border-radius         | \$pagination-rounded-border-radius         | \$base-rounded-border-radius |
