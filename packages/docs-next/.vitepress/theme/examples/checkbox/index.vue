<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Variants</h2>

	<ExampleViewer :component="Variants" :code="VariantsCode" />

	<h2>Array</h2>

	<ExampleViewer :component="Array" :code="ArrayCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import Variants from './variants.vue';
	import VariantsCode from './variants.vue?raw';

	import Array from './array.vue';
	import ArrayCode from './array.vue?raw';
</script>
