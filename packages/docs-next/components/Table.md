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

| Prop name             | Description                                                                                                               | Type                                       | Values                                                                          | Default                                                                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaCurrentLabel      | Accessibility label for the pagination current page button.                                                               | string                                     | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;ariaCurrentLabel: undefined<br>}</code>      |
| ariaNextLabel         | Accessibility label for the pagination next page button.                                                                  | string                                     | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;ariaNextLabel: undefined<br>}</code>         |
| ariaPageLabel         | Accessibility label for the pagination page button.                                                                       | string                                     | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;ariaPageLabel: undefined<br>}</code>         |
| ariaPreviousLabel     | Accessibility label for the pagination previous page button.                                                              | string                                     | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;ariaPreviousLabel: undefined<br>}</code>     |
| backendFiltering      | Columns won't be filtered with Javascript, use with searchable prop to the columns to filter in your backend              | boolean                                    | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;backendFiltering: false<br>}</code>          |
| backendPagination     | Rows won't be paginated with Javascript, use with page-change event to paginate in your backend                           | boolean                                    | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| backendSorting        | Columns won't be sorted with Javascript, use with sort event to sort in your backend                                      | boolean                                    | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;backendSorting: false<br>}</code>            |
| bordered              | Border to all cells                                                                                                       | boolean                                    | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| checkable             | Rows can be checked (multiple)                                                                                            | boolean                                    | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| checkboxPosition      | Position of the checkbox (if checkable is true)                                                                           | string                                     | `left`, `right`                                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;checkboxPosition: "left"<br>}</code>         |
| checkboxVariant       | Color of the checkbox when checkable, optional                                                                            | string                                     | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;checkboxVariant: undefined<br>}</code>       |
| checkedRows           | Set which rows are checked, use v-model:checkedRows to make it two-way binding                                            | array                                      | -                                                                               | <code style='white-space: nowrap; padding: 0;'>[]</code>                                                                                                         |
| columns               | Table columns                                                                                                             | Column[]                                   | -                                                                               | Default function (see source code)                                                                                                                               |
| currentPage           | Current page of table data (if paginated), use v-model:currentPage to make it two-way binding                             | number                                     | -                                                                               | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                          |
| customDetailRow       | Custom style on details                                                                                                   | boolean                                    | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| customIsChecked       | Custom method to verify if row is checked, works when is checkable. Useful for backend pagination                         | (row: unknown, datra: T[]) =&gt; boolean   | -                                                                               |                                                                                                                                                                  |
| customRowKey          | Use a unique key of your data Object for each row. Useful if your data prop has dynamic indices. (id recommended)         | string                                     | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;customRowKey: undefined<br>}</code>          |
| data                  | Table data                                                                                                                | unknown[]                                  | -                                                                               | Default function (see source code)                                                                                                                               |
| debounceSearch        | Filtering debounce time (in milliseconds)                                                                                 | number                                     | -                                                                               |                                                                                                                                                                  |
| defaultSort           | Sets the default sort column and order — e.g. ['first_name', 'desc']                                                      | string \| string[]                         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;defaultSort: undefined<br>}</code>           |
| defaultSortDirection  | Sets the default sort column direction on the first click                                                                 | string                                     | `asc`, `desc`                                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;defaultSortDirection: "asc"<br>}</code>      |
| detailIcon            | Icon name of detail action                                                                                                | string                                     | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;detailIcon: "chevron-right"<br>}</code>      |
| detailKey             | Use a unique key of your data Object when use detailed or opened detailed. (id recommended)                               | string                                     | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;detailKey: undefined<br>}</code>             |
| detailTransition      |                                                                                                                           | string                                     | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;detailTransition: "slide"<br>}</code>        |
| detailed              | Allow row details                                                                                                         | boolean                                    | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| draggable             | Allows rows to be draggable                                                                                               | boolean                                    | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| draggableColumn       | Allows columns to be draggable                                                                                            | boolean                                    | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| filtersEvent          | Add a native event to filter                                                                                              | string                                     | -                                                                               | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                                         |
| focusable             | Table can be focused and user can navigate with keyboard arrows (require selected) and rows are highlighted when hovering | boolean                                    | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| hasDetailedVisible    | Controls the visibility of the trigger that toggles the detailed rows.                                                    | (row: unknown) =&gt; boolean               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;hasDetailedVisible: () => true<br>}</code>   |
| headerCheckable       | Show check/uncheck all checkbox in table header when checkable                                                            | boolean                                    | -                                                                               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                       |
| height                | Table fixed height                                                                                                        | number\|string                             | -                                                                               |                                                                                                                                                                  |
| hoverable             | Rows are highlighted when hovering                                                                                        | boolean                                    | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| iconPack              | Icon pack to use                                                                                                          | string                                     | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>              |
| isRowCheckable        | Custom method to verify if a row is checkable, works when is checkable                                                    | (row: unknown) =&gt; boolean               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;isRowCheckable: () => true<br>}</code>       |
| isRowSelectable       | Custom method to verify if a row is selectable, works when is selected.                                                   | func                                       | -                                                                               | Default function (see source code)                                                                                                                               |
| loading               | Enable loading state                                                                                                      | boolean                                    | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| mobileCards           | Rows appears as cards on mobile (collapse rows)                                                                           | boolean                                    | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;mobileCards: true<br>}</code>                |
| mobileSortPlaceholder | Text when nothing is selected                                                                                             | string                                     | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;mobileSortPlaceholder: undefined<br>}</code> |
| narrowed              | Makes the cells narrower                                                                                                  | boolean                                    | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| openedDetailed        | Allow pre-defined opened details. Ideal to open details via vue-router. (A unique key is required; check detail-key prop) | array                                      | -                                                                               | <code style='white-space: nowrap; padding: 0;'>[]</code>                                                                                                         |
| paginated             | Adds pagination to the table                                                                                              | boolean                                    | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;paginated: false<br>}</code>                 |
| paginationOrder       | Pagination buttons order if paginated                                                                                     | string                                     | `centered`, `right`, `left`                                                     | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;paginationOrder: undefined<br>}</code>       |
| paginationPosition    | Pagination position (if paginated)                                                                                        | string                                     | `bottom`, `top`, `bot`                                                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;paginationPosition: "bottom"<br>}</code>     |
| paginationRounded     | Rounded pagination if paginated                                                                                           | boolean                                    | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;paginationRounded: false<br>}</code>         |
| paginationSize        | Size of pagination if paginated                                                                                           | string                                     | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;paginationSize: "small"<br>}</code>          |
| perPage               | How many rows per page (if paginated)                                                                                     | number\|string                             | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;perPage: 20<br>}</code>                      |
| rowClass              | Add a class to row based on the return                                                                                    | (row: unknown, index: number) =&gt; string | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;rowClass: () => ""<br>}</code>               |
| scrollable            | Add a horizontal scrollbar when table is too wide                                                                         | boolean                                    | -                                                                               |                                                                                                                                                                  |
| selected              | Set which row is selected, use v-model:selected to make it two-way binding                                                | object                                     | -                                                                               |                                                                                                                                                                  |
| showDetailIcon        | Allow chevron icon and column to be visible                                                                               | boolean                                    | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;showDetailIcon: true<br>}</code>             |
| showHeader            | Show header                                                                                                               | boolean                                    | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;showHeader: true<br>}</code>                 |
| sortIcon              | Sets the header sorting icon                                                                                              | string                                     | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;sortIcon: "arrow-up"<br>}</code>             |
| sortIconSize          | Sets the size of the sorting icon                                                                                         | string                                     | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;sortIconSize: "small"<br>}</code>            |
| stickyCheckbox        | Make the checkbox column sticky when checkable                                                                            | boolean                                    | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| stickyHeader          | Show a sticky table header                                                                                                | boolean                                    | -                                                                               |                                                                                                                                                                  |
| striped               | Whether table is striped                                                                                                  | boolean                                    | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| total                 | Total number of table data if backend-pagination is enabled                                                               | number                                     | -                                                                               | <code style='white-space: nowrap; padding: 0;'>0</code>                                                                                                          |

### Events

| Event name            | Properties                                                                                                                                                                                    | Description                                        |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| page-change           | **page** `number` - updated page                                                                                                                                                              | on pagination page change event                    |
| dblclick              | **row** `typeof data` - row data<br/>**index** `number` - index of clicked row<br/>**event** `Event` - native click event                                                                     | on row double click event                          |
| mouseenter            | **row** `typeof data` - row data<br/>**index** `number` - index of clicked row<br/>**event** `Event` - native mouseenter event                                                                | on row mouseenter event                            |
| mouseleave            | **row** `typeof data` - row data<br/>**index** `number` - index of clicked row<br/>**event** `Event` - native mouseleave event                                                                | on row mouseleave event                            |
| contextmenu           | **row** `typeof data` - row data<br/>**index** `number` - index of clicked row<br/>**event** `Event` - native contextmenu event                                                               | on row right click event                           |
| cell-click            | **row** `typeof data` - row data<br/>**column** `Column` - column data<br/>**index** `number` - row index<br/>**colindex** `number` - column index<br/>**event** `Event` - native click event | on cell click event                                |
| update:currentPage    | **value** `number` - updated currentPage prop                                                                                                                                                 | currentPage prop two-way binding                   |
| update:selected       | **value** `typeof data` - updated select prop                                                                                                                                                 | select prop two-way binding                        |
| select                | **newRow** `typeof data` - new select value<br/>**oldRow** `typeof data` - old select value                                                                                                   | on row select event                                |
| check                 | **value** `Array&lt;typeof data&gt;` - all checked rows<br/>**row** `typeof data` - row data                                                                                                  | on row checked event                               |
| check-all             | **value** `Array&lt;typeof data&gt;` - all checked rows                                                                                                                                       | on all rows checked event                          |
| update:checkedRows    | **value** `Array&lt;typeof data&gt;` - updated checkedRows prop                                                                                                                               | checkedRows prop two-way binding                   |
| sort                  | **column** `Column` - column data<br/>**direction** `string` - 'asc' or 'desc'<br/>**event** `Event` - native event                                                                           | on column sort change event                        |
| filters-change        | **filters** `Record&lt;string, string&gt;` - filter object                                                                                                                                    | on filter change event                             |
| filters-event         | **filtersEvent** `string` - props filtersEvent value<br/>**filters** `Record&lt;string, string&gt;` - filter object<br/>**event** `Event` - native event                                      | on natvie filter event based on props filtersEvent |
| update:openedDetailed | **value** `Array&lt;typeof data&gt;` - updated openedDetailed prop                                                                                                                            | openedDetailed prop two-way binding                |
| details-open          | **row** `typeof data` - row data                                                                                                                                                              | on details open event                              |
| details-close         | **row** `typeof data` - row data                                                                                                                                                              | on details close event                             |
| click                 | **row** `typeof data` - row data<br/>**index** `number` - index of clicked row<br/>**event** `Event` - native click event                                                                     | on row click event                                 |
| dragstart             | **row** `typeof data` - row data<br/>**index** `number` - index of draged row<br/>**event** `DragEvent` - native dragstart event                                                              | on row dragstart event                             |
| dragend               | **row** `typeof data` - row data<br/>**index** `number` - index of draged row<br/>**event** `DragEvent` - native dragend event                                                                | on row dragend event                               |
| drop                  | **row** `typeof data` - row data<br/>**index** `number` - index of draged row<br/>**event** `DragEvent` - native drop event                                                                   | on row drop event                                  |
| dragleave             | **row** `typeof data` - row data<br/>**index** `number` - index of draged row<br/>**event** `DragEvent` - native dragleave event                                                              | on row dragleave event                             |
| dragover              | **row** `typeof data` - row data<br/>**index** `number` - index of draged row<br/>**event** `DragEvent` - native dragover event                                                               | on row dragover event                              |
| columndragstart       | **column** `Column` - column data<br/>**index** `number` - index of draged column<br/>**event** `DragEvent` - native columndragstart event                                                    | on column columndragstart event                    |
| columndragend         | **column** `Column` - column data<br/>**index** `number` - index of draged column<br/>**event** `DragEvent` - native columndragend event                                                      | on column columndragend event                      |
| columndrop            | **column** `Column` - column data<br/>**index** `number` - index of draged column<br/>**event** `DragEvent` - native columndrop event                                                         | on column columndrop event                         |
| columndragleave       | **column** `Column` - column data<br/>**index** `number` - index of draged column<br/>**event** `DragEvent` - native columndragleave event                                                    | on column columndragleave event                    |
| columndragover        | **column** `Column` - column data<br/>**index** `number` - index of draged column<br/>**event** `DragEvent` - native columndragover event                                                     | on column columndragover event                     |

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

| Prop name        | Description                                                      | Type                                                | Values                      | Default                                                    |
| ---------------- | ---------------------------------------------------------------- | --------------------------------------------------- | --------------------------- | ---------------------------------------------------------- |
| customSearch     | Define a custom funtion for the filter search                    | (row: unknown, filter: string) =&gt; boolean        | -                           |                                                            |
| customSort       | Define a custom sort function                                    | (a: Column, b: Column, isAsc: boolean) =&gt; number | -                           |                                                            |
| field            | Define an object property key if data is an object               | string                                              | -                           |                                                            |
| headerSelectable | Make header selectable                                           | boolean                                             | -                           | <code style='white-space: nowrap; padding: 0;'></code>     |
| label            | Define the column label                                          | string                                              | -                           |                                                            |
| meta             | Add addtional meta information for the column for custom purpose | string\|number\|boolean\|func\|object\|array        | -                           |                                                            |
| numeric          | Define column value as number                                    | boolean                                             | -                           | <code style='white-space: nowrap; padding: 0;'></code>     |
| position         | Optional, position of column content                             | string                                              | `left`, `centered`, `right` |                                                            |
| searchable       | Enable an additional searchbar below the column header           | boolean                                             | -                           | <code style='white-space: nowrap; padding: 0;'></code>     |
| sortable         | Enable column sortability                                        | boolean                                             | -                           | <code style='white-space: nowrap; padding: 0;'></code>     |
| sticky           | Whether the column is sticky or not                              | boolean                                             | -                           | <code style='white-space: nowrap; padding: 0;'></code>     |
| subheading       | Define a column sub heading                                      | string                                              | -                           |                                                            |
| tdAttrs          | Adds native attributes to td                                     | (row: unknown, column: Column) =&gt; object         | -                           | Default function (see source code)                         |
| thAttrs          | Adds native attributes to th                                     | (column: Column) =&gt; object                       | -                           | Default function (see source code)                         |
| visible          | Define whether the column is visible or not                      | boolean                                             | -                           | <code style='white-space: nowrap; padding: 0;'>true</code> |
| width            | Column fixed width                                               | number\|string                                      | -                           |                                                            |

### Slots

| Name       | Description               | Bindings                                                                                                                                                                                                            |
| ---------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default    | Default Slot              | **row** `unknown` - row data<br/>**column** `Column` - column definition<br/>**index** `number` - row index<br/>**colindex** `number` - column index<br/>**toggle-details** `(row): void` - toggle details function |
| header     | Override header label     | **column** `Column` - column definition<br/>**index** `number` - column index                                                                                                                                       |
| subheading | Override subheading label | **column** `Column` - column definition<br/>**index** `number` - column index                                                                                                                                       |
| searchable | Override searchable input | **column** `Column` - column definition<br/>**index** `number` - column index<br/>                                                                                                                                  |

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
