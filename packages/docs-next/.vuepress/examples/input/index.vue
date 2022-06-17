<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>With Icons</h2>

	<ExampleViewer :component="WithIcons" :code="WithIconsCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import WithIcons from './with-icons.vue';
	import WithIconsCode from './with-icons.vue?raw';
</script>
