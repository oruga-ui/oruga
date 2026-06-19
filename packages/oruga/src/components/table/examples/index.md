<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Customise from "./customise.vue";
import CustomiseCode from "./customise.vue?raw";

import Columns from "./columns.vue";
import ColumnsCode from "./columns.vue?raw";

import Selection from "./selection.vue";
import SelectionCode from "./selection.vue?raw";

import Pagination from "./pagination.vue";
import PaginationCode from "./pagination.vue?raw";

import AsyncData from "./async-data.vue";
import AsyncDataCode from "./async-data.vue?raw";

import Checkable from "./checkable.vue";
import CheckableCode from "./checkable.vue?raw";

import Sticky from "./sticky.vue";
import StickyCode from "./sticky.vue?raw";

import Detailed from "./detailed.vue";
import DetailedCode from "./detailed.vue?raw";

import Filterable from "./filterable.vue";
import FilterableCode from "./filterable.vue?raw";

import Draggable from "./draggable.vue";
import DraggableCode from "./draggable.vue?raw";
</script>

### Base

Each row is represented as an object in an array passed to the `data` prop.

<ExampleViewer :component="Base" :code="BaseCode" />

### Customise

Define the table in the way that you need it to be.

::: info Limitations
Due to the way the Vue reactivity system works, it is not possible to define a JavaScript object for the `thAttrs` and `tdAttrs` properties of the `o-table-column` component directly in the template block. This will result in a recursive rendering error. In order to use an object as value, the object must be defined as variable in the script block. (See [Issue #1531](https://github.com/oruga-ui/oruga/issues/1531))
:::

<ExampleViewer :component="Customise" :code="CustomiseCode" />

### Columns

Columns can either be defined by adding `<o-table-column>` components to the `default` slot, or by adding an array to the `columns` prop, where each object defines a column. It is possible to mix both approaches by adding a `columns` prop as well as passing `<o-table-column>` components in the `before` or `after` slots.

<ExampleViewer :component="Columns" :code="ColumnsCode" />

### Selection

When the `selectable` prop is set, the `selected` prop represents the currently selected element. The prop is two-way bindable. Consider defining whether a row is selectable with a function given by the `is-row-selectable` prop.

<ExampleViewer :component="Selection" :code="SelectionCode" />

### Checkable

When the `checkable` prop is set, each row will have a checkbox. The checkbox position can be changed from left to right using the `checkbox-position` prop. The checked rows are combined in the `checked-rows` prop, which is two-way bindable. When the user navigates to a new page `checked-rows` will reset, to bypass this reset add the `keep-checked` prop. Consider defining whether a row is checkable with a function given by the `is-row-checkable` prop.

<ExampleViewer :component="Checkable" :code="CheckableCode" />

### Detailed

Each row can have a collapse section by adding the `detailed` prop. The rows with an open detail section are combined in the `detailed-rows` prop, which is two-way bindable. By default, the detail is displayed as another tr, but adding `custom-detail-row` removes the tr wrapper from the provided `detail` slot. Consider defining whether a row can have a detail section with a function given by the `is-detailed-visibile` prop.

<ExampleViewer :component="Detailed" :code="DetailedCode" />

### Pagination

The table component uses the [pagination](/components/Pagination.html) component when the `paginated` prop is set. The `per-page` prop can be used to specify the number of rows per page. Any property prefixed with "pagination" is passed to the pagination component.

<ExampleViewer :component="Pagination" :code="PaginationCode" />

### Filterable

Columns can have a search filter input by adding `filterable` to the TableColumn component item. The search filter can be debounced to avoid multiple filtering when typing wich adding the `filter-debounce` prop to the Table component.

<ExampleViewer :component="Filterable" :code="FilterableCode" />

### Async Data

Every data-related function supports asynchronous loading behaviour. Consider adding `backend-pagination`, `backend-sorting` and `backend-filtering` in addition to the required normal props to prevent the component from handling the events. Each functionality fires an event that can be used to update the `data`. A loading state can also be enabled by using the `loading` prop.

<ExampleViewer :component="AsyncData" :code="AsyncDataCode" />

### Sticky

Adding the `sticky-header` prop to the Table component makes the header stick to the top when scrolling vertically. Adding the `sticky` prop to individual TableColumn components makes the column stick to the left when scrolling horizontally.

<ExampleViewer :component="Sticky" :code="StickyCode" />

### Draggable rows/columns

Use `draggable`/`draggable-column` prop to allow rows and columns to be draggable. Manage dragging using `dragstart`/`columndragstart`, `dragover`/`columndragover` and `drop`/`columndrop` events.

<ExampleViewer :component="Draggable" :code="DraggableCode" />
