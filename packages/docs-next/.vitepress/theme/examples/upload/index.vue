<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Drag&Drop</h2>

	<ExampleViewer :component="DragDrop" :code="DragDropCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import DragDrop from './drag-drop.vue';
	import DragDropCode from './drag-drop.vue?raw';
</script>
