<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Static</h2>

	<ExampleViewer :component="Static" :code="StaticCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import Static from './static.vue';
	import StaticCode from './static.vue?raw';
</script>
