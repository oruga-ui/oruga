<template>

	<h2>Base</h2>

	<ExampleViewer :component="Base" :code="BaseCode" />

	<h2>Programmatically</h2>

	<ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />

	<h2>Programmatically (with promises and async/await)</h2>

	<ExampleViewer :component="ProgrammaticallyAsync" :code="ProgrammaticallyAsyncCode" />

</template>

<script setup>
	import Base from './base.vue';
	import BaseCode from './base.vue?raw';

	import Programmatically from './programmatically.vue';
	import ProgrammaticallyCode from './programmatically.vue?raw';

	import ProgrammaticallyAsync from './programmatically-async.vue';
	import ProgrammaticallyAsyncCode from './programmatically-async.vue?raw';
</script>
