<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Multiple</h2>

	<ExampleViewer :component="Multiple" :code="MultipleCode" />

	<h2>Scrollable</h2>

	<ExampleViewer :component="Scrollable" :code="ScrollableCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import Multiple from './multiple.vue';
	import MultipleCode from './multiple.vue?raw';

	import Scrollable from './scrollable.vue';
	import ScrollableCode from './scrollable.vue?raw';
</script>
