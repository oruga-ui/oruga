<script setup lang="ts">
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

import Searchable from "./searchable.vue";
import SearchableCode from "./searchable.vue?raw";

import Draggable from "./draggable.vue";
import DraggableCode from "./draggable.vue?raw";
</script>

<template>
    <div class="vp-doc">
        <h3 id="base-column">Base</h3>
        <p>
            Each row is represented as an object in an array passed to the
            <code>data</code> prop.
        </p>
        <ExampleViewer :component="Base" :code="BaseCode" />

        <h3 id="customise">Customise</h3>
        <p>Define the table in the way that you need it to be.</p>
        <ExampleViewer :component="Customise" :code="CustomiseCode" />

        <h3 id="columns">Columns</h3>
        <p>
            Columns can either be defined by adding
            <code>&lt;o-table-column&gt;</code> components to the
            <code>default</code> slot, or by adding an array to the
            <code>columns</code> prop, where each object defines a column. It is
            possible to mix both approaches by adding a
            <code>columns</code> prop as well as passing
            <code>&lt;o-table-column&gt;</code> components in the
            <code>before</code> or <code>after</code> slots.
        </p>
        <ExampleViewer :component="Columns" :code="ColumnsCode" />

        <h3 id="selection">Selection</h3>
        <p>
            When the <code>selectable</code> prop is set, the
            <code>selected</code> prop represents the currently selected
            element. The prop is two-way bindable.Consider defining whether a
            row is selectable with a function given by the
            <code>is-row-selectable</code> prop.
        </p>
        <ExampleViewer :component="Selection" :code="SelectionCode" />

        <h3 id="checkable">Checkable</h3>
        <p>
            When the <code>checkable</code> prop is set, each row will have a
            checkbox. The checkbox position can be changed from left to right
            using the <code>checkbox-position</code> prop. The checked rows are
            combined in the <code>checked-rows</code> prop, which is two-way
            bindable. Consider defining whether a row is checkable with a
            function given by the <code>is-row-checkable</code> prop.
            <ExampleViewer :component="Checkable" :code="CheckableCode" />
        </p>

        <h3 id="detailed">Detailed</h3>
        <p>
            Each row can have a collapse section by adding the
            <code>detailed</code> prop. The rows with an open detail section are
            combined in the <code>detailed-rows</code> prop, which is two-way
            bindable. By default, the detail is displayed as another tr, but
            adding <code>custom-detail-row</code> removes the tr wrapper from
            the provided <code>detail</code> slot. Consider defining whether a
            row can have a detail section with a function given by the
            <code>is-detailed-visibile</code> prop.
        </p>
        <ExampleViewer :component="Detailed" :code="DetailedCode" />

        <h3 id="pagination">Pagination</h3>
        <p>
            The table component uses the
            <a href="/components/Pagination.html">pagination</a> component when
            the <code>paginated</code> prop is set. The
            <code>per-page</code> prop can be used to specify the number of rows
            per page. Any property prefixed with "pagination" is passed to the
            pagination component.
            <ExampleViewer :component="Pagination" :code="PaginationCode" />
        </p>

        <h3 id="searchable">Searchable</h3>
        <p>
            Columns can have a search filter input by adding
            <code>searchable</code> to the TableColumn component item. The
            search filter can be debounced to avoid multiple filtering when
            typing wich adding the <code>filter-debounce</code> prop to the
            Table component.
        </p>
        <ExampleViewer :component="Searchable" :code="SearchableCode" />

        <h3 id="async">Async Data</h3>
        <p>
            Every data-related function supports asynchronous loading behaviour.
            Consider adding <code>backend-pagination</code>,
            <code>backend-sorting</code> and <code>backend-filtering</code> in
            addition to the required normal props to prevent the component from
            handling the events. Each functionality fires an event that can be
            used to update the <code>data</code>. A loading state can also be
            enabled by using the <code>loading</code> prop.
        </p>
        <ExampleViewer :component="AsyncData" :code="AsyncDataCode" />

        <h3 id="sticky">Sticky</h3>
        <p>
            Adding the <code>sticky-header</code> prop to the Table component
            makes the header stick to the top when scrolling vertically. Adding
            the <code>sticky</code> prop to individual TableColumn components
            makes the column stick to the left when scrolling horizontally.
        </p>
        <ExampleViewer :component="Sticky" :code="StickyCode" />

        <h3 id="draggable">Draggable rows/columns</h3>
        <p>
            Use <code>draggable</code>/<code>draggable-column</code> prop to
            allow rows and columns to be draggable. Manage dragging using
            <code>dragstart</code>/<code>columndragstart</code>,
            <code>dragover</code>/<code>columndragover</code> and
            <code>drop</code>/<code>columndrop</code> events.
        </p>
        <ExampleViewer :component="Draggable" :code="DraggableCode" />
    </div>
</template>
