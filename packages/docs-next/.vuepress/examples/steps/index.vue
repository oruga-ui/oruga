<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Variants</h2>

	<ExampleViewer :component="Variants" :code="VariantsCode" />

	<h2>Vertical</h2>

	<ExampleViewer :component="Vertical" :code="VerticalCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import Variants from './variants.vue';
	import VariantsCode from './variants.vue?raw';

	import Vertical from './vertical.vue';
	import VerticalCode from './vertical.vue?raw';
</script>
