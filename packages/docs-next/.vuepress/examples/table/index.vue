<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Sandbox</h2>

	<ExampleViewer :component="Sandbox" :code="SandboxCode" />

	<h2>Selection</h2>

	<ExampleViewer :component="Selection" :code="SelectionCode" />

	<h2>Pagination</h2>

	<ExampleViewer :component="Pagination" :code="PaginationCode" />

	<h2>Async Data</h2>

	<ExampleViewer :component="AsyncData" :code="AsyncDataCode" />

	<h2>Checkable</h2>

	<ExampleViewer :component="Checkable" :code="CheckableCode" />

	<h2>Sticky</h2>

	<ExampleViewer :component="Sticky" :code="StickyCode" />

	<h2>Detailed</h2>

	<ExampleViewer :component="Detailed" :code="DetailedCode" />

	<h2>Searchable</h2>

	<ExampleViewer :component="Searchable" :code="SearchableCode" />

	<h2>Draggable rows/columns</h2>

	<ExampleViewer :component="DraggableRowsColumns" :code="DraggableRowsColumnsCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import Sandbox from './sandbox.vue';
	import SandboxCode from './sandbox.vue?raw';

	import Selection from './selection.vue';
	import SelectionCode from './selection.vue?raw';

	import Pagination from './pagination.vue';
	import PaginationCode from './pagination.vue?raw';

	import AsyncData from './async-data.vue';
	import AsyncDataCode from './async-data.vue?raw';

	import Checkable from './checkable.vue';
	import CheckableCode from './checkable.vue?raw';

	import Sticky from './sticky.vue';
	import StickyCode from './sticky.vue?raw';

	import Detailed from './detailed.vue';
	import DetailedCode from './detailed.vue?raw';

	import Searchable from './searchable.vue';
	import SearchableCode from './searchable.vue?raw';

	import DraggableRowsColumns from './draggable-rows-columns.vue';
	import DraggableRowsColumnsCode from './draggable-rows-columns.vue?raw';
</script>
