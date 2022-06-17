<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Addons</h2>

	<ExampleViewer :component="Addons" :code="AddonsCode" />

	<h2>Grouped</h2>

	<ExampleViewer :component="Grouped" :code="GroupedCode" />

	<h2>Horizontal</h2>

	<ExampleViewer :component="Horizontal" :code="HorizontalCode" />

	<h2>Slots</h2>

	<ExampleViewer :component="Slots" :code="SlotsCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import Addons from './addons.vue';
	import AddonsCode from './addons.vue?raw';

	import Grouped from './grouped.vue';
	import GroupedCode from './grouped.vue?raw';

	import Horizontal from './horizontal.vue';
	import HorizontalCode from './horizontal.vue?raw';

	import Slots from './slots.vue';
	import SlotsCode from './slots.vue?raw';
</script>
