<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Accordion</h2>

	<ExampleViewer :component="Accordion" :code="AccordionCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import Accordion from './accordion.vue';
	import AccordionCode from './accordion.vue?raw';
</script>
