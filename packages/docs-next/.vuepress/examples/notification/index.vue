<template>

	<h2>Programmatically opening</h2>

	<ExampleViewer :component="ProgrammaticallyOpening" :code="ProgrammaticallyOpeningCode" />

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Use types</h2>

	<ExampleViewer :component="UseTypes" :code="UseTypesCode" />

	<h2>Add custom buttons</h2>

	<ExampleViewer :component="AddCustomButtons" :code="AddCustomButtonsCode" />

</template>

<script setup>
	import ProgrammaticallyOpening from './programmatically-opening.vue';
	import ProgrammaticallyOpeningCode from './programmatically-opening.vue?raw';

	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import UseTypes from './use-types.vue';
	import UseTypesCode from './use-types.vue?raw';

	import AddCustomButtons from './add-custom-buttons.vue';
	import AddCustomButtonsCode from './add-custom-buttons.vue?raw';
</script>
