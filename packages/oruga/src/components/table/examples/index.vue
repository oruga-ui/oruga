<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Customise from "./customise.vue";
import CustomiseCode from "./customise.vue?raw";

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
    <h3 id="base-column">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="customise">Customise</h3>
    <ExampleViewer :component="Customise" :code="CustomiseCode" />

    <h3 id="selection">Selection</h3>
    <ExampleViewer :component="Selection" :code="SelectionCode" />

    <h3 id="checkable">Checkable</h3>
    <ExampleViewer :component="Checkable" :code="CheckableCode" />

    <h3 id="detailed">Detailed</h3>
    <ExampleViewer :component="Detailed" :code="DetailedCode" />

    <h3 id="pagination">Pagination</h3>
    <ExampleViewer :component="Pagination" :code="PaginationCode" />

    <h3 id="async">Async Data</h3>
    <ExampleViewer :component="AsyncData" :code="AsyncDataCode" />

    <h3 id="sticky">Sticky</h3>
    <ExampleViewer :component="Sticky" :code="StickyCode" />

    <h3 id="searchable">Searchable</h3>
    <ExampleViewer :component="Searchable" :code="SearchableCode" />

    <h3 id="draggable">Draggable rows/columns</h3>
    <ExampleViewer :component="Draggable" :code="DraggableCode" />
</template>
./draggable.vue
