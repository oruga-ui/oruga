<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Slot</h2>

	<ExampleViewer :component="Slot" :code="SlotCode" />

	<h2>Programmatically</h2>

	<ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import Slot from './slot.vue';
	import SlotCode from './slot.vue?raw';

	import Programmatically from './programmatically.vue';
	import ProgrammaticallyCode from './programmatically.vue?raw';
</script>
