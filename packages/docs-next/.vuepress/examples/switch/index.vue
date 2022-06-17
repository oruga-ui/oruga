<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Variants</h2>

	<ExampleViewer :component="Variants" :code="VariantsCode" />

	<h2>Sizes</h2>

	<ExampleViewer :component="Sizes" :code="SizesCode" />

	<h2>Style variants</h2>

	<ExampleViewer :component="StyleVariants" :code="StyleVariantsCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import Variants from './variants.vue';
	import VariantsCode from './variants.vue?raw';

	import Sizes from './sizes.vue';
	import SizesCode from './sizes.vue?raw';

	import StyleVariants from './style-variants.vue';
	import StyleVariantsCode from './style-variants.vue?raw';
</script>
