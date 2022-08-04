---
title: Table
---

# Table

> Tabulated data are sometimes needed, it's even better when it's responsive

---

## Examples

 <example-table />

## Class props

<br />

<inspector-table-viewer />

<br />
<br />

## Props

| Prop name             | Description                                                                                                               | Type           | Values                     | Default                                                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaCurrentLabel      |                                                                                                                           | string         | -                          |                                                                                                                                                   |
| ariaNextLabel         |                                                                                                                           | string         | -                          |                                                                                                                                                   |
| ariaPageLabel         |                                                                                                                           | string         | -                          |                                                                                                                                                   |
| ariaPreviousLabel     |                                                                                                                           | string         | -                          |                                                                                                                                                   |
| backendFiltering      | Columns won't be filtered with Javascript, use with searchable prop to the columns to filter in your backend              | boolean        | -                          |                                                                                                                                                   |
| backendPagination     | Rows won't be paginated with Javascript, use with page-change event to paginate in your backend                           | boolean        | -                          |                                                                                                                                                   |
| backendSorting        | Columns won't be sorted with Javascript, use with sort event to sort in your backend                                      | boolean        | -                          |                                                                                                                                                   |
| bordered              | Border to all cells                                                                                                       | boolean        | -                          |                                                                                                                                                   |
| checkable             | Rows can be checked (multiple), checked rows will have a .is-checked class if you want to style                           | boolean        | -                          |                                                                                                                                                   |
| checkboxPosition      | Position of the checkbox (if checkable is true)                                                                           | string         | `left`, `right`            | 'left'                                                                                                                                            |
| checkedRows           | Set which rows are checked, use v-model:checkedRows to make it two-way binding                                            | array          | -                          | []                                                                                                                                                |
| columns               | Table columns                                                                                                             | array          | -                          | []                                                                                                                                                |
| currentPage           | Current page of table data (if paginated), use v-model:currentPage to make it two-way binding                             | number         | -                          | 1                                                                                                                                                 |
| customDetailRow       | Custom style on details                                                                                                   | boolean        | -                          | false                                                                                                                                             |
| customIsChecked       | Custom method to verify if row is checked, works when is checkable. Useful for backend pagination                         | func           | -                          |                                                                                                                                                   |
| customRowKey          | Use a unique key of your data Object for each row. Useful if your data prop has dynamic indices. (id recommended)         | string         | -                          |                                                                                                                                                   |
| data                  | Table data                                                                                                                | array          | -                          | []                                                                                                                                                |
| debounceSearch        | Filtering debounce time (in milliseconds)                                                                                 | number         | -                          |                                                                                                                                                   |
| defaultSort           | Sets the default sort column and order — e.g. ['first_name', 'desc']                                                      | string\|array  | -                          |                                                                                                                                                   |
| defaultSortDirection  | Sets the default sort column direction on the first click                                                                 | string         | `asc`, `desc`              | 'asc'                                                                                                                                             |
| detailIcon            | Icon name of detail action                                                                                                | string         | -                          | 'chevron-right'                                                                                                                                   |
| detailKey             | Use a unique key of your data Object when use detailed or opened detailed. (id recommended)                               | string         | -                          | ''                                                                                                                                                |
| detailTransition      |                                                                                                                           | string         | -                          | ''                                                                                                                                                |
| detailed              | Allow row details                                                                                                         | boolean        | -                          |                                                                                                                                                   |
| draggable             | Allows rows to be draggable                                                                                               | boolean        | -                          | false                                                                                                                                             |
| draggableColumn       | Allows columns to be draggable                                                                                            | boolean        | -                          | false                                                                                                                                             |
| filtersEvent          | Add a native event to filter                                                                                              | string         | -                          | ''                                                                                                                                                |
| focusable             | Table can be focused and user can navigate with keyboard arrows (require selected) and rows are highlighted when hovering | boolean        | -                          |                                                                                                                                                   |
| hasDetailedVisible    | Controls the visibility of the trigger that toggles the detailed rows.                                                    | func           | -                          | Default function (see source code)                                                                                                                |
| headerCheckable       | Show check/uncheck all checkbox in table header when checkable                                                            | boolean        | -                          | true                                                                                                                                              |
| height                | Table fixed height                                                                                                        | number\|string | -                          |                                                                                                                                                   |
| hoverable             | Rows are highlighted when hovering                                                                                        | boolean        | -                          |                                                                                                                                                   |
| iconPack              | Icon pack to use                                                                                                          | string         | -                          |                                                                                                                                                   |
| isRowCheckable        | Custom method to verify if a row is checkable, works when is checkable                                                    | func           | -                          | Default function (see source code)                                                                                                                |
| isRowSelectable       | Custom method to verify if a row is selectable, works when is selected.                                                   | func           | -                          | Default function (see source code)                                                                                                                |
| loading               | Loading state                                                                                                             | boolean        | -                          |                                                                                                                                                   |
| mobileBreakpoint      | Mobile breakpoint as max-width value                                                                                      | string         | -                          |                                                                                                                                                   |
| mobileCards           | Rows appears as cards on mobile (collapse rows)                                                                           | boolean        | -                          | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> table: {<br>&nbsp;&nbsp;mobileCards: true<br>}</code>            |
| mobileSortPlaceholder | Text when nothing is selected                                                                                             | string         | -                          |                                                                                                                                                   |
| narrowed              | Makes the cells narrower                                                                                                  | boolean        | -                          |                                                                                                                                                   |
| openedDetailed        | Allow pre-defined opened details. Ideal to open details via vue-router. (A unique key is required; check detail-key prop) | array          | -                          | []                                                                                                                                                |
| override              |                                                                                                                           | boolean        | -                          |                                                                                                                                                   |
| paginated             | Adds pagination to the table                                                                                              | boolean        | -                          |                                                                                                                                                   |
| paginationPosition    | Pagination position (if paginated)                                                                                        | string         | `bottom`, `top`, `bot`     | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> table: {<br>&nbsp;&nbsp;paginationPosition: 'bottom'<br>}</code> |
| paginationRounded     | Rounded pagination if paginated                                                                                           | boolean        | -                          |                                                                                                                                                   |
| perPage               | How many rows per page (if paginated)                                                                                     | number\|string | -                          | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> table: {<br>&nbsp;&nbsp;perPage: 20<br>}</code>                  |
| rowClass              | Add a class to row based on the return                                                                                    | func           | -                          | Default function (see source code)                                                                                                                |
| scrollable            | Add a horizontal scrollbar when table is too wide                                                                         | boolean        | -                          |                                                                                                                                                   |
| selected              | Set which row is selected, use v-model:selected to make it two-way binding                                                | object         | -                          |                                                                                                                                                   |
| showDetailIcon        | Allow chevron icon and column to be visible                                                                               | boolean        | -                          | true                                                                                                                                              |
| showHeader            | Show header                                                                                                               | boolean        | -                          | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> table: {<br>&nbsp;&nbsp;showHeader: true<br>}</code>             |
| sortIcon              | Sets the header sorting icon                                                                                              | string         | -                          | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> table: {<br>&nbsp;&nbsp;sortIcon: 'arrow-up'<br>}</code>         |
| sortIconSize          | Sets the size of the sorting icon                                                                                         | string         | `small`, `medium`, `large` | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> table: {<br>&nbsp;&nbsp;sortIconSize: 'small'<br>}</code>        |
| stickyCheckbox        | Make the checkbox column sticky when checkable                                                                            | boolean        | -                          | false                                                                                                                                             |
| stickyHeader          | Show a sticky table header                                                                                                | boolean        | -                          |                                                                                                                                                   |
| striped               | Whether table is striped                                                                                                  | boolean        | -                          |                                                                                                                                                   |
| total                 | Total number of table data if backend-pagination is enabled                                                               | number\|string | -                          | 0                                                                                                                                                 |

### Events

| Event name               | Properties                                                                                                           | Description |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- | ----------- |
| page-change              |                                                                                                                      |
| dblclick                 |                                                                                                                      |
| contextmenu              |                                                                                                                      |
| cell-click               |                                                                                                                      |
| click                    | **row** `Object` - clicked row<br/>**index** `number` - index of clicked row                                         |
| check                    | **newCheckedRows** `Array<Object>` - checked rows                                                                    |
| check-all                |                                                                                                                      |
| update:checkedRows       |                                                                                                                      |
| select                   | **row** `Object` - selected row<br/>**selected** `Array<Object>` - selected rows                                     |
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
| detail      |             | <br/>    |
| empty       |             |          |
| footer      |             |          |
| loading     |             |          |
| bottom-left |             |          |

---

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/__table.scss.scss)

| CSS Variable                                  | SASS Variable                           | Default                                                  |
| --------------------------------------------- | --------------------------------------- | -------------------------------------------------------- |
| --oruga-table-background-color                | \$table-background-color                | #fff                                                     |
| --oruga-table-background                      | \$table-background                      | #f5f5f5                                                  |
| --oruga-table-boder                           | \$table-boder                           | 1px solid transparent                                    |
| --oruga-table-border-radius                   | \$table-border-radius                   | \$base-border-radius                                     |
| --oruga-table-bordered-border-width           | \$table-bordered-border-width           | 1px                                                      |
| --oruga-table-card-box-shadow                 | \$table-card-box-shadow                 | 0 2px 3px rgba($black, 0.1), 0 0 0 1px rgba($black, 0.1) |
| --oruga-table-card-cell-font-weight           | \$table-card-cell-font-weight           | 600                                                      |
| --oruga-table-card-cell-padding               | \$table-card-cell-padding               | 0 0.5em 0 0                                              |
| --oruga-table-card-cell-text-align            | \$table-card-cell-text-align            | left                                                     |
| --oruga-table-card-detail-margin              | \$table-card-detail-margin              | -1rem 0 0 0                                              |
| --oruga-table-card-margin                     | \$table-card-margin                     | 0 0 1rem 0                                               |
| --oruga-table-color                           | \$table-color                           | black                                                    |
| --oruga-table-current-sort-border-color       | \$table-current-sort-border-color       | \$grey                                                   |
| --oruga-table-current-sort-font-weight        | \$table-current-sort-font-weight        | 700                                                      |
| --oruga-table-current-sort-hover-border-color | \$table-current-sort-hover-border-color | \$grey                                                   |
| --oruga-table-detail-background               | \$table-detail-background               | #fafafa                                                  |
| --oruga-table-detail-box-shadow               | \$table-detail-box-shadow               | inset 0 1px 3px \$grey                                   |
| --oruga-table-detail-chevron-color            | \$table-detail-chevron-color            | \$primary                                                |
| --oruga-table-detail-chevron-width            | \$table-detail-chevron-width            | 40px                                                     |
| --oruga-table-detail-padding                  | \$table-detail-padding                  | 1rem                                                     |
| --oruga-table-focus-border-color              | \$table-focus-border-color              | \$primary                                                |
| --oruga-table-focus-box-shadow                | \$table-focus-box-shadow                | 0 0 0 0.125em rgba(\$primary, 0.25)                      |
| --oruga-table-hoverable-background-color      | \$table-hoverable-background-color      | #fafafa                                                  |
| --oruga-table-narrow-padding                  | \$table-narrow-padding                  | .25em .5em                                               |
| --oruga-table-row-active-background-color     | \$table-row-active-background-color     | \$primary                                                |
| --oruga-table-row-active-color                | \$table-row-active-color                | \$primary-invert                                         |
| --oruga-table-sticky-header-height            | \$table-sticky-header-height            | 300px                                                    |
| --oruga-table-sticky-zindex                   | \$table-sticky-zindex                   | 1                                                        |
| --oruga-table-striped-background-color        | \$table-striped-background-color        | #fafafa                                                  |
| --oruga-table-td-border                       | \$table-td-border                       | 1px solid \$grey-lighter                                 |
| --oruga-table-td-padding                      | \$table-td-padding                      | .5em .75em                                               |
| --oruga-table-th-border                       | \$table-th-border                       | 2px solid \$grey-lighter                                 |
| --oruga-table-th-checkbox-width               | \$table-th-checkbox-width               | 40px                                                     |
| --oruga-table-th-color                        | \$table-th-color                        | #363636                                                  |
| --oruga-table-th-detail-width                 | \$table-th-detail-width                 | 14px                                                     |
| --oruga-table-th-font-weight                  | \$table-th-font-weight                  | 600                                                      |
| --oruga-table-th-padding                      | \$table-th-padding                      | 0.5em 0.75em                                             |
