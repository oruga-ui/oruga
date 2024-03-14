---
title: Table
---

# Table

<div class="vp-doc">

> Tabulated data are sometimes needed, it's even better when it's responsive

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

| Prop name             | Description                                                                                                                           | Type                                 | Values                                                                          | Default                                                                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaCurrentLabel      | Accessibility label for the pagination current page button.                                                                           | string                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;ariaCurrentLabel: undefined<br>}</code>      |
| ariaNextLabel         | Accessibility label for the pagination next page button.                                                                              | string                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;ariaNextLabel: undefined<br>}</code>         |
| ariaPageLabel         | Accessibility label for the pagination page button.                                                                                   | string                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;ariaPageLabel: undefined<br>}</code>         |
| ariaPreviousLabel     | Accessibility label for the pagination previous page button.                                                                          | string                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;ariaPreviousLabel: undefined<br>}</code>     |
| backendFiltering      | Columns won't be filtered with Javascript, use with `searchable` prop to the columns to filter in your backend                        | boolean                              | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;backendFiltering: false<br>}</code>          |
| backendPagination     | Rows won't be paginated with Javascript, use with `page-change` event to paginate in your backend                                     | boolean                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| backendSorting        | Columns won't be sorted with Javascript, use with `sort` event to sort in your backend                                                | boolean                              | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;backendSorting: false<br>}</code>            |
| bordered              | Border to all cells                                                                                                                   | boolean                              | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;bordered: false<br>}</code>                  |
| checkable             | Rows can be checked (multiple)                                                                                                        | boolean                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| checkboxPosition      | Position of the checkbox when checkable (if checkable)                                                                                | string                               | `left`, `right`                                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;checkboxPosition: "left"<br>}</code>         |
| checkboxVariant       | Color of the checkbox when checkable (if checkable)                                                                                   | string                               | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;checkboxVariant: undefined<br>}</code>       |
| checkedRows           | Set which rows are checked, use `v-model:checkedRows` to make it two-way binding (if checkable)                                       | TableRow&lt;T&gt;[]                  | -                                                                               | Default function (see source code)                                                                                                                               |
| columns               | Table columns                                                                                                                         | TableColumn[]                        | -                                                                               | Default function (see source code)                                                                                                                               |
| currentPage           | Current page of table data (if paginated), use `v-model:currentPage` to make it two-way binding                                       | number                               | -                                                                               | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                          |
| customDetailRow       | Enable custom style on details (if detailed)                                                                                          | boolean                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| customRowKey          | Use a unique key of your data Object for each row. Useful if your data prop has dynamic indices. (id recommended)                     | string                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;customRowKey: undefined<br>}</code>          |
| data                  | Table data                                                                                                                            | T[]                                  | -                                                                               | Default function (see source code)                                                                                                                               |
| debounceSearch        | Filtering debounce time (in milliseconds)                                                                                             | number                               | -                                                                               |                                                                                                                                                                  |
| defaultSort           | Sets the default sort column and order — e.g. ['first_name', 'desc']                                                                  | string \| string[]                   | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;defaultSort: undefined<br>}</code>           |
| defaultSortDirection  | Sets the default sort column direction on the first click                                                                             | string                               | `asc`, `desc`                                                                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;defaultSortDirection: "asc"<br>}</code>      |
| detailIcon            | Icon name of detail action (if detailed)                                                                                              | string                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;detailIcon: "chevron-right"<br>}</code>      |
| detailTransition      |                                                                                                                                       | string                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;detailTransition: "slide"<br>}</code>        |
| detailed              | Allow row details                                                                                                                     | boolean                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| detailedRows          | Allow pre-defined opened details (if detailed). Ideal to open details via vue-router. (A unique key is required; check `rowKey` prop) | TableRow&lt;T&gt;[]                  | -                                                                               | Default function (see source code)                                                                                                                               |
| draggable             | Allows rows to be draggable                                                                                                           | boolean                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| draggableColumn       | Allows columns to be draggable                                                                                                        | boolean                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| filtersEvent          | Add a native event to filter                                                                                                          | string                               | -                                                                               | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                                         |
| filtersIcon           | Icon of the column search input                                                                                                       | string                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;filterIcon: undefined<br>}</code>            |
| filtersPlaceholder    | Placeholder of the column search input                                                                                                | string                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;filterPlaceholder: undefined<br>}</code>     |
| focusable             | Table can be focused and user can navigate with keyboard arrows (require selected) and rows are highlighted when hovering             | boolean                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| headerCheckable       | Show check/uncheck all checkbox in table header when checkable (if checkable)                                                         | boolean                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                       |
| height                | Table fixed height                                                                                                                    | number\|string                       | -                                                                               |                                                                                                                                                                  |
| hoverable             | Rows are highlighted when hovering                                                                                                    | boolean                              | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;hoverable: false<br>}</code>                 |
| iconPack              | Icon pack to use                                                                                                                      | string                               | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>              |
| isDetailedVisible     | Controls the visibility of the trigger that toggles the detailed rows (if detailed)                                                   | (row: T) =&gt; boolean               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;isDetailedVisible: (row) => true<br>}</code> |
| isRowCheckable        | Custom method to verify if a row is checkable (if checkable)                                                                          | (row: T) =&gt; boolean               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;isRowCheckable: (row) => true<br>}</code>    |
| isRowChecked          | Custom method to verify if a row is checked (if checkable). Useful for backend pagination.                                            | (row: T, data: T[]) =&gt; boolean    | -                                                                               |                                                                                                                                                                  |
| isRowSelectable       | Custom method to verify if a row is selectable, works when is selected.                                                               | (row: T) =&gt; boolean               | -                                                                               | Default function (see source code)                                                                                                                               |
| loading               | Enable loading state                                                                                                                  | boolean                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| loadingIcon           | Icon for the loading state                                                                                                            | string                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;loadingIcon: "loading"<br>}</code>           |
| loadingLabel          | Label for the loading state                                                                                                           | string                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;loadingLabel: undefined<br>}</code>          |
| mobileBreakpoint      | Mobile breakpoint as max-width value                                                                                                  | string                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code>      |
| mobileCards           | Rows appears as cards on mobile (collapse rows)                                                                                       | boolean                              | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;mobileCards: true<br>}</code>                |
| mobileSortPlaceholder | Select placeholder text when nothing is selected (if mobileCards)                                                                     | string                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;mobileSortPlaceholder: undefined<br>}</code> |
| narrowed              | Makes the cells narrower                                                                                                              | boolean                              | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;narrowed: false<br>}</code>                  |
| override              | Override existing theme classes completely                                                                                            | boolean                              | -                                                                               |                                                                                                                                                                  |
| paginated             | Adds pagination to the table                                                                                                          | boolean                              | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;paginated: false<br>}</code>                 |
| paginationOrder       | Pagination buttons order (if paginated)                                                                                               | string                               | `centered`, `right`, `left`                                                     | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;paginationOrder: undefined<br>}</code>       |
| paginationPosition    | Pagination position (if paginated)                                                                                                    | string                               | `bottom`, `top`, `both`                                                         | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;paginationPosition: "bottom"<br>}</code>     |
| paginationRounded     | Enable rounded pagination buttons (if paginated)                                                                                      | boolean                              | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;paginationRounded: false<br>}</code>         |
| paginationSimple      | Enable simple style pagination (if paginated)                                                                                         | boolean                              | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;paginationSimple: false<br>}</code>          |
| paginationSize        | Size of pagination (if paginated)                                                                                                     | string                               | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;paginationSize: "small"<br>}</code>          |
| perPage               | How many rows per page (if paginated)                                                                                                 | number\|string                       | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;perPage: 20<br>}</code>                      |
| rowClass              | Define individual class for a row                                                                                                     | (row: T, index: number) =&gt; string | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;rowClass: (row,index) => ""<br>}</code>      |
| rowKey                | Use a unique key of your data Object for each row. Useful if your data prop has dynamic indices. (id recommended)                     | string                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;rowKey: undefined<br>}</code>                |
| scrollable            | Add a horizontal scrollbar when table is too wide                                                                                     | boolean                              | -                                                                               |                                                                                                                                                                  |
| selected              | Set which row is selected, use `v-model:selected` to make it two-way binding                                                          | TableRow&lt;T&gt;                    | -                                                                               |                                                                                                                                                                  |
| showDetailIcon        | Allow detail icon and column to be visible (if detailed)                                                                              | boolean                              | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;showDetailIcon: true<br>}</code>             |
| showHeader            | Show header                                                                                                                           | boolean                              | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;showHeader: true<br>}</code>                 |
| sortIcon              | Sets the header sorting icon                                                                                                          | string                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;sortIcon: "arrow-up"<br>}</code>             |
| sortIconSize          | Sets the size of the sorting icon                                                                                                     | string                               | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;sortIconSize: "small"<br>}</code>            |
| stickyCheckbox        | Make the checkbox column sticky when checkable                                                                                        | boolean                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| stickyHeader          | Show a sticky table header                                                                                                            | boolean                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| striped               | Whether table is striped                                                                                                              | boolean                              | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>table: {<br>&nbsp;&nbsp;striped: false<br>}</code>                   |
| total                 | Total number of table data if backend-pagination is enabled                                                                           | number                               | -                                                                               | <code style='white-space: nowrap; padding: 0;'>0</code>                                                                                                          |

### Events

| Event name          | Properties                                                                                                                                                                                      | Description                                        |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| page-change         | **page** `number` - updated page                                                                                                                                                                | on pagination page change event                    |
| dblclick            | **row** `TableRow` - row data<br/>**index** `number` - index of clicked row<br/>**event** `Event` - native click event                                                                          | on row double click event                          |
| mouseenter          | **row** `TableRow` - row data<br/>**index** `number` - index of clicked row<br/>**event** `Event` - native mouseenter event                                                                     | on row mouseenter event                            |
| mouseleave          | **row** `TableRow` - row data<br/>**index** `number` - index of clicked row<br/>**event** `Event` - native mouseleave event                                                                     | on row mouseleave event                            |
| contextmenu         | **row** `TableRow` - row data<br/>**index** `number` - index of clicked row<br/>**event** `Event` - native contextmenu event                                                                    | on row right click event                           |
| cell-click          | **row** `TableRow` - row data<br/>**column** `TableColumn` - column data<br/>**index** `number` - row index<br/>**colindex** `number` - column index<br/>**event** `Event` - native click event | on cell click event                                |
| update:currentPage  | **value** `number` - updated currentPage prop                                                                                                                                                   | currentPage prop two-way binding                   |
| update:selected     | **value** `TableRow` - updated select prop                                                                                                                                                      | select prop two-way binding                        |
| select              | **newRow** `TableRow` - new select value<br/>**oldRow** `TableRow` - old select value                                                                                                           | on row select event                                |
| check               | **value** `TableRow[]` - all checked rows<br/>**row** `TableRow` - row data                                                                                                                     | on row checked event                               |
| check-all           | **value** `TableRow[]` - all checked rows                                                                                                                                                       | on all rows checked event                          |
| update:checkedRows  | **value** `TableRow[]` - updated checkedRows prop                                                                                                                                               | checkedRows prop two-way binding                   |
| sort                | **column** `TableColumn` - column data<br/>**direction** `string` - 'asc' or 'desc'<br/>**event** `Event` - native event                                                                        | on column sort change event                        |
| filters-change      | **filters** `Object` - filter object                                                                                                                                                            | on filter change event                             |
| filters-event       | **filtersEvent** `string` - props filtersEvent value<br/>**filters** `Object` - filter object<br/>**event** `Event` - native event                                                              | on native filter event based on props filtersEvent |
| update:detailedRows | **value** `TableRow[]` - updated detailedRows prop                                                                                                                                              | detailedRows prop two-way binding                  |
| details-open        | **row** `TableRow` - row data                                                                                                                                                                   | on details open event                              |
| details-close       | **row** `TableRow` - row data                                                                                                                                                                   | on details close event                             |
| click               | **row** `TableRow` - row data<br/>**index** `number` - index of clicked row<br/>**event** `Event` - native click event                                                                          | on row click event                                 |
| dragstart           | **row** `TableRow` - row data<br/>**index** `number` - index of draged row<br/>**event** `DragEvent` - native dragstart event                                                                   | on row dragstart event                             |
| dragend             | **row** `TableRow` - row data<br/>**index** `number` - index of draged row<br/>**event** `DragEvent` - native dragend event                                                                     | on row dragend event                               |
| drop                | **row** `TableRow` - row data<br/>**index** `number` - index of draged row<br/>**event** `DragEvent` - native drop event                                                                        | on row drop event                                  |
| dragleave           | **row** `TableRow` - row data<br/>**index** `number` - index of draged row<br/>**event** `DragEvent` - native dragleave event                                                                   | on row dragleave event                             |
| dragover            | **row** `TableRow` - row data<br/>**index** `number` - index of draged row<br/>**event** `DragEvent` - native dragover event                                                                    | on row dragover event                              |
| columndragstart     | **column** `TableColumn` - column data<br/>**index** `number` - index of draged column<br/>**event** `DragEvent` - native columndragstart event                                                 | on column columndragstart event                    |
| columndragend       | **column** `TableColumn` - column data<br/>**index** `number` - index of draged column<br/>**event** `DragEvent` - native columndragend event                                                   | on column columndragend event                      |
| columndrop          | **column** `TableColumn` - column data<br/>**index** `number` - index of draged column<br/>**event** `DragEvent` - native columndrop event                                                      | on column columndrop event                         |
| columndragleave     | **column** `TableColumn` - column data<br/>**index** `number` - index of draged column<br/>**event** `DragEvent` - native columndragleave event                                                 | on column columndragleave event                    |
| columndragover      | **column** `TableColumn` - column data<br/>**index** `number` - index of draged column<br/>**event** `DragEvent` - native columndragover event                                                  | on column columndragover event                     |

### Slots

| Name        | Description                                                                   | Bindings                                                                                                                                                                              |
| ----------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default     | Place o-table-column here                                                     |                                                                                                                                                                                       |
| before      | Place extra o-table-column here even if you have some columns defined by prop |                                                                                                                                                                                       |
| after       | Place extra o-table-column here even if you have some columns defined by prop |                                                                                                                                                                                       |
| pagination  | Override pagination label                                                     | **current** `number` - current page<br/>**per-page** `number` - rows per page<br/>**total** `number` - total rows count<br/>**change** `(page: number): void ` - on page change event |
| top-left    | Additional slot if table is paginated                                         |                                                                                                                                                                                       |
| caption     | Define a table caption here                                                   |                                                                                                                                                                                       |
| preheader   | Define preheader content here                                                 |                                                                                                                                                                                       |
| check-all   | Override check all checkbox                                                   | **is-all-checked** `boolean` - if all rows are checked<br/>**is-all-uncheckable** `boolean` - if check all is uncheckable<br/>**check-all** `(): void` - check all function           |
| detail      | Place row detail content here                                                 | **row** `TableRow` - row conent<br/>**index** `number` - row index                                                                                                                    |
| empty       | Define content if table is empty                                              |                                                                                                                                                                                       |
| footer      | Define a custom footer                                                        | **column-count** `number` - counts of visible columns<br/>**row-count** `number` - counts of visible rows                                                                             |
| loading     | Override loading component                                                    | **loading** `boolean` - is loading enabled                                                                                                                                            |
| bottom-left | Additional slot if table is paginated                                         |                                                                                                                                                                                       |

</div>

<div class="vp-doc">

## TableColumn component

```html
<o-table-column></o-table-column>
```

### Props

| Prop name        | Description                                                      | Type                                         | Values                      | Default                                                     |
| ---------------- | ---------------------------------------------------------------- | -------------------------------------------- | --------------------------- | ----------------------------------------------------------- |
| display          | Provide a display function to edit the output                    | (value: unknown, row: T) =&gt; string        | -                           |                                                             |
| field            | Define an object property key if data is an object               | string                                       | -                           |                                                             |
| headerSelectable | Make header selectable                                           | boolean                                      | -                           | <code style='white-space: nowrap; padding: 0;'>false</code> |
| label            | Define the column label                                          | string                                       | -                           |                                                             |
| meta             | Add addtional meta information for the column for custom purpose | string\|number\|boolean\|func\|object\|array | -                           |                                                             |
| numeric          | Define column value as number                                    | boolean                                      | -                           | <code style='white-space: nowrap; padding: 0;'>false</code> |
| onSearch         | Define a custom filter funtion for the search                    | (row: T, filter: string) =&gt; boolean       | -                           |                                                             |
| onSort           | Define a custom sort function                                    | (a: T, b: T, isAsc: boolean) =&gt; number    | -                           |                                                             |
| position         | Position of the column content                                   | string                                       | `left`, `centered`, `right` |                                                             |
| searchable       | Enable an additional searchbar below the column header           | boolean                                      | -                           | <code style='white-space: nowrap; padding: 0;'>false</code> |
| sortable         | Enable column sortability                                        | boolean                                      | -                           | <code style='white-space: nowrap; padding: 0;'>false</code> |
| sticky           | Whether the column is sticky or not                              | boolean                                      | -                           | <code style='white-space: nowrap; padding: 0;'>false</code> |
| subheading       | Define a column sub heading                                      | string                                       | -                           |                                                             |
| tdAttrs          | Adds native attributes to td                                     | (row: T, column: typeof props) =&gt; object  | -                           | Default function (see source code)                          |
| thAttrs          | Adds native attributes to th                                     | (column: typeof props) =&gt; object          | -                           | Default function (see source code)                          |
| visible          | Define whether the column is visible or not                      | boolean                                      | -                           | <code style='white-space: nowrap; padding: 0;'>true</code>  |
| width            | Column fixed width                                               | number\|string                               | -                           |                                                             |

### Slots

| Name       | Description               | Bindings                                                                                                                                                                                                                |
| ---------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default    | Default Slot              | **row** `T` - row data<br/>**column** `TableColumn` - column definition<br/>**index** `number` - row index<br/>**colindex** `number` - column index<br/>**toggle-details** `(TableRow): void` - toggle details function |
| header     | Override header label     | **column** `TableColumn` - column definition<br/>**index** `number` - column index                                                                                                                                      |
| subheading | Override subheading label | **column** `TableColumn` - column definition<br/>**index** `number` - column index                                                                                                                                      |
| searchable | Override searchable input | **column** `TableColumn` - column definition<br/>**index** `number` - column index<br/>**filters** `Record&lt;string,string&gt;` - active filters object                                                                |

</div>

<div class="vp-doc">

</div>
<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                          | Default                                                   |
| -------------------------------------- | --------------------------------------------------------- |
| $table-background-color                | #fff                                                      |
| $table-background                      | #f5f5f5                                                   |
| $table-boder                           | 1px solid transparent                                     |
| $table-border-radius                   | $base-border-radius                                       |
| $table-card-box-shadow                 | 0 2px 3px rgba($black, 0.1),  0 0 0 1px rgba($black, 0.1) |
| $table-card-cell-font-weight           | 600                                                       |
| $table-card-cell-padding               | 0 0.5em 0 0                                               |
| $table-card-cell-text-align            | left                                                      |
| $table-card-detail-margin              | -1rem 0 0 0                                               |
| $table-card-margin                     | 0 0 1rem 0                                                |
| $table-color                           | black                                                     |
| $table-current-sort-border-color       | $grey                                                     |
| $table-current-sort-font-weight        | 700                                                       |
| $table-current-sort-hover-border-color | $grey                                                     |
| $table-detail-background               | #fafafa                                                   |
| $table-detail-box-shadow               | inset 0 1px 3px $grey                                     |
| $table-detail-chevron-color            | $primary                                                  |
| $table-detail-chevron-width            | 40px                                                      |
| $table-detail-padding                  | 1rem                                                      |
| $table-focus-border-color              | $primary                                                  |
| $table-focus-box-shadow                | 0 0 0 0.125em rgba($primary, 0.25)                        |
| $table-hoverable-background-color      | #fafafa                                                   |
| $table-narrow-padding                  | 0.25em 0.5em                                              |
| $table-row-active-background-color     | $primary                                                  |
| $table-row-active-color                | $primary-invert                                           |
| $table-sticky-header-height            | 300px                                                     |
| $table-sticky-zindex                   | 1                                                         |
| $table-striped-background-color        | #fafafa                                                   |
| $table-td-border                       | 1px solid $grey-lighter                                   |
| $table-td-padding                      | 0.5em 0.75em                                              |
| $table-th-border                       | 2px solid $grey-lighter                                   |
| $table-th-checkbox-width               | 40px                                                      |
| $table-th-color                        | #363636                                                   |
| $table-th-detail-width                 | 14px                                                      |
| $table-th-font-weight                  | 600                                                       |
| $table-th-padding                      | 0.5em 0.75em                                              |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_table.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                          | Default                                                   |
| -------------------------------------- | --------------------------------------------------------- |
| $table-background-color                | #fff                                                      |
| $table-background                      | #f5f5f5                                                   |
| $table-boder                           | 1px solid transparent                                     |
| $table-border-radius                   | $base-border-radius                                       |
| $table-card-box-shadow                 | 0 2px 3px rgba($black, 0.1),  0 0 0 1px rgba($black, 0.1) |
| $table-card-cell-font-weight           | 600                                                       |
| $table-card-cell-padding               | 0 0.5em 0 0                                               |
| $table-card-cell-text-align            | left                                                      |
| $table-card-detail-margin              | -1rem 0 0 0                                               |
| $table-card-margin                     | 0 0 1rem 0                                                |
| $table-color                           | black                                                     |
| $table-current-sort-border-color       | $grey                                                     |
| $table-current-sort-font-weight        | 700                                                       |
| $table-current-sort-hover-border-color | $grey                                                     |
| $table-detail-background               | #fafafa                                                   |
| $table-detail-box-shadow               | inset 0 1px 3px $grey                                     |
| $table-detail-chevron-color            | $primary                                                  |
| $table-detail-chevron-width            | 40px                                                      |
| $table-detail-padding                  | 1rem                                                      |
| $table-focus-border-color              | $primary                                                  |
| $table-focus-box-shadow                | 0 0 0 0.125em rgba($primary, 0.25)                        |
| $table-hoverable-background-color      | #fafafa                                                   |
| $table-narrow-padding                  | 0.25em 0.5em                                              |
| $table-row-active-background-color     | $primary                                                  |
| $table-row-active-color                | $primary-invert                                           |
| $table-sticky-header-height            | 300px                                                     |
| $table-sticky-zindex                   | 1                                                         |
| $table-striped-background-color        | #fafafa                                                   |
| $table-td-border                       | 1px solid $grey-lighter                                   |
| $table-td-padding                      | 0.5em 0.75em                                              |
| $table-th-border                       | 2px solid $grey-lighter                                   |
| $table-th-checkbox-width               | 40px                                                      |
| $table-th-color                        | #363636                                                   |
| $table-th-detail-width                 | 14px                                                      |
| $table-th-font-weight                  | 600                                                       |
| $table-th-padding                      | 0.5em 0.75em                                              |

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
