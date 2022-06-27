<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Footer slot</h2>

	<ExampleViewer :component="FooterSlot" :code="FooterSlotCode" />

	<h2>Inline</h2>

	<ExampleViewer :component="Inline" :code="InlineCode" />

	<h2>Min/Max Datetime</h2>

	<ExampleViewer :component="MinMax" :code="MinMaxCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import FooterSlot from './footer-slot.vue';
	import FooterSlotCode from './footer-slot.vue?raw';

	import Inline from './inline.vue';
	import InlineCode from './inline.vue?raw';

	import MinMax from './min-max.vue';
	import MinMaxCode from './min-max.vue?raw';
</script>
