<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Carousel List</h2>

	<ExampleViewer :component="List" :code="ListCode" />

	<h2>Custom As indicators</h2>

	<ExampleViewer :component="CustomIndicators" :code="CustomIndicatorsCode" />

	<h2>Custom</h2>

	<ExampleViewer :component="Custom" :code="CustomCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import List from './list.vue';
	import ListCode from './list.vue?raw';

	import CustomIndicators from './custom-indicators.vue';
	import CustomIndicatorsCode from './custom-indicators.vue?raw';

	import Custom from './custom.vue';
	import CustomCode from './custom.vue?raw';
</script>
