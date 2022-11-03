<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Variants</h2>

	<ExampleViewer :component="Variants" :code="VariantsCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import Variants from './variants.vue';
	import VariantsCode from './variants.vue?raw';
</script>
