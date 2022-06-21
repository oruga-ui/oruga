<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Customize</h2>

	<ExampleViewer :component="Customize" :code="CustomizeCode" />

	<h2>Tick and label</h2>

	<ExampleViewer :component="TickAndLabel" :code="TickAndLabelCode" />

	<h2>Range</h2>

	<ExampleViewer :component="Range" :code="RangeCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import Customize from './customize.vue';
	import CustomizeCode from './customize.vue?raw';

	import TickAndLabel from './tick-and-label.vue';
	import TickAndLabelCode from './tick-and-label.vue?raw';

	import Range from './range.vue';
	import RangeCode from './range.vue?raw';
</script>
