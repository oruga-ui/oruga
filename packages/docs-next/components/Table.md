---
title: Table
---

# Table

<div class="vp-doc">

> Tabulated data are sometimes needed, it's even better when it's responsive

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-table />

</div>
<div class="vp-example">

## Class props

<inspector-table-viewer />

</div>

<div class="vp-doc">

## Table component

> Tabulated data are sometimes needed, it's even better when it's responsive

```html
<o-table></o-table>
```

### Props

| Prop name             | Description                                                                                                               | Type           | Values                                                                          | Default                                                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaCurrentLabel      |                                                                                                                           | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| ariaNextLabel         |                                                                                                                           | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| ariaPageLabel         |                                                                                                                           | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| ariaPreviousLabel     |                                                                                                                           | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| backendFiltering      | Columns won't be filtered with Javascript, use with searchable prop to the columns to filter in your backend              | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| backendPagination     | Rows won't be paginated with Javascript, use with page-change event to paginate in your backend                           | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| backendSorting        | Columns won't be sorted with Javascript, use with sort event to sort in your backend                                      | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| bordered              | Border to all cells                                                                                                       | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| checkable             | Rows can be checked (multiple)                                                                                            | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| checkboxPosition      | Position of the checkbox (if checkable is true)                                                                           | string         | `left`, `right`                                                                 | <code style='white-space: nowrap; padding: 0;'>"left"</code>                                                                                                   |
| checkboxVariant       | Color of the checkbox when checkable, optional                                                                            | string         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                                |
| checkedRows           | Set which rows are checked, use v-model:checkedRows to make it two-way binding                                            | array          | -                                                                               | <code style='white-space: nowrap; padding: 0;'>[]</code>                                                                                                       |
| columns               | Table columns                                                                                                             | array          | -                                                                               | <code style='white-space: nowrap; padding: 0;'>[]</code>                                                                                                       |
| currentPage           | Current page of table data (if paginated), use v-model:currentPage to make it two-way binding                             | number         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                        |
| customDetailRow       | Custom style on details                                                                                                   | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| customIsChecked       | Custom method to verify if row is checked, works when is checkable. Useful for backend pagination                         | func           | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| customRowKey          | Use a unique key of your data Object for each row. Useful if your data prop has dynamic indices. (id recommended)         | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| data                  | Table data                                                                                                                | array          | -                                                                               | <code style='white-space: nowrap; padding: 0;'>[]</code>                                                                                                       |
| debounceSearch        | Filtering debounce time (in milliseconds)                                                                                 | number         | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| defaultSort           | Sets the default sort column and order — e.g. ['first_name', 'desc']                                                      | string\|array  | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| defaultSortDirection  | Sets the default sort column direction on the first click                                                                 | string         | `asc`, `desc`                                                                   | <code style='white-space: nowrap; padding: 0;'>"asc"</code>                                                                                                    |
| detailIcon            | Icon name of detail action                                                                                                | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>"chevron-right"</code>                                                                                          |
| detailKey             | Use a unique key of your data Object when use detailed or opened detailed. (id recommended)                               | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                                       |
| detailTransition      |                                                                                                                           | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                                       |
| detailed              | Allow row details                                                                                                         | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| draggable             | Allows rows to be draggable                                                                                               | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| draggableColumn       | Allows columns to be draggable                                                                                            | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| filtersEvent          | Add a native event to filter                                                                                              | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                                       |
| focusable             | Table can be focused and user can navigate with keyboard arrows (require selected) and rows are highlighted when hovering | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| hasDetailedVisible    | Controls the visibility of the trigger that toggles the detailed rows.                                                    | func           | -                                                                               | Default function (see source code)                                                                                                                             |
| headerCheckable       | Show check/uncheck all checkbox in table header when checkable                                                            | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                     |
| height                | Table fixed height                                                                                                        | number\|string | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| hoverable             | Rows are highlighted when hovering                                                                                        | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| iconPack              | Icon pack to use                                                                                                          | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| isRowCheckable        | Custom method to verify if a row is checkable, works when is checkable                                                    | func           | -                                                                               | Default function (see source code)                                                                                                                             |
| isRowSelectable       | Custom method to verify if a row is selectable, works when is selected.                                                   | func           | -                                                                               | Default function (see source code)                                                                                                                             |
| loading               | Loading state                                                                                                             | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| mobileBreakpoint      | Mobile breakpoint as max-width value                                                                                      | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| mobileCards           | Rows appears as cards on mobile (collapse rows)                                                                           | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;mobileCards: true<br>}</code>              |
| mobileSortPlaceholder | Text when nothing is selected                                                                                             | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| narrowed              | Makes the cells narrower                                                                                                  | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| openedDetailed        | Allow pre-defined opened details. Ideal to open details via vue-router. (A unique key is required; check detail-key prop) | array          | -                                                                               | <code style='white-space: nowrap; padding: 0;'>[]</code>                                                                                                       |
| override              |                                                                                                                           | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| paginated             | Adds pagination to the table                                                                                              | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| paginationOrder       | Pagination buttons order if paginated                                                                                     | string         | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| paginationPosition    | Pagination position (if paginated)                                                                                        | string         | `bottom`, `top`, `bot`                                                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;paginationPosition: "bottom", <br>}</code> |
| paginationRounded     | Rounded pagination if paginated                                                                                           | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| paginationSize        | Size of pagination if paginated                                                                                           | string         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;paginationSize: "small", <br>}</code>      |
| perPage               | How many rows per page (if paginated)                                                                                     | number\|string | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;perPage: 20<br>}</code>                    |
| rowClass              | Add a class to row based on the return                                                                                    | func           | -                                                                               | Default function (see source code)                                                                                                                             |
| scrollable            | Add a horizontal scrollbar when table is too wide                                                                         | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| selected              | Set which row is selected, use v-model:selected to make it two-way binding                                                | object         | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| showDetailIcon        | Allow chevron icon and column to be visible                                                                               | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                     |
| showHeader            | Show header                                                                                                               | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;showHeader: true<br>}</code>               |
| sortIcon              | Sets the header sorting icon                                                                                              | string         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;sortIcon: "arrow-up", <br>}</code>         |
| sortIconSize          | Sets the size of the sorting icon                                                                                         | string         | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;sortIconSize: "small", <br>}</code>        |
| stickyCheckbox        | Make the checkbox column sticky when checkable                                                                            | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| stickyHeader          | Show a sticky table header                                                                                                | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| striped               | Whether table is striped                                                                                                  | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| total                 | Total number of table data if backend-pagination is enabled                                                               | number\|string | -                                                                               | <code style='white-space: nowrap; padding: 0;'>0</code>                                                                                                        |

### Events

| Event name               | Properties                                                                                                           | Description |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- | ----------- |
| page-change              |                                                                                                                      |
| dblclick                 |                                                                                                                      |
| contextmenu              |                                                                                                                      |
| cell-click               |                                                                                                                      |
| click                    | **row** `Object` - clicked row<br/>**index** `number` - index of clicked row                                         |
| check                    | **newCheckedRows** `Array&lt;Object&gt;` - checked rows                                                              |
| check-all                |                                                                                                                      |
| update:checkedRows       |                                                                                                                      |
| select                   | **row** `Object` - selected row<br/>**selected** `Array&lt;Object&gt;` - selected rows                               |
| update:selected          |                                                                                                                      |
| filters-change           |                                                                                                                      |
| details-open             |                                                                                                                      |
| details-close            |                                                                                                                      |
| update:openedDetailed    |                                                                                                                      |
| mouseenter               |                                                                                                                      |
| mouseleave               |                                                                                                                      |
| sort                     | **field** `string` - column field<br/>**direction** `boolean` - 'asc' or 'desc'<br/>**event** `Event` - native event |
| sorting-priority-removed |                                                                                                                      |
| dragstart                |                                                                                                                      |
| dragend                  |                                                                                                                      |
| drop                     |                                                                                                                      |
| dragleave                |                                                                                                                      |
| dragover                 |                                                                                                                      |
| columndragstart          |                                                                                                                      |
| columndragend            |                                                                                                                      |
| columndrop               |                                                                                                                      |
| columndragleave          |                                                                                                                      |
| columndragover           |                                                                                                                      |
| update:currentPage       |                                                                                                                      |

### Slots

| Name        | Description | Bindings |
| ----------- | ----------- | -------- |
| default     |             |          |
| pagination  |             |          |
| top-left    |             |          |
| caption     |             |          |
| preheader   |             |          |
| detail      |             | <br/>    |
| empty       |             |          |
| footer      |             |          |
| loading     |             |          |
| bottom-left |             |          |

</div>

<div class="vp-doc">

## TableColumn component

```html
<o-table-column></o-table-column>
```

### Props

| Prop name        | Description                                                        | Type                                         | Values                      | Default                                                    |
| ---------------- | ------------------------------------------------------------------ | -------------------------------------------- | --------------------------- | ---------------------------------------------------------- |
| customKey        |                                                                    | string\|number                               | -                           | <code style='white-space: nowrap; padding: 0;'></code>     |
| customSearch     |                                                                    | func                                         | -                           | <code style='white-space: nowrap; padding: 0;'></code>     |
| customSort       |                                                                    | func                                         | -                           | <code style='white-space: nowrap; padding: 0;'></code>     |
| field            |                                                                    | string                                       | -                           | <code style='white-space: nowrap; padding: 0;'></code>     |
| headerSelectable |                                                                    | boolean                                      | -                           | <code style='white-space: nowrap; padding: 0;'></code>     |
| label            |                                                                    | string                                       | -                           | <code style='white-space: nowrap; padding: 0;'></code>     |
| meta             |                                                                    | string\|number\|boolean\|func\|object\|array | -                           | <code style='white-space: nowrap; padding: 0;'></code>     |
| numeric          |                                                                    | boolean                                      | -                           | <code style='white-space: nowrap; padding: 0;'></code>     |
| position         | Optional, position of column content                               | string                                       | `left`, `centered`, `right` | <code style='white-space: nowrap; padding: 0;'></code>     |
| searchable       |                                                                    | boolean                                      | -                           | <code style='white-space: nowrap; padding: 0;'></code>     |
| sortable         |                                                                    | boolean                                      | -                           | <code style='white-space: nowrap; padding: 0;'></code>     |
| sticky           |                                                                    | boolean                                      | -                           | <code style='white-space: nowrap; padding: 0;'></code>     |
| subheading       |                                                                    | string                                       | -                           | <code style='white-space: nowrap; padding: 0;'></code>     |
| tdAttrs          | Adds native attributes to td :td-attrs="(row, column)" =&gt; ({})" | func                                         | -                           | Default function (see source code)                         |
| thAttrs          | Adds native attributes to th :th-attrs="(column)" =&gt; ({})"      | func                                         | -                           | Default function (see source code)                         |
| visible          |                                                                    | boolean                                      | -                           | <code style='white-space: nowrap; padding: 0;'>true</code> |
| width            |                                                                    | number\|string                               | -                           | <code style='white-space: nowrap; padding: 0;'></code>     |

</div>

<div class="vp-doc">

</div>
<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                          | Default                                                  |
| -------------------------------------- | -------------------------------------------------------- |
| $table-background-color                | #fff                                                     |
| $table-background                      | #f5f5f5                                                  |
| $table-boder                           | 1px solid transparent                                    |
| $table-border-radius                   | $base-border-radius                                      |
| $table-card-box-shadow                 | 0 2px 3px rgba($black, 0.1), 0 0 0 1px rgba($black, 0.1) |
| $table-card-cell-font-weight           | 600                                                      |
| $table-card-cell-padding               | 0 0.5em 0 0                                              |
| $table-card-cell-text-align            | left                                                     |
| $table-card-detail-margin              | -1rem 0 0 0                                              |
| $table-card-margin                     | 0 0 1rem 0                                               |
| $table-color                           | black                                                    |
| $table-current-sort-border-color       | $grey                                                    |
| $table-current-sort-font-weight        | 700                                                      |
| $table-current-sort-hover-border-color | $grey                                                    |
| $table-detail-background               | #fafafa                                                  |
| $table-detail-box-shadow               | inset 0 1px 3px $grey                                    |
| $table-detail-chevron-color            | $primary                                                 |
| $table-detail-chevron-width            | 40px                                                     |
| $table-detail-padding                  | 1rem                                                     |
| $table-focus-border-color              | $primary                                                 |
| $table-focus-box-shadow                | 0 0 0 0.125em rgba($primary, 0.25)                       |
| $table-hoverable-background-color      | #fafafa                                                  |
| $table-narrow-padding                  | 0.25em 0.5em                                             |
| $table-row-active-background-color     | $primary                                                 |
| $table-row-active-color                | $primary-invert                                          |
| $table-sticky-header-height            | 300px                                                    |
| $table-sticky-zindex                   | 1                                                        |
| $table-striped-background-color        | #fafafa                                                  |
| $table-td-border                       | 1px solid $grey-lighter                                  |
| $table-td-padding                      | 0.5em 0.75em                                             |
| $table-th-border                       | 2px solid $grey-lighter                                  |
| $table-th-checkbox-width               | 40px                                                     |
| $table-th-color                        | #363636                                                  |
| $table-th-detail-width                 | 14px                                                     |
| $table-th-font-weight                  | 600                                                      |
| $table-th-padding                      | 0.5em 0.75em                                             |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_table.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                          | Default                                                  |
| -------------------------------------- | -------------------------------------------------------- |
| $table-background-color                | #fff                                                     |
| $table-background                      | #f5f5f5                                                  |
| $table-boder                           | 1px solid transparent                                    |
| $table-border-radius                   | $base-border-radius                                      |
| $table-card-box-shadow                 | 0 2px 3px rgba($black, 0.1), 0 0 0 1px rgba($black, 0.1) |
| $table-card-cell-font-weight           | 600                                                      |
| $table-card-cell-padding               | 0 0.5em 0 0                                              |
| $table-card-cell-text-align            | left                                                     |
| $table-card-detail-margin              | -1rem 0 0 0                                              |
| $table-card-margin                     | 0 0 1rem 0                                               |
| $table-color                           | black                                                    |
| $table-current-sort-border-color       | $grey                                                    |
| $table-current-sort-font-weight        | 700                                                      |
| $table-current-sort-hover-border-color | $grey                                                    |
| $table-detail-background               | #fafafa                                                  |
| $table-detail-box-shadow               | inset 0 1px 3px $grey                                    |
| $table-detail-chevron-color            | $primary                                                 |
| $table-detail-chevron-width            | 40px                                                     |
| $table-detail-padding                  | 1rem                                                     |
| $table-focus-border-color              | $primary                                                 |
| $table-focus-box-shadow                | 0 0 0 0.125em rgba($primary, 0.25)                       |
| $table-hoverable-background-color      | #fafafa                                                  |
| $table-narrow-padding                  | 0.25em 0.5em                                             |
| $table-row-active-background-color     | $primary                                                 |
| $table-row-active-color                | $primary-invert                                          |
| $table-sticky-header-height            | 300px                                                    |
| $table-sticky-zindex                   | 1                                                        |
| $table-striped-background-color        | #fafafa                                                  |
| $table-td-border                       | 1px solid $grey-lighter                                  |
| $table-td-padding                      | 0.5em 0.75em                                             |
| $table-th-border                       | 2px solid $grey-lighter                                  |
| $table-th-checkbox-width               | 40px                                                     |
| $table-th-color                        | #363636                                                  |
| $table-th-detail-width                 | 14px                                                     |
| $table-th-font-weight                  | 600                                                      |
| $table-th-padding                      | 0.5em 0.75em                                             |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_table.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                      | Default                       |
| ---------------------------------- | ----------------------------- |
| $table-head-bg                     | initial                       |
| $table-head-color                  | initial                       |
| $table-head-border-width           | var(--#{$prefix}border-width) |
| $table-sticky-zindex               | 1                             |
| $table-sticky-bg                   | initial                       |
| $table-sticky-color                | initial                       |
| $table-detail-padding              | 0.5rem 0.75rem                |
| $table-detail-bg                   | var(--#{$prefix}gray-light)   |
| $table-sortable-hover-border-color | var(--#{$prefix}secondary)    |
| $table-current-sort-bg             | var(--#{$prefix}gray-light)   |
| $table-focus-color                 | var(--#{$prefix}-info-rgb)    |
| $table-card-spacer                 | $spacer                       |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_table.scss)

</div>

</div>
