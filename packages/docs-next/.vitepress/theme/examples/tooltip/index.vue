<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Multiline</h2>

	<ExampleViewer :component="Multiline" :code="MultilineCode" />

	<h2>Slot</h2>

	<ExampleViewer :component="Slot" :code="SlotCode" />

	<h2>Toggle</h2>

	<ExampleViewer :component="Toggle" :code="ToggleCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import Multiline from './multiline.vue';
	import MultilineCode from './multiline.vue?raw';

	import Slot from './slot.vue';
	import SlotCode from './slot.vue?raw';

	import Toggle from './toggle.vue';
	import ToggleCode from './toggle.vue?raw';
</script>
